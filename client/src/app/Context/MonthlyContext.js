"use client";
import { API } from "../../utils/Utils";
import { createContext, useReducer } from "react";
import toast from "react-hot-toast";

const month = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

const initialState = []; 

export const MonthlyContext = createContext();

async function addTaskMonthly(body) {
  try {
    console.log(body)
    const response = await API.post("/user/addTaskMonthly", body);
    console.log(response)
    return response;
  } catch (error) {
    toast.error(error.data.data.msg)
  }
}

async function getTaskMonthly(id) {
  try {
    // console.log("this is my id",id)
    const response = await API.get(`/user/getTaskMonthly/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.msg)
  }
}

async function deleteTaskMonthly(id) {
 
try {
  const response = await API.delete(`/user/deleteTaskMonthly/${id}`);
  // console.log(response)
  return response;
} catch (error) {
  console.log(error.data.data.msg)
}
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PLAN":
      return [...action.payload];
    default:
      return state;
  }
}

export const MonthlyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MonthlyContext.Provider
      value={{
        MonthlyPlan: state, // Explicitly expose state as MonthlyPlan
        dispatch,
        month,
        addTaskMonthly,
        getTaskMonthly,
        deleteTaskMonthly
      }}
    >
      {children}
    </MonthlyContext.Provider>
  );
};
