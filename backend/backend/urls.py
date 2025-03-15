from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # Prebuilt views that allow us to access and refresh pre-built tokens

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"), # Register a user
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), # Get a jwt
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), # Refresh a jwt
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]

