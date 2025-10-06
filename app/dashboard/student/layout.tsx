import StudentSideNav from "@/components/dashboard/side-nav/student-side-nav/student-side-nav"
export default function StudentLayout({
      children,
}: Readonly<{
      children:React.ReactNode
}>) {
            

      return (<>
            <main>
      <StudentSideNav/>
      {children}
      </main>
      </>)
}