import ParentSideNav from "@/components/dashboard/side-nav/parent-side-nav/parent-side-nav"
export default function StudentLayout({
      children,
}: Readonly<{
      children:React.ReactNode
}>) {
            

      return (<>
            <main>
      <ParentSideNav/>
      {children}
      </main>
      </>)
}