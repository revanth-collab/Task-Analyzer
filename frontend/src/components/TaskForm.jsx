import { useState } from "react";

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState("");
    const [due_date, setDueDate] = useState("");
    const [importance, setImportance] = useState(5);
    const [estimated_hours, setEstimatedHours] = useState(1);
    const [dependencies, setDependencies] = useState("");

    const handleAdd = () => {
        if (!title || !due_date) {
            alert("Title and due date required");
            return;
        }

        const deps = dependencies
            .split(",")
            .map((x) => x.trim())
            .filter((x) => x !== "")
            .map(Number);

        addTask({
            title,
            due_date,
            importance,
            estimated_hours,
            dependencies: deps,
        });

        setTitle("");
        setDependencies("");
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Add New Task</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Task Title</label>
                    <input
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Title of the task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Due Date</label>
                    <input
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        type="date"
                        value={due_date}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Importance (1–10)</label>
                    <input
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        type="number"
                        min="1"
                        max="10"
                        value={importance}
                        onChange={(e) => setImportance(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Estimated Hours</label>
                    <input
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        type="number"
                        min="1"
                        value={estimated_hours}
                        onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Dependencies</label>
                    <input
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="1, 3, 4"
                        value={dependencies}
                        onChange={(e) => setDependencies(e.target.value)}
                    />
                </div>
            </div>

            <button
                onClick={handleAdd}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
                Add Task
            </button>
        </div>
    );
}

export default TaskForm
