import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
