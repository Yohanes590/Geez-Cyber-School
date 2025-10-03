"use client"
import { HashLoader } from "react-spinners"
export default function LoadingScreen() {
      return <>
          <div className="loading-screen fixed z-50 w-[100%] bg-white flex items-center justify-center h-[100%]">
                  <div className="animation">
                        <HashLoader color="#0680ff" />
                  </div>
            </div>
      </>
}