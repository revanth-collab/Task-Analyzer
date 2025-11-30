const JsonInput = ({ value, setValue }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Bulk JSON Input</h2>

            <textarea
                className="border border-gray-300 rounded-lg w-full p-4 h-52 focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`[
  {
    "title": "Fix login bug",
    "due_date": "2025-12-01",
    "importance": 8,
    "estimated_hours": 3,
    "dependencies": [1]
  }
]`}
            ></textarea>
        </div>
    );
}

export default JsonInput