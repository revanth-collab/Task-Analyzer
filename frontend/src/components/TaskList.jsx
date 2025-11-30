const TaskList = ({ tasks, removeTask }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Task List</h2>

            {tasks.length === 0 ? (
                <p className="text-gray-500 italic">No tasks added yet...</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map((t, i) => (
                        <li
                            key={i}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border hover:shadow transition"
                        >
                            <div>
                                <div className="font-semibold text-gray-800">
                                    #{i} — {t.title}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    Due: {t.due_date} • Imp: {t.importance} • Hours: {t.estimated_hours}
                                </div>
                            </div>

                            <button
                                onClick={() => removeTask(i)}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;