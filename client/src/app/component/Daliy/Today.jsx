import { useContext, useEffect, useState, useRef } from "react";
import { DailyContext } from "../../Context/DailyContext";
import toast from "react-hot-toast";

export const Today = ({ fetchTodos, setLoading }) => {
  const { state, deleteTodos, moveToTomorrow } = useContext(DailyContext);
  const [tasks, setTasks] = useState([]);
  const taskRefs = useRef([]); // Store refs for tasks

  useEffect(() => {
    if (state?.todos?.today) {
      setTasks(state.todos.today);
    }
  }, [state]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.2 } // Trigger animation when 20% of the element is visible
    );

    taskRefs.current.forEach((task) => {
      if (task) observer.observe(task);
    });

    return () => observer.disconnect();
  }, [tasks]);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      toast.loading("Deleting task...");
      setLoading(true);
      const status = await deleteTodos(id);

      if (status.status === 200) {
        toast.dismiss();
        toast.success("Task deleted successfully.");
        fetchTodos();
      } else {
        toast.dismiss();
        toast.error(status.data.msg);
      }
    }
  }

  async function moveTomorrow(id) {
    toast.loading("Moving task...");
    setLoading(true);
    const status = await moveToTomorrow(id);

    if (status.status === 200) {
      toast.dismiss();
      toast.success("Task moved to tomorrow.");
      fetchTodos();
    } else {
      toast.dismiss();
      toast.error("Failed to move task.");
    }
  }

  return (
    <div
      style={{
        borderRadius: "6px 6px 0px 0px",
        maxHeight: "50vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="custom-scroll"
    >
      <h5
        className="card-title text-center mb-4 text-white"
        style={{
          position: "sticky",
          top: 0,
          fontWeight: "bold",
          backgroundColor: "#FC6736",
          zIndex: 1,
          padding: "10px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.73)",
        }}
      >
        Today Tasks
      </h5>

      <ol className="list-group list-group-numbered">
        {tasks.map((ele, i) => (
          <li
            key={i}
            ref={(el) => (taskRefs.current[i] = el)} // Assign ref to each task
            className="list-group-item d-flex justify-content-between align-items-start mb-2 fade-task"
            style={{
              borderRadius: "8px",
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold" style={{ fontSize: "1rem" }}>
                {ele.tittle}
              </div>
              <small style={{ fontWeight: "300" }}>
                Date: {ele.day}/{ele.month}/{ele.year}
              </small>
            </div>

            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-3"
                style={{ accentColor: "#0d6efd" }}
              />
              <button
                className="btn btn-sm border-danger"
                onClick={() => handleDelete(ele._id)}
                style={{
                  border: "1px solid white",
                  padding: "6px 8px",
                  fontSize: "0.85rem",
                }}
              >
                🗑️
              </button>
              <button
                className="btn btn-sm border-success"
                onClick={() => moveTomorrow(ele._id)}
                style={{
                  marginLeft: "5px",
                  border: "1px solid white",
                  padding: "6px 8px",
                  fontSize: "0.85rem",
                }}
              >
                ➡️
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
