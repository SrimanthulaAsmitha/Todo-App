import { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/todos";

function App() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [todos, setTodos] = useState([]);

  // =========================
  // GET ALL TASKS
  // =========================
  const refreshData = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // =========================
  // LOAD TASKS
  // =========================
  useEffect(() => {
    refreshData();
  }, []);

  // =========================
  // ADD TASK
  // =========================
  const addTask = async () => {
    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    if (!date) {
      alert("Please select a date and time");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: task.trim(),
          dueDate: date,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      setTask("");
      setDate("");

      await refreshData();
    } catch (error) {
      console.error("Add task error:", error);
      alert("Unable to add task");
    }
  };

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await refreshData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // =========================
  // COMPLETE / UNDO TASK
  // =========================
  const completeTask = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: todo.text,
          dueDate: todo.dueDate,
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      await refreshData();
    } catch (error) {
      console.error("Complete task error:", error);
    }
  };

  // =========================
  // EDIT TASK
  // =========================
  const editTask = async (todo) => {
    const newText = prompt("Edit Task:", todo.text);

    if (newText === null || !newText.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newText.trim(),
          dueDate: todo.dueDate,
          completed: todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit task");
      }

      await refreshData();
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  // =========================
  // SEARCH + FILTER
  // =========================
  const filteredTodos = todos.filter((todo) => {
    const taskText = String(todo.text || "")
      .trim()
      .toLowerCase();

    const searchText = String(search || "")
      .trim()
      .toLowerCase();

    const matchesSearch = taskText.includes(searchText);

    if (filter === "completed") {
      return matchesSearch && todo.completed === true;
    }

    if (filter === "pending") {
      return matchesSearch && todo.completed === false;
    }

    return matchesSearch;
  });

  // =========================
  // UI
  // =========================
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
        backgroundColor: darkMode ? "#0f172a" : "#f1f5f9",
        color: darkMode ? "white" : "black",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          margin: "auto",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: darkMode ? "#1e293b" : "white",
          boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          TODO APP
        </h1>

        {/* DARK MODE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 15px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* TASK INPUT */}
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        {/* DATE & TIME */}
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        {/* ADD TASK */}
        <button
          onClick={addTask}
          style={{
            width: "100%",
            padding: "12px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ➕ Add Task
        </button>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            boxSizing: "border-box",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "15px",
          }}
        />

        {/* FILTER BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Pending
          </button>
        </div>

        {/* TASK COUNT */}
        <p>
          Showing {filteredTodos.length} of {todos.length} tasks
        </p>

        {/* TASK LIST */}
        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            {search.trim()
              ? `No tasks found for "${search}"`
              : "No tasks found"}
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo._id}
              style={{
                marginTop: "15px",
                padding: "18px",
                borderRadius: "10px",
                backgroundColor: darkMode
                  ? "#334155"
                  : "#e2e8f0",
              }}
            >
              {/* TASK */}
              <h3
                style={{
                  marginTop: 0,
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {todo.text}
              </h3>

              {/* DATE */}
              <p>📅 {todo.dueDate}</p>

              {/* STATUS */}
              <p>
                Status:{" "}
                <strong>
                  {todo.completed
                    ? "Completed ✓"
                    : "Pending"}
                </strong>
              </p>

              {/* COMPLETE */}
              <button
                onClick={() => completeTask(todo)}
                style={{
                  marginRight: "5px",
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
              >
                {todo.completed ? "↩ Undo" : "✓ Complete"}
              </button>

              {/* EDIT */}
              <button
                onClick={() => editTask(todo)}
                style={{
                  marginRight: "5px",
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
              >
                ✏️ Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteTask(todo._id)}
                style={{
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;