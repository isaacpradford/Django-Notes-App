from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }  # No read access to password, never gets returned with user

    def create(self, validated_data):
        user = User.objects.create_user(
            **validated_data
        )  # Creates a user after its been validated by the serializer
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} 
