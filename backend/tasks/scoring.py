from datetime import datetime, date
from typing import Dict, Any, Tuple, List

STRATEGIES = {"fastest_wins", "high_impact", "deadline_driven", "smart_balance"}


def calculate_task_score(task_data, strategy="smart_balance", dependency_count=0):
    today = date.today()
    due_date = task_data.get("due_date")

    if isinstance(due_date, str):
        try:
            due_date = datetime.strptime(due_date, "%Y-%m-%d").date()
        except:
            # if parsing fails, assume far future (low urgency)
            due_date = today + timedelta(days=999)

    score = 0.0
    reasons = []
    days_left = (due_date - today).days

    importance = task_data["importance"]
    hours = task_data["estimated_hours"]

    # URGENCY
    urgency = 0
    if days_left < 0:
        urgency += 100
        reasons.append("Task is overdue")
    elif days_left <= 3:
        urgency += 50
        reasons.append("Due soon")
    else:
        urgency += max(0, 20 - days_left)
        reasons.append(f"Due in {days_left} days")

    # IMPORTANCE
    imp = importance * 5
    reasons.append(f"Importance weight applied ({importance})")

    # EFFORT
    effort = 0
    if hours < 2:
        effort += 15
        reasons.append("Quick task (< 2 hours)")
    else:
        effort += max(-10, 8 - hours)
        reasons.append("Effort-adjusted score")

    # DEPENDENCIES
    dep = dependency_count * 8
    if dependency_count > 0:
        reasons.append(f"Blocks {dependency_count} tasks")

    # STRATEGY
    if strategy == "fastest_wins":
        score = effort * 2 + urgency * 1 + imp * 0.5 + dep * 0.5
        reasons.append("Strategy: Fastest Wins")
    elif strategy == "high_impact":
        score = imp * 2 + urgency + dep + effort * 0.3
        reasons.append("Strategy: High Impact")
    elif strategy == "deadline_driven":
        score = urgency * 2 + imp * 0.8 + dep + effort * 0.2
        reasons.append("Strategy: Deadline Driven")
    else:
        score = urgency * 1.3 + imp * 1.2 + effort + dep
        reasons.append("Strategy: Smart Balance")

    return score, "; ".join(reasons)
