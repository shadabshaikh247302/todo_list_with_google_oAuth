"use client"
import Image from "next/image";
import styles from "./page.module.css";

import { Main_component } from "./component/Home/Main_component";
import { Navbar } from "./component/navbar/Navbar";
import { useContext, useEffect } from "react";
import { Authcontext } from "./Context/Authcontext";
import { Login } from "./Auth/login/Login";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function Hello(){
  const {AuthData} = useContext(Authcontext)
  const router = useRouter()
  // console.log(AuthData)
  useEffect(()=>{
      if(!AuthData.token){
        router.push('/Auth/login')
      toast.error("You are not logged in!")
    }
  },[])
  return(

    <div >
      {
        AuthData.token === ''?
          router.push("/Auth/login"):<Main_component/>
        
      }
      
    </div>  
  );
}

