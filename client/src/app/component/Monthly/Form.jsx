import { Authcontext } from "../../Context/Authcontext";
import { DailyContext } from "../../Context/DailyContext";
import { MonthlyContext } from "../../Context/MonthlyContext";
import React, { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

export const Form = ({ fetchTodos }) => {
  const { AuthData } = useContext(Authcontext);
  const { month, addTaskMonthly } = useContext(MonthlyContext)
  const SetInput = useRef("");
  const [formDate, SetFromDate] = useState({ tittle: "", day: "", month: "", year: "",creator:AuthData.userID })
  const [isloader, setLoader] = useState(true)

  async function addTaskMonthlyHandler() {

    if (formDate.tittle !== ""  && formDate.day !== "" && formDate.month !== "" && formDate.year !== "") {
      const status = await addTaskMonthly(formDate);
      if(status){
        toast.success("Task added successfully.")
        fetchTodos()
      }
    }else{
      alert("All fields are required !")
    }
  }
  

  return (
    <div className="form-container">
      <div className="form-group mb-3">
        <label htmlFor="tittle" className="form-label">
          Title :
        </label>
        <input
          type="text"
          className="form-control"
          id="tittle"
          ref={SetInput}
          onChange={(e) =>
            SetFromDate((prev) => {
              return { ...prev, tittle: e.target.value };
            })
          }
          placeholder="Enter task title"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="date" className="form-label">
          Date :
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          ref={SetInput}
          onChange={(e) =>
            // let tareekh = new Date();
            SetFromDate(prev => { return { ...prev, day: e.target.value.split("-")[2], month: e.target.value.split("-")[1], year: e.target.value.split("-")[0] } })

          }
          placeholder="Enter task date"
        />
      </div>

      <div className="d-flex justify-content-center">


        <button
          className="btn btn-secondary mx-2"
          onClick={() => {
            addTaskMonthlyHandler()
          }}
        >
          Add Your Task
        </button>
      </div>


      <style jsx>{`
            .form-container {
              background: rgba(255, 255, 255, 0.1);
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(10px);
              max-width: 400px;
              margin: 20px auto;
              color: white;
            }

            .form-label {
              font-weight: bold;
              color: #f8f9fa;
            }

            .form-control {
              background-color: rgba(255, 255, 255, 0.2);
              border: 1px solid rgba(255, 255, 255, 0.3);
              color: white;
              transition: all 0.3s ease;
            }

            .form-control:focus {
              background-color: rgba(255, 255, 255, 0.4);
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
              border-color: #5b86e5;
            }

            .btn-primary {
              background-color: #36d1dc;
              border-color: #36d1dc;
              transition: transform 0.3s ease;
            }

            .btn-primary:hover {
              background-color: #5b86e5;
              border-color: #5b86e5;
              transform: scale(1.1);
            }

            .btn-secondary {
              background-color: #5b86e5;
              border-color: #5b86e5;
              transition: transform 0.3s ease;
            }

            .btn-secondary:hover {
              background-color: #36d1dc;
              border-color: #36d1dc;
              transform: scale(1.1);
            }
          `}</style>
    </div>
  );
}
