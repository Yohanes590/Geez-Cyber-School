import TeacherSideNav from "@/components/dashboard/side-nav/teacher-side-nav/teacher-side-nav"
export default function DashboardLayout({
      children,
}: Readonly<{
      children:React.ReactNode
}>) {
      return (<>
            <main>
             <TeacherSideNav/>
      {children}
      </main>
      </>)
}