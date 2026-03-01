from rest_framework import serializers
from django.utils import timezone
from .models import Room, Booking


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'capacity', 'location', 'description']


class BookingSerializer(serializers.ModelSerializer):
    room_name = serializers.CharField(source='room.name', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'room', 'room_name', 'user', 'username',
                  'title', 'start_time', 'end_time', 'created_at']
        read_only_fields = ['user', 'created_at', 'room_name', 'username']

    def validate(self, data):
        start = data.get('start_time')
        end = data.get('end_time')
        room = data.get('room')

        if start and end and start >= end:
            raise serializers.ValidationError("End time must be after start time.")
        if start and start < timezone.now():
            raise serializers.ValidationError("Cannot book a time slot in the past.")

        if start and end and room:
            qs = Booking.objects.filter(room=room, start_time__lt=end, end_time__gt=start)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError("This room is already booked for that time slot.")

        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
