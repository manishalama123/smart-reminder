from django.shortcuts import render
from .models import Reminder
from .serializers import ReminderSerializer
from rest_framework import viewsets, permissions
from .serializers import ReminderSerializer
from .tasks import send_reminder_email  # ✅ Import task
from config.celery import app as celery_app
from datetime import datetime

import pytz

class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        reminder=serializer.save(user=self.request.user)
        # schedule email task
        self.schedule_reminder_email(reminder)

    def perform_update(self, serializer):
        # cancel old task if exists
        old_reminder = self.get_object()
        if hasattr(old_reminder, 'celery_task_id') and old_reminder.celery_task_id:
            celery_app.control.revoke(old_reminder.celery_task_id, terminate=True)
            print(f"🚫 Cancelled old task for: {old_reminder.title}")

        reminder = serializer.save()
        self.schedule_reminder_email(reminder)

    def perform_destroy(self, instance):
        # ✅ Cancel scheduled task before deleting
        if hasattr(instance, 'celery_task_id') and instance.celery_task_id:
            celery_app.control.revoke(instance.celery_task_id, terminate=True)
            print(f"🚫 Cancelled email task for: {instance.title}")
        instance.delete()

    def schedule_reminder_email(self, reminder):
        """Schedule email to be sent at reminder_datetime"""
        # Convert reminder datetime to UTC for Celery
        
        
        # Schedule task to run at specific time
        result = send_reminder_email.apply_async(
            args=[reminder.id],
            eta=reminder.reminder_datetime  # Execute at this exact time
        )
        # ✅ IMPORTANT: Store task ID so we can cancel it later
        reminder.celery_task_id = result.id
        reminder.save(update_fields=['celery_task_id'])

        print(f"📅 Email scheduled for {reminder.title} at {reminder.reminder_datetime} (Task ID: {result.id})")

