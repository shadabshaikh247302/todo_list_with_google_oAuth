import React, { useContext, useEffect } from 'react';
import { Cards } from './Cards';
import { Form } from './Form';
import { MonthlyContext } from '../../Context/MonthlyContext';
import { Authcontext } from "../../Context/Authcontext";
// import { Authcontext } from '@/app/Context/AuthContext';

const Main = () => {
const {dispatch,getTaskMonthly,name,MonthlyPlan} = useContext(MonthlyContext)
const{AuthData} = useContext(Authcontext)
useEffect(()=>{
  fetchTodos()
},[])

async function fetchTodos() {
  try {
    const Data = await getTaskMonthly(AuthData?.userID);
    // console.log(Data)
    if (Data) {
      dispatch({
        type: "ADD_PLAN",
        payload: Data?.data,
      });
     
    } else {
      console.log("No data to dispatch.");
    }
  } catch (error) {
    console.error("Error in fetchTodos:", error);
  }
}

  return (
    <div className="main-container">

      <div className="conten-wrapper">
        <Form fetchTodos={fetchTodos} />
        <Cards fetchTodos={fetchTodos}/>
      </div>

      <style jsx>{`
        .main-container {
          // background: linear-gradient(135deg, #6e7dff, #ff7c7c);
          min-height: 100vh;
          padding: 30px;
          // display: flex;
          // justify-content: center;
          // align-items: center;
        }

        .content-wrapper {
          width: 100%;
          max-width: 1100px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Responsive Styling */
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 20px;
          }
        }

        .form-wrapper {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .cards-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 20px;
        }

        /* Custom Styling for the Form and Cards */
        .form-wrapper input,
        .form-wrapper button {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .form-wrapper button {
          background-color: #6e7dff;
          color: white;
          cursor: pointer;
        }

        .form-wrapper button:hover {
          background-color: #4f63e2;
        }
      `}</style>

    </div>
  );
};

export default Main;
