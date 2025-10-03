"use client";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import Cookies from "js-cookie"
import { useState } from "react";

export default function SignInFunction() {

  const [ButtonLoading, setLoading] = useState<boolean>(false)
  const RegistreFunction = async () => {
    const userName = document.getElementById("user-name") as HTMLInputElement;
    const userEmail = document.getElementById("user-email") as HTMLInputElement;
    const userGrade = document.getElementById("user-grade") as HTMLInputElement;
    const userSection = document.getElementById(
      "user-section"
    ) as HTMLInputElement;
    const UserPassword = document.getElementById(
      "user-password"
    ) as HTMLInputElement;
    const ConfirmPassword = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    const EmptySpace = "";

    const userJson = {
      student_name: userName.value,
      student_email: userEmail.value,
      student_grade: userGrade.value,
      student_section: userSection.value,
      student_password: UserPassword.value,
    }

    if (userName.value == EmptySpace) {
      toast.error("Please insert you name", { position: "top-left" });
    } else if (userEmail.value == EmptySpace) {
      toast.error("Please insert you email", { position: "top-left" });
    } else if (!userEmail.value.includes("@")) {
      toast.error("Invalid email", { position: "top-left" });
    } else if (userGrade.value == EmptySpace) {
      toast.error("Please insert you grade", { position: "top-left" });
    } else if (
      parseInt(userGrade.value) < 9 ||
      parseInt(userGrade.value) > 13
    ) {
      toast.error("Only for high school student", { position: "top-left" });
    } else if (userSection.value == EmptySpace) {
      toast.error("Please fill section", { position: "top-left" });
    } else if (userSection.value.length > 2) {
      toast.error("must be 2 digit", { position: "top-left" });
    } else if (UserPassword.value == EmptySpace) {
      toast.error("Password required!", { position: "top-left" });
    } else if (UserPassword.value.length < 4) {
      toast.error("Password must be 4 char!", { position: "top-left" });
    } else if (UserPassword.value != ConfirmPassword.value) {
      toast.error("Password not match!", { position: "top-left" });
    } else {
      setLoading(true)
      const sendToserver = await fetch("/api/auth/signin", {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userJson)
      })
      const awaitLog = await sendToserver.json()
      console.log(awaitLog)
      if (awaitLog.status == 200) {
        Cookies.set("token",awaitLog.token,{expires:1})
        toast.success("Register successfully ", { position: "top-left" });
        window.location.href="/dashboard/student"
      } else {
        toast.error(awaitLog.message, { position: "top-left" });
      }
      setLoading(false)
    }
  };

  return (
    <>
      <Toaster />
      <div className="form-container flex h-screen">
        <div className="form-container w-[35%] p-[50px] mt-[30px]">
          <div className="text-content w-[500px] ">
            <h1 className="text-[30px] font-bold">Hello there 👋</h1>
            <p>
              Today is a new day. It's your day. You shape it. Sign in to start
              managing your projects.
            </p>
          </div>
          <div className="input-content mt-[30px]">
            <div className="input-lable mt-[20px]">
              <label>Full Name</label>
              <br />
              <input
                type="text"
                id="user-name"
                placeholder="Jon, Doe"
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="input-lable mt-[20px]">
              <label>Email</label>
              <br />
              <input
                id="user-email"
                type="email"
                placeholder="exmaple@gmail.com"
                required
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="input-lable mt-[20px]">
              <label>Grade</label>
              <br />
              <input
                id="user-grade"
                type="number"
                placeholder="1,2,3.."
                required
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="input-lable mt-[20px]">
              <label>Section</label>
              <br />
              <input
                id="user-section"
                type="text"
                placeholder="A, B ,C"
                required
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="input-lable mt-[20px]">
              <label>Password</label>
              <br />
              <input
                id="user-password"
                type="password"
                placeholder="******"
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="input-lable mt-[20px]">
              <label>Confirm Password</label>
              <br />
              <input
                id="confirm-password"
                type="password"
                placeholder="*****"
                required
                className="mt-[5px] w-[500px] bg-[var(--secondary-color)] rounded-[10px] h-[50px] outline-blue-600 border-1 border-blue-600 pl-[20px]"
              />
            </div>

            <div className="register-button-container mt-[20px]">
              <button
                disabled={ButtonLoading}
                onClick={RegistreFunction}
                className={
                  `flex items-center justify-center gap-2 bg-[var(--primary-color)] w-[500px] h-[50px] rounded-[10px] text-[white] transition-all duration-400 hover:bg-blue-800 ${ButtonLoading ? "cursor-no-drop bg-blue-800" : "cursor-pointer"
                  }`}
              >
                {
                  ButtonLoading ? (
                    <>
                      Sign in
                      <BounceLoader color="#ffffff" size={20} />
                    </>
                  ) : (
                    "Sign in"
                  )
                }
              </button>
              <div className="lable mt-[10px]">
                <label>
                  Already have account{" "}
                  <Link href="/login" className="text-blue-600">
                    Login
                  </Link>{" "}
                </label>
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
