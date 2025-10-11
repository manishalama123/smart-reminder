from django.shortcuts import render
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import UserSerializer, RegisterSerializer
# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    