from rest_framework import serializers
from .models import Task


class AnalyzeTaskInputSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    due_date = serializers.DateField()
    importance = serializers.IntegerField(min_value=1, max_value=10)
    estimated_hours = serializers.IntegerField(min_value=1)
    dependencies = serializers.ListField(
        child=serializers.IntegerField(min_value=0),
        required=False,
        default=list
    )


class ScoredTaskSerializer(serializers.Serializer):
    index = serializers.IntegerField()
    title = serializers.CharField()
    due_date = serializers.DateField()
    importance = serializers.IntegerField()
    estimated_hours = serializers.IntegerField()
    dependencies = serializers.ListField(
        child=serializers.IntegerField(),
        required=False
    )
    score = serializers.FloatField()
    explanation = serializers.CharField()


class TaskModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
