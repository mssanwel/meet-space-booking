from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Room, Booking
from .serializers import RoomSerializer, BookingSerializer


class RoomViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny]


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_queryset(self):
        qs = Booking.objects.select_related('room', 'user')
        date = self.request.query_params.get('date')
        mine = self.request.query_params.get('mine')
        if date:
            qs = qs.filter(start_time__date=date)
        if mine:
            qs = qs.filter(user=self.request.user)
        return qs

    def destroy(self, request, *args, **kwargs):
        booking = self.get_object()
        if booking.user != request.user and not request.user.is_staff:
            return Response({'error': 'You can only cancel your own bookings.'},
                            status=status.HTTP_403_FORBIDDEN)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '')
        email = request.data.get('email', '').strip()
        first_name = request.data.get('first_name', '').strip()
        last_name = request.data.get('last_name', '').strip()

        if not username or not password:
            return Response({'error': 'Username and password are required.'},
                            status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken.'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username, password=password,
            email=email, first_name=first_name, last_name=last_name,
        )
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': user.username},
                        status=status.HTTP_201_CREATED)
