from django.contrib import admin
from .models import Room, Booking


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['name', 'capacity', 'location']
    search_fields = ['name', 'location']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['title', 'room', 'user', 'start_time', 'end_time']
    list_filter = ['room']
    search_fields = ['title', 'room__name', 'user__username']
