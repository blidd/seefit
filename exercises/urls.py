from django.urls import path

from exercises.views import HomePageView


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
]
