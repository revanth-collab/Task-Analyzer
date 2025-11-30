from django.urls import path
from .views import analyze_tasks, suggest_tasks

urlpatterns = [
    path("tasks/analyze/", analyze_tasks),
     path("tasks/suggest/", suggest_tasks),
]