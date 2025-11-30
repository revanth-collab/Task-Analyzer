import { useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import JsonInput from "./components/JsonInput.jsx";
import StrategySelector from "./components/StrategySelector.jsx";
import Results from "./components/Results.jsx";

const App = () => {
  const API_BASE = "http://127.0.0.1:8000/api";

  const [tasks, setTasks] = useState([]);
  const [jsonOverride, setJsonOverride] = useState("");
  const [results, setResults] = useState([]);
  const [strategy, setStrategy] = useState("smart_balance");

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const analyzeTasks = async () => {
    let payload = [];

    if (jsonOverride.trim().length > 0) {
      try {
        payload = JSON.parse(jsonOverride);
      } catch (err) {
        alert("Invalid JSON provided.");
        return;
      }
    } else {
      if (tasks.length === 0) {
        alert("Add some tasks or paste JSON.");
        return;
      }
      payload = tasks;
    }

    try {
      const res = await fetch(
        `${API_BASE}/tasks/analyze/?strategy=${strategy}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(JSON.stringify(data));
        return;
      }

      // setResults(data);
      if (!Array.isArray(data)) {
        setResults([]);
        return;
      }
      setResults(data);
    } catch (err) {
      alert("Backend not responding.");
    }
  };

  const suggestTasks = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/tasks/suggest/?strategy=${strategy}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tasks),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        alert(JSON.stringify(data));
        return;
      }

      // setResults(data || []);
      if (!Array.isArray(data)) {
        setResults([]);    // ensure frontend doesn't crash
        return;
      }
      setResults(data);
    } catch (err) {
      alert("Backend not responding.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Smart Task Analyzer</h1>

      <TaskForm addTask={addTask} />

      <JsonInput value={jsonOverride} setValue={setJsonOverride} />

      <TaskList tasks={tasks} removeTask={removeTask} />

      <StrategySelector strategy={strategy} setStrategy={setStrategy} />

      <div className="flex gap-4 justify-center">
        <button
          onClick={analyzeTasks}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow"
        >
          Analyze Tasks
        </button>
        <button
          onClick={suggestTasks}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-medium shadow"
        >
          Suggest (Top 3)
        </button>
      </div>

      <Results list={results} />
    </div>
  );
}

export default App;
