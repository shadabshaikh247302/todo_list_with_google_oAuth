"use client";


import { API } from "../../utils/Utils";
import { createContext, useReducer } from "react";

let NewObj = { todos: [] }; 

async function addTodo(body){
  try {
    const response = await API.post("/user/addData",body)
    return response
  } catch (error) {
    console.log(error)
  }
}

async function getAllTodos(id) {
  try {
    const response = await API.get(`/user/getData/${id}`);
    return response.data.todoList;
  } catch (error) {
    console.error("Error in getAllTodos:", error);
  }
}


async function deleteTodos(id) {
  try {
    // console.log()
    const response = await API.delete(`/user/deleteDataById/${id}`)
    return response 
  } catch (error) {
    console.error("Error in deleteTodos:", error);
  }
}

async function moveToTomorrow(id) {
  try {
    const response = await API.put(`/user/moveToTomorrow/${id}`)
    return response?.status;
  } catch (error) {
    console.error("Error in moveToTomorrow:", error);
  }
}

async function moveToToday( id) {
  try {
  const response = await API.put(`/user/moveToToday/${id}`)
  return response 
  } catch (error) {
    console.log(error)
  } 
}

function reducer(state, action) {
  try {
    switch (action.type) {
      case "GET_ALL_TODOS":
        // console.log(state)
        return { ...state, todos: action.payload };
      default:
        return state;
    }
  } catch (error) {
    console.error("Reducer Error:", error);
    return state;
  }
}

export const DailyContext = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, NewObj);
  return (
    <DailyContext.Provider
      value={{ state, dispatch, getAllTodos, addTodo, deleteTodos, moveToTomorrow, moveToToday }}
    >
      {children}
    </DailyContext.Provider>
  );
};
