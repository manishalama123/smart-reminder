from django.db import models
from django.conf import settings
# Create your models here.
class Reminder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    reminder_datetime = models.DateTimeField()
    celery_task_id = models.CharField(max_length=255, blank=True, null=True)  # added for celery 
    is_sent = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now= True)

    class Meta:
        ordering = ['reminder_datetime']
    
    def __str__(self):
        return f"{self.title} - {self.reminder_datetime}"