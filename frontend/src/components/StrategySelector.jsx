const StrategySelector = ({ strategy, setStrategy }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Strategy</h2>

            <select
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
            >
                <option value="smart_balance">Smart Balance</option>
                <option value="fastest_wins">Fastest Wins</option>
                <option value="high_impact">High Impact</option>
                <option value="deadline_driven">Deadline Driven</option>
            </select>
        </div>
    );
}

export default StrategySelector