from django.shortcuts import render
from .models import Reminder
from .serializers import ReminderSerializer
from rest_framework import viewsets, permissions

class ReminderViewSet(viewsets.ModelViewSet):
    serializers_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)