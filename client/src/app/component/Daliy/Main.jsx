"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Form } from "./Form";
import { Previous } from "./Previous";
import { Tomorrow } from "./Tomorrow";
import "./loader.css";

import { DailyContext } from "../../Context/DailyContext";
import { Authcontext } from "../../Context/Authcontext";
import { Navbar } from "../navbar/Navbar";
import { Today } from "./Today";
import { useRouter } from "next/navigation";

const Main = () => {
  const { state, dispatch, getAllTodos } = useContext(DailyContext);
  // const { AuthData } = useContext(Authcontext);  // Getting Auth Data from AuthContext
  // console.log(state);
  const router = useRouter()
  
  const [ToDOs, SetTODOs] = useState(state);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchTodos();
    }, []);

  async function fetchTodos() {
    const localData = JSON.parse(localStorage.getItem("userData"))
    try {
      if(localData){
        setLoading(true);
        const data = await getAllTodos(localData?.userID);
      
        if(data){
          dispatch({
            type: "GET_ALL_TODOS",
            payload: data,
          })
        }
      }else{
        // alert("You are logout!")
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

// console.log(state.todos.today)
  return (
    <div>
      <div className="main-containe">
        <div className="form-wrapper my-3">
          <Form fetchTodos={fetchTodos} SetTODOs={SetTODOs} setLoading={setLoading} loading={loading} ToDOs={ToDOs} />
        </div>
        {loading ? (
              <div className="loader-container">
                <div className="dot-loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
        ) : (
          <div className="d-flex flex-column flex-md-row justify-content-around my-4 tasks-container">
            <div className="task-box previous-task m-2">
              {state?.todos?.previous?.length > 0 ? (
                <Previous fetchTodos={fetchTodos} setLoading={setLoading} />
              ) : (
                <p className="empty-task text-white">Previous</p>
              )}
            </div>

            <div className="task-box today-task m-2">
              {state?.todos?.today?.length > 0 ? (
                <Today fetchTodos={fetchTodos} setLoading={setLoading}/>
                // <Today fetchTodos={fetchTodos} ToDOs={ToDOs} />
              ) : (
                <p className="empty-task text-white" >Today is Empty</p>
              )}
            </div>

            <div className="task-box tomorrow-task m-2">
              { state?.todos?.tomorrow?.length > 0 ? (
                <Tomorrow fetchTodos={fetchTodos} setLoading={setLoading} />
              ) : (
                <p className="empty-task text-white">Tomorrow</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
