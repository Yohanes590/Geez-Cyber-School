"use client"
import { BookCopy, Clock, Folder, LayoutDashboard, LogOut, MessageCircle, Settings } from "lucide-react"
import LoadingScreen from "../../loading-screen/loading-screen"
import Cookies from "js-cookie"
import { Toaster , toast } from "react-hot-toast"
export default function StudentSideNav() {
      const logOut = () => {
            if (confirm("Are you sure for logout")) {
            Cookies.remove("token")
            window.location.reload()  
            } else {
                  toast.success("Process Cancel")
            }
          
      }
      return <>
            <Toaster/>
            <div className="loading-screen">
                  <LoadingScreen/>
            </div>
      <div className="side-nav-container z-40 w-[350px] rounded-[0px_20px_20px_0px] bg-white shadow-[#00000038] shadow-[0_0_20px] fixed h-[100%]">
                  
                  <div className="logo-container pt-[70px] pl-[20px]">
                   <h1 className="text-[25px] font-bold text-[#8b8b8b]">Cyber School</h1>
                   <p className="text-[#636161]">Dashboard Monitor</p>
                   </div>

                  <div className="click-container w-[100%] flex justify-center mt-[50px]">
                        <div className="center-item w-[85%]">
                        <div className="click-time active-class mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer text-blue-500 h-[65px] transition-all duration-500"><LayoutDashboard/>Dashboard</div>
                        <div className="click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer text-blue-500 h-[65px] transition-all duration-500 hover:bg-[#f1f5ff]"><Folder/>Assignment</div>
                        <div className="click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer text-blue-500 h-[65px] transition-all duration-500 hover:bg-[#f1f5ff]"><MessageCircle/>Chat</div>
                        <div className="click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer text-blue-500 h-[65px] transition-all duration-500 hover:bg-[#f1f5ff]"><BookCopy/>Subjects</div>
                              <div className="additional-container mt-[20px] text-blue-500 text-[20px] cursor-default">
                                    Additional Option
                              </div>
                        <div className="click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer text-blue-500 h-[65px] transition-all duration-500 hover:bg-[#f1f5ff]"><Clock/>Result</div>
                        <div className="click-time mt-[5px] flex rounded-[10px] w-[100%] gap-2 items-center pl-[20px] cursor-pointer text-blue-500 h-[65px] transition-all duration-500 hover:bg-[#f1f5ff]"><Settings/>Setting</div>
                        <div onClick={logOut} className="click-time mt-[5px] flex rounded-[10px] w-[80%] gap-2 items-center pl-[20px] cursor-pointer text-red-500 h-[65px] absolute bottom-10 transition-all duration-500 hover:bg-[#fff1f1]"><LogOut/>Logout</div>
                        </div>
                  </div>
                  

    </div>
      </>
}     