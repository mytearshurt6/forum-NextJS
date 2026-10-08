import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header/header'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className="fixed top-18" />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
