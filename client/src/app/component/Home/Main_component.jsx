"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { MonthlyContext } from "../../Context/MonthlyContext";
// import { Navbar } from "../navbar/Navbar";

export const Main_component = ({setCompo }) =>  {
  const router = useRouter();
  
  const { Planning } = useContext(MonthlyContext);
  const date = new Date();

  function handleChange(){
    router.push("/Planner/Daily") 
    // setCompo(false)
  }
  
  return (
    <div className="main-container ">
      <div className="container p-4" >
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center content-wrapper">
          <div className="button-container m-3">
            <div className="mb-3">
              <button
                className="btn btn-gradient"
                onClick={() => handleChange() }
              >
                Daily Task
              </button>
            </div>
            <div>
              <button
                className="btn btn-gradient"
                onClick={() => router.push("/Planner/Monthly")}
              >
                Monthly Task
              </button>
            </div>
          </div>
          <div className="events-box">
            <h4 className="events-header">Upcoming Events</h4>
            <ol className="events-list">
              {Planning?.[date.getMonth() + 1]?.length > 0 ? (
                Planning[date.getMonth() + 1].map((plan, i) => (
                  <li key={i} className="event-item">
                    {plan.title} - {plan.date}/{plan.month}/{plan.year}
                  </li>
                ))
              ) : (
                <p className="no-events">No upcoming events.</p>
              )}
            </ol>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .main-container {
          background: linear-gradient(90deg, #BE3144, #1D1616);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .content-wrapper {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .btn-gradient {
          background: linear-gradient(45deg, #ff7e5f, #feb47b);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .events-box {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          max-width: 600px;
          margin: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          color: white;
        }

        .events-header {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .events-list {
          list-style-type: none;
          padding-left: 0;
        }

        .event-item {
          background-color: rgba(0, 0, 0, 0.1);
          margin: 5px 0;
          padding: 10px;
          border-radius: 5px;
          font-size: 1rem;
        }

        .no-events {
          font-style: italic;
          color: lightgray;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
            align-items: center;
          }

          .button-container {
            margin-bottom: 20px;
            align-items: center;
            flex-direction: column;
          }

          .events-box {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .btn-gradient {
            width: 100%;
            padding: 12px;
            font-size: 0.9rem;
          }

          .events-header {
            font-size: 1.3rem;
          }

          .event-item {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};
