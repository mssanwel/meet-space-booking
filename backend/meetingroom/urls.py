from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from bookings.views import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('bookings.urls')),
    path('api/auth/login/', obtain_auth_token, name='api_token_auth'),
    path('api/auth/register/', RegisterView.as_view(), name='api_register'),
]
