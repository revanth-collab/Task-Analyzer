import { getPriority } from "../utils/utils";

const Results = ({ list }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Results</h2>

            {console.log("RESULT LIST:", list)}

            {!Array.isArray(list) || list.length === 0 ? (
                <p className="text-gray-500 italic">No results yet...</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {(Array.isArray(list) ? list : []).map((r, i) => {
                        const pr = getPriority(r.score);
                        return (
                            <div
                                key={i}
                                className="p-6 rounded-xl border bg-white shadow-lg hover:shadow-xl transition"
                            >
                                <div className="flex justify-between mb-3">
                                    <div className="font-bold text-lg text-gray-900">{r.title}</div>
                                    <div className="text-sm font-medium text-gray-600">
                                        Score: {r.score.toFixed(1)}
                                    </div>
                                </div>

                                <span
                                    className={`text-xs px-3 py-1 rounded-full ${pr.color} font-semibold`}
                                >
                                    {pr.label} Priority
                                </span>

                                <div className="mt-4 text-gray-700 space-y-1">
                                    <div>📅 Due: {r.due_date}</div>
                                    <div>⭐ Importance: {r.importance}</div>
                                    <div>⏱ Hours: {r.estimated_hours}</div>
                                    <div>🧩 Dependencies: [{r.dependencies.join(", ")}]</div>
                                </div>

                                <div className="text-xs text-gray-600 mt-4 bg-gray-50 p-3 rounded-lg border">
                                    <b>Why chosen:</b> {r.explanation}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Results
