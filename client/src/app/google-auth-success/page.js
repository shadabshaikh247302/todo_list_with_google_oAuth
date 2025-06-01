"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useContext } from "react"
import { Authcontext } from "@/context/Authcontext"
import toast from "react-hot-toast"

const GoogleAuthSuccess = () => {
  const { dispatch, getDataById } = useContext(Authcontext)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get("token")

    const handleGoogleLogin = async () => {
      if (!token) {
        toast.error("Token not found in URL")
        return
      }

      try {
        // Store token in localStorage
        localStorage.setItem("token", token)

        // You can either fetch full user data using token or use token directly
        const res = await getDataById("me") // or use `/auth/me` endpoint if your backend supports it
        const userData = res?.data

        if (userData) {
          dispatch({ type: "LOGIN_IN", payload: { ...userData, token } })
          toast.success("Logged in successfully")
          router.push("/") // redirect to dashboard or homepage
        } else {
          toast.error("Failed to fetch user data")
        }
      } catch (err) {
        console.log(err)
        toast.error("Something went wrong")
      }
    }

    handleGoogleLogin()
  }, [searchParams])

  return <p>Logging in with Google...</p>
}

export default GoogleAuthSuccess
