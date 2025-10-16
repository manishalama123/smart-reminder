from rest_framework import serializers
from .models import Reminder

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ['id', 'title', 'description', 'reminder_datetime','is_sent', 'is_completed', 'created_at' ]
        read_only_fields = ['id', 'is_sent', 'created_at']
