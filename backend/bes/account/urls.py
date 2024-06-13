from django.urls import path
from .views import CustomTokenObtainPairView, UserCreateView,UserUpdateView, CurrentUserView, csrf, UserProfileCreateView, UserProfileUpdateView
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('csrf/', csrf, name='csrf-token'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserCreateView.as_view(), name='user_register'),
    path('user/get', CurrentUserView.as_view(), name='current-user'),
    path('user/update/', UserUpdateView.as_view(), name='user-update'),
    path('user/profile/create/', UserProfileCreateView.as_view(), name='create-user-profile'),
    path('user/profile/update/', UserProfileUpdateView.as_view(), name='update-user-profile'),
]
