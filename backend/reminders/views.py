from django.shortcuts import render
from .models import Reminder
from .serializers import ReminderSerializer
from rest_framework import viewsets, permissions
from .serializers import ReminderSerializer
from .tasks import send_reminder_email  # ✅ Import task
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
        reminder = serializer.save()
        self.schedule_reminder_email(reminder)

    def schedule_reminder_email(self, reminder):
        """Schedule email to be sent at reminder_datetime"""
        # Convert reminder datetime to UTC for Celery
        reminder_time = reminder.reminder_datetime
        
        # Schedule task to run at specific time
        send_reminder_email.apply_async(
            args=[reminder.id],
            eta=reminder_time  # Execute at this exact time
        )
        print(f"📅 Email scheduled for {reminder.title} at {reminder_time}")

