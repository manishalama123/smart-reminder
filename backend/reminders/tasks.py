from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import Reminder

@shared_task
def send_reminder_email(reminder_id):
    """ Send reminder email to user"""
    try:
        reminder = Reminder.objects.get(id=reminder_id)
        user_email = reminder.user.email

        subject = f"Reminder: {reminder.title}"
        message = f""" Hello {reminder.user.username},
            This is your reminder:

            Title: {reminder.title}
            Description: {reminder.description}
            Time: {reminder.reminder_datetime}

            Best regards,
            Smart Reminder System """
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )

        print(f"✅ Email sent to {user_email} for reminder: {reminder.title}")
        return f"Email sent successfully to {user_email}"
    
    except Reminder.DoesNotExist:
        print(f"❌ Reminder {reminder_id} not found")
        return f"Reminder {reminder_id} not found"
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        raise