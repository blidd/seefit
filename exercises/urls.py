from django.urls import path

from exercises.views import HomePageView, SquatView


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('squat/', SquatView.as_view(), name='squat'),
]
