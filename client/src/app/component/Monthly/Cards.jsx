import { useContext, useState, useEffect } from "react";
import { MonthlyContext } from "../../Context/MonthlyContext";
import { Authcontext } from "../../Context/Authcontext";
import "./Card.css"; // Import styles
import toast from "react-hot-toast";

export const Cards = ({ fetchTodos }) => {
  const { MonthlyPlan, month, addTaskToMonth, deleteTaskMonthly } = useContext(MonthlyContext);
  const { AuthData } = useContext(Authcontext);
  const [isLoading, setIsLoading] = useState(true);

  // Group tasks by month
  const groupedTasks = MonthlyPlan.reduce((acc, task) => {
    const monthIndex = parseInt(task.month, 10) - 1;
    const taskMonth = month[monthIndex];

    if (!acc[monthIndex]) {
      acc[monthIndex] = { name: taskMonth, tasks: [] };
    }
    acc[monthIndex].tasks.push(task);
    return acc;
  }, {});

  const sortedGroupedTasks = Object.values(groupedTasks).sort(
    (a, b) => month.indexOf(a.name) - month.indexOf(b.name)
  );

  // Handle Task Deletion
  async function handleDelete(id) {
    const confirmDeleteHandler = window.confirm("Are you sure you want to delete this task?");
    if (confirmDeleteHandler) {
      const status = await deleteTaskMonthly(id);
      if (status) {
        toast.success(status.data.msg);
        fetchTodos();
      }
    }
  }

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [MonthlyPlan]);



  return (
    <div className="monthly-container ">
      {sortedGroupedTasks.length > 0 ? (
        <div className="months-grid">
          {sortedGroupedTasks.map(({ name, tasks }, index) => (
            <div key={name} className="month-section">
              <p className="month-title">{name}</p> {/* Month Title */}
              <ul className="task-list">
                {tasks.map((task) => (
                  <li key={task._id} className="task-item">
                    <div className="task-details">
                      <p className="d-flex"><strong>Title: </strong>&nbsp;{ task.tittle}</p>
                      <p><strong>Date:</strong> {task.day}/{task.year}</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(task._id)}
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
              {/* Add Task Button */}
          
            </div>
          ))}
        </div>
      ) : (
        <p className="no-tasks">No tasks available.</p>
      )}
    </div>
  );
};
