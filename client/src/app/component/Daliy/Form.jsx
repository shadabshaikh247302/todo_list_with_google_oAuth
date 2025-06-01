import { Authcontext } from '../../Context/Authcontext'
import { DailyContext } from "../../Context/DailyContext";
import React, { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

export const Form = ({ fetchTodos, setLoading }) => {
  // const { AuthData } = useContext(Authcontext);
  const { addTodo } = useContext(DailyContext);
const AuthData = JSON.parse( localStorage.getItem('userData'))
  const [formData, setFormData] = useState({ tittle: "" });
  const inputRef = useRef(null);

  async function handleSubmit(time) {
    // Check if user is logged in
    console.log(AuthData.userID);
    
    if (!AuthData?.userID) {
      toast.error("You must be logged in to add a task!");
      return;
    }

    // Check if task title is empty
    if (!formData.tittle.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }

    let date = new Date();
    
    // console.log(date)
    let taskData = {
      ...formData,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      creator: AuthData.userID,
      completed: false,
    };

  
    if (time === "tomorrow") {
      date.setDate(date.getDate() + 1);
      taskData = { ...taskData, day: date.getDate(), month: date.getMonth() + 1 };
    }
    
    try {
      const data = await addTodo(taskData);
      // console.log()
      if (data.status === 200) {
        setFormData({ tittle: "" }); // Clear input
        
        inputRef.current?.focus(); // Refocus on input field
        setLoading(true);
        fetchTodos()
        toast.success(data.data.message);
      }
     
    } catch (error) {
      // console.error("Error adding todo:", error);
      toast.error(data.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <div className="form-group mb-3">
        <label htmlFor="tittle" className="form-label" style={{ color: "white" }}>
          Title
        </label>
        <input
          type="text"
          className="form-control w-100"
          id="tittle"
          ref={inputRef}
          value={formData.tittle}
          onChange={(e) => setFormData({ tittle: e.target.value })}
          placeholder="Enter task title"
        />
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mx-2" onClick={() => handleSubmit("today")}>
          Add for Today
        </button>

        <button className="btn btn-secondary mx-2" onClick={() => handleSubmit("tomorrow")}>
          Add for Tomorrow
        </button>
      </div>
    </div>
  );
};
