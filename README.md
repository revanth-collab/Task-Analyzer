# Smart Task Analyzer — Django + React SaaS-Style Project

A mini productivity intelligence tool that scores and prioritizes tasks using a custom algorithm inspired by urgency–importance matrices, critical path logic, and quick-win heuristics.  
The project includes:

- Backend API (Django REST Framework)
- Frontend UI (React + Tailwind CSS)
- Dynamic scoring algorithm (`scoring.py`)
- Multiple strategy modes
- Suggestion engine (Top 3 tasks)
- Toast notifications & modern SaaS UX

---

## 🚀 Features

### Backend (Django)
- `/api/tasks/analyze/` – Accepts a list of tasks and returns them sorted by priority score.
- `/api/tasks/suggest/` – Returns top 3 highest-priority tasks.
- Custom scoring algorithm considering:
  - Urgency  
  - Importance  
  - Effort  
  - Dependencies  
  - Strategy (Fastest Wins / High Impact / Deadline Driven / Smart Balance)  

### Frontend (React + Tailwind)
- Task form for adding tasks
- JSON task input area
- Strategy selector dropdown
- Result cards with color-coded priority badges
- Smooth toast notifications
- Clean SaaS layout

---

# 🛠️ Setup Instructions

## 1. Clone the project

git clone https://github.com/revanth-collab/Task-Analyzer.git
cd task_analyzer

## 2. Run migrations  

python manage.py makemigrations
python manage.py migrate


## 3. Start the Django Server

python manage.py runserver


**Frontend Setup (React + Vite)**

cd frontend
npm install
npm run dev


**Alogrithm Explaination**
The Smart Task Analyzer uses a weighted multi-factor scoring system designed to simulate real-world task prioritization similar to professional project management tools. Each task receives a priority score, and higher scores indicate higher priority. The scoring logic balances four key components:

## 1. Urgency

Urgency is derived from the number of days left before the task’s due date.
Overdue tasks (+100) receive the highest priority boost.
Tasks due within 3 days (+50) are considered urgent.
Tasks further out get a scaled score using 20 - days_left, ensuring they still get minor priority if the due date is reasonably near.
Urgency encourages timely execution and prevents deadline risks.

## 2. Importance

Each task has a user-defined importance rating (1–10).
Importance is multiplied by 5 to give it significant weight, ensuring high-impact tasks are always treated seriously, even if the deadline isn’t close.
This simulates high-impact long-term goals.

## 3. Effort

Effort represents the estimated hours needed.
Quick wins (<2 hours) get a positive boost (+15).
Longer tasks are slightly penalized using (8 - hours) with a minimum impact of –10.
This helps push small tasks upward so users can quickly clear low-effort items and maintain momentum.

## 4. Dependencies

If a task blocks other tasks, it gets priority.
Each dependency contributes +8 points.
This models critical-path scheduling — tasks that unlock workflows gain priority.

## 5. Strategy Weighting

The algorithm supports multiple scoring strategies:
Fastest Wins → favors low-effort tasks
High Impact → importance dominates
Deadline Driven → urgency dominates
Smart Balance → balanced multi-factor scoring (default)


**Design Decisions**
1. React + Tailwind for a modern, fast SaaS-style UI.
2. Card-based output for visual readability.
3. No database dependence for core features; analyze works entirely client-side.
4. Pure functions in scoring logic → easy to unit test.
5. Always return arrays from APIs to prevent React .map() crashes.
6. Flexible strategies allow the user to switch prioritization style without recalculating tasks.


**Time Breakdown**
Project setup (Django + Vite)	                     30 min
Backend models & serializers         	             20 min
Scoring algorithm design	                         45 min
Build /analyze & /suggest APIs	                   40 min
React UI (forms, strategy selector, results)	     1 hr
Tailwind styling / UX	                             45 min
Fixing CORS, date parsing, edge cases	             20 min
Testing & polishing	                               30 min
README writing	                                   30 min

## Total: 5 hours 20 minutes


**Future Improvements**

Database-based task saving (CRUD)
User authentication & profiles
Analytics dashboard (task completion trends)
Drag-and-drop task ordering

```
