from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    timezone = models.CharField(max_length=50, default='UTC')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str_(self):
        return self.username