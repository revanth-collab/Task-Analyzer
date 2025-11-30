from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import AnalyzeTaskInputSerializer,ScoredTaskSerializer,TaskModelSerializer
from .utils import detect_cycle
from .scoring import calculate_task_score, STRATEGIES
from .models import Task

@api_view(["POST"])
def analyze_tasks(request):
    strategy = request.GET.get("strategy", "smart_balance")

    if strategy not in STRATEGIES:
        return Response({"detail": "Invalid strategy"}, status=400)

    serializer = AnalyzeTaskInputSerializer(data=request.data, many=True)
    serializer.is_valid(raise_exception=True)

    tasks = serializer.validated_data

    cycle = detect_cycle(tasks)
    if cycle:
        return Response({
            "detail": "Circular dependency detected",
            "cycle": cycle
        }, status=400)

    # Count how many tasks depend on each one
    dependency_map = {i: 0 for i in range(len(tasks))}
    for idx, t in enumerate(tasks):
        for d in t["dependencies"]:
            if d < len(tasks):
                dependency_map[d] += 1

    scored = []
    for index, task in enumerate(tasks):
        score, explanation = calculate_task_score(
            task, strategy=strategy, dependency_count=dependency_map[index]
        )

        scored.append({
            "index": index,
            **task,
            "score": score,
            "explanation": explanation,
        })

    scored_sorted = sorted(scored, key=lambda x: x["score"], reverse=True)

    return Response(ScoredTaskSerializer(scored_sorted, many=True).data)


# @api_view(["GET"])
# def suggest_tasks(request):
#     strategy = request.GET.get("strategy", "smart_balance")

#     if strategy not in STRATEGIES:
#         return Response(
#             {"detail": f"Invalid strategy. Allowed: {sorted(STRATEGIES)}"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     # You can filter by date if you want only active tasks, but for now use all
#     qs = Task.objects.all()

#     if not qs.exists():
#         return Response(
#             {"detail": "No tasks found in database."},
#             status=status.HTTP_200_OK,
#         )

#     # Turn DB objects into dicts compatible with scoring
#     tasks_data = []
#     for t in qs:
#         tasks_data.append(
#             {
#                 "title": t.title,
#                 "due_date": t.due_date,
#                 "importance": t.importance,
#                 "estimated_hours": t.estimated_hours,
#                 "dependencies": t.dependencies or [],
#             }
#         )

#     # Build dependency map (same logic as analyze)
#     dependency_map = {i: 0 for i in range(len(tasks_data))}
#     for idx, task in enumerate(tasks_data):
#         for d in task.get("dependencies", []):
#             if 0 <= d < len(tasks_data):
#                 dependency_map[d] += 1

#     scored = []
#     for index, task in enumerate(tasks_data):
#         dep_count = dependency_map[index]
#         score, explanation = calculate_task_score(
#             task, strategy=strategy, dependency_count=dep_count
#         )
#         scored.append(
#             {
#                 "index": index,
#                 **task,
#                 "score": score,
#                 "explanation": explanation,
#             }
#         )

#     scored_sorted = sorted(scored, key=lambda x: x["score"], reverse=True)
#     top_3 = scored_sorted[:3]
#     return Response(ScoredTaskSerializer(top_3, many=True).data)


@api_view(["POST"])
def suggest_tasks(request):
    strategy = request.GET.get("strategy", "smart_balance")

    # Validate strategy
    if strategy not in STRATEGIES:
        return Response([], status=200)

    # Expect frontend to send tasks
    tasks = request.data

    if not isinstance(tasks, list) or len(tasks) == 0:
        return Response([], status=200)

    # Count dependencies
    dependency_map = {i: 0 for i in range(len(tasks))}
    for idx, t in enumerate(tasks):
        for d in t.get("dependencies", []):
            if d < len(tasks):
                dependency_map[d] += 1

    scored = []
    for index, task in enumerate(tasks):
        score, explanation = calculate_task_score(
            task, strategy=strategy, dependency_count=dependency_map[index]
        )
        scored.append({
            "index": index,
            **task,
            "score": score,
            "explanation": explanation,
        })

    scored_sorted = sorted(scored, key=lambda x: x["score"], reverse=True)

    return Response(scored_sorted[:3])
