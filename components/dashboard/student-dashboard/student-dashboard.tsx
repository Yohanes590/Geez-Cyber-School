"use client"
import { DownloadCloud } from "lucide-react"
import { useEffect, useState } from "react"
import { checkingUserRole } from "@/lib/user-authentication"
import Link from "next/link"
import AssignmentChart from "@/components/chart-components/student/assignment-vertical-chart"
import StudentPieChart from "@/components/chart-components/student/pie-chart"
import LoadingScreen from "../loading-screen/loading-screen"

export default function StudentDashboard() {
  const [DateDisplay, setDate] = useState<Date>()

  useEffect(() => {
    const DateCounter = new Date()
    setDate(DateCounter)

   async function userProfileFetch() {
  try {
    const userProfileFetch = await checkingUserRole();
    const UsernameFetch =
      userProfileFetch?.user_profile &&
      Array.isArray(userProfileFetch.user_profile) &&
      userProfileFetch.user_profile[0]?.student_name
        ? userProfileFetch.user_profile[0].student_name.toString()
        : "Guest";

    // Send username as "template" to server renderer
    const resp = await fetch("/api/ssti", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template: UsernameFetch }),
    });

    const HtmlPart = document.querySelector(".user-name-display") as HTMLElement | null;
    if (!HtmlPart) return;

    if (resp.ok) {
      const html = await resp.text();
      // Insert server-rendered HTML -> this is the SSTI effect
      HtmlPart.innerHTML = html;
    } else {
      // fallback
      const txt = await resp.text().catch(() => UsernameFetch);
      HtmlPart.textContent = txt;
    }
  } catch (err) {
    const HtmlPart = document.querySelector(".user-name-display") as HTMLElement | null;
    if (HtmlPart) HtmlPart.textContent = (err as any)?.message ?? "Unable to load username";
  }
}

    userProfileFetch()
  }, [])

  return (
    <>
      <LoadingScreen />
      <div className="dashboard-container ml-[400px] pt-[50px]">
        <div className="header-container">
          <div className="text-button-container items-center mb-[4px] flex justify-between">
            <h1 className="text-[20px] text-[#A1A1A1] font-bold ">
              Student Dashboard
            </h1>
            <button
              onClick={() => (window.location.href = "#download")}
              className="mr-[100px] h-[40px] gap-3 text-white w-[150px] cursor-pointer rounded-[5px] flex justify-center items-center duration-100 transition-all hover:bg-[#000092] bg-blue-600"
            >
              Download <DownloadCloud />
            </button>
          </div>

          <div className="line-div w-[95%] h-[3px] bg-[#a1a1a180]"> </div>
        </div>

        <div className="dashboard-content mt-[30px]">
          <div className="hello-message text-[20px] font-bold">
            Hi ,Welcome 👋
            <div className="user-name-display font-normal"></div>
          </div>

          <div className="card-contents mt-[40px] flex gap-5 flex-wrap">
            <div className="cards-each-card w-[30%] h-[200px] flex flex-wrap-reverse justify-around items-center rounded-[20px] bg-[white] shadow-[#00000025] shadow-[0px_0px_10px]">
              <div className="text-card-content">
                <div className="content">
                  <h1 className="text-[25px] font-bold">All Subjects</h1>
                  <p>This Year {DateDisplay?.getFullYear()}</p>
                  <div className="card-click-link mt-[20px]">
                    <Link href="#view-more" className="text-blue-500">
                      View more
                    </Link>
                  </div>
                </div>
              </div>
              <div className="moc-number-display bg-[#0044ff31] text-blue-700 rounded-[50%] w-[80px] h-[80px] flex justify-center items-center font-bold text-[50px]">
                7
              </div>
            </div>

            <div className="cards-each-card w-[30%] h-[200px] flex flex-wrap-reverse justify-around items-center rounded-[20px] bg-[white] shadow-[#00000025] shadow-[0px_0px_10px]">
              <div className="text-card-content">
                <div className="content">
                  <h1 className="text-[25px] font-bold">Submitted </h1>
                  <p>Assignments</p>
                  <div className="card-click-link mt-[20px]">
                    <Link href="#view-more" className="text-blue-500">
                      View more
                    </Link>
                  </div>
                </div>
              </div>
              <div className="moc-number-display bg-[#0044ff31] text-blue-700 rounded-[50%] w-[80px] h-[80px] flex justify-center items-center font-bold text-[50px]">
                2
              </div>
            </div>

            <div className="cards-each-card w-[30%] h-[200px] flex flex-wrap-reverse justify-around items-center rounded-[20px] bg-[white] shadow-[#00000025] shadow-[0px_0px_10px]">
              <div className="text-card-content">
                <div className="content">
                  <h1 className="text-[25px] font-bold">Total </h1>
                  <p>Assignments</p>
                  <div className="card-click-link mt-[20px]">
                    <Link href="#view-more" className="text-blue-500">
                      View more
                    </Link>
                  </div>
                </div>
              </div>
              <div className="moc-number-display bg-[#0044ff31] text-blue-700 rounded-[50%] w-[80px] h-[80px] flex justify-center items-center font-bold text-[50px]">
                5
              </div>
            </div>

            <div className="chart-container w-full h-full flex items-center gap-5">
              <div className="chart-card w-[46%] h-[auto] flex flex-wrap-reverse justify-around items-center rounded-[20px] bg-[white] shadow-[#00000025] shadow-[0px_0px_10px]">
                <AssignmentChart />
              </div>
              <div className="chart-card w-[46%] h-[auto] flex flex-wrap-reverse justify-around items-center rounded-[20px] bg-[white] shadow-[#00000025] shadow-[0px_0px_10px]">
                <StudentPieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
