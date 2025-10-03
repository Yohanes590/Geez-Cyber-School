"use client";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import { useState } from "react";
import Cookies from "js-cookie"
export default function LoginFunction() {
  const [ ButtonLoading , setLoading ] = useState<boolean>(false)
  const LoginFunction = async () => {
    const userName = document.getElementById("input-email") as HTMLInputElement;
    const userPassword = document.getElementById("input-password") as HTMLInputElement;
    if (userName.value == "") {
      toast.error("Please insert email",{ position: "top-left" })
    } else if(userPassword.value == "") {
      toast.error("Please insert password",{ position: "top-left" })
    } else {
      setLoading(true)
      const SendInfo = await fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        user_email: userName.value,
        user_password:userPassword.value
      })
    })
    const ChangeResponseIntoJsonFormat = await SendInfo.json()
      console.log(ChangeResponseIntoJsonFormat)
      setLoading(false)
      if (ChangeResponseIntoJsonFormat.status == 200) {
        toast.success(ChangeResponseIntoJsonFormat.message, { position: "top-left" });
        Cookies.set("token",ChangeResponseIntoJsonFormat.token,{expires:1})
        window.location.href="/dashboard"
      } else {
       toast.error(ChangeResponseIntoJsonFormat.message, { position: "top-left" });
      }
    }
   
  };

  return (
    <>
      <Toaster />
      <div className="form-container flex h-screen]">
        <div className="form-container w-[35%] p-[50px] mt-[70px]">
          <div className="text-content w-[500px] ">
            <h1 className="text-[30px] font-bold">Welocme Back 👋</h1>
            <p>
              Access your account and keep your projects on track. Stay
              organized and accomplish more every day
            </p>
          </div>
          <div className="input-content mt-[40px]">
            <div className="input-lable mt-[20px]">
              <label>Email</label>
              <br />
              <input
                type="email"
                id="input-email"
                placeholder="exmaple@gmail.com"
                required
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="input-lable mt-[20px]">
              <label>Password</label>
              <br />
              <input
                type="password"
                id="input-password"
                placeholder="*****"
                required
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="register-button-container mt-[20px]">
               <button
                disabled={ButtonLoading}
                onClick={LoginFunction}
                className={
                `flex items-center justify-center gap-2 bg-[var(--primary-color)] w-[500px] h-[50px] rounded-[10px] text-[white] transition-all duration-400 hover:bg-blue-800 ${
                  ButtonLoading ? "cursor-no-drop bg-blue-800" :"cursor-pointer"
                }`}
              >
                {
                  ButtonLoading ? (
                    <>
                    Login
                    <BounceLoader color="#ffffff" size={20} />
                    </>
                  ):(
                   "Login"
                  )
                }
              </button>

              <div className="lable flex justify-between items-center mt-[10px] text-right">
                <div className="check-lable mt-[10px]">
                  <div className="fkex items-center">
                    {" "}
                    <input type="checkbox" /> Remamber Me
                  </div>
                </div>
                <div className="user-option-container mt-[10px]">
                  <label>
                    I dont have account{" "}
                    <Link href="/" className="text-blue-600">
                      Sign In
                    </Link>{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="image-container w-[65%] h-screen">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Staples_High_School%2C_Westport%2C_CT.jpg/1200px-Staples_High_School%2C_Westport%2C_CT.jpg"
            width={700}
            height={700}
            alt="Image"
          />
        </div>
      </div>
    </>
  );
}
