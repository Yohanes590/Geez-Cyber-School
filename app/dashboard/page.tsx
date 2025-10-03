"use client"
import { useEffect } from "react"
import Cookies from "js-cookie"
import LoadingScreen from "@/components/dashboard/loading-screen/loading-screen"
export default function AuthenFunction() {

      useEffect(() => {

            const sendIDIntoServer = async () => {
                 try {
                   const userId = Cookies.get("token")
                  if(!userId) return window.location.href = "/"
                  const serverResponse = await fetch("/api/auth/userCheck", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                              token:userId
                        })
                  })
            const changeToJson = await serverResponse.json()
                  console.log(changeToJson)
                  if (changeToJson.user_profile[0].user_role == "student") {
                  window.location.href = "/dashboard/student"
                  } else if (changeToJson.user_profile[0].user_role == "teacher") {
                  window.location.href = "/dashboard/teacher"
                  } else if (changeToJson.user_profile[0].user_role == "parent") {
                  window.location.href = "/dashboard/parent"
                  } else if (changeToJson.user_profile[0].user_role == "admin") {
                  window.location.href = "/dashboard"
                  } else {
                  
                  }

                 } catch (error:any) {
                  console.log(error.message)
                 }
            }
            sendIDIntoServer()
      },[])


      return <LoadingScreen/>
}