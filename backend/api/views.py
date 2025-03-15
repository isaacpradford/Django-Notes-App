from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer, NoteSerializer
from .models import Note


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # Looks at all of the existing users
    serializer_class = UserSerializer  # Tells the view what kind of data needs to accept to make a new user
    permission_classes = [
        AllowAny
    ]  # Allows anyone, even if they're not authenticated, to create a new user


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    # Override default create function
    def perform_create(self, serializer): 
        user = self.request.user    
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else: 
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    