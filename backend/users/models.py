from django.db import models
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    timezone = models.CharField(max_length=50, default='UTC')

    def __str_(self):
        return self.username