import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from "react-router-dom";
import { DashboardNavbar } from "./components/DashoardNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const authRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password','/verify-otp','/'];
  const isAuthPage = authRoutes.includes(location.pathname);

  if (isAuthPage) {
    return (
      <main className="w-full">
        {children}
        <Toaster />
      </main>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <nav className="border-b px-4 flex items-center h-16">
          <SidebarTrigger className="mr-2" />
          <div className="flex-1" />
          <DashboardNavbar />
      
        </nav>
        <div className="p-4">
          {children}
        </div>
        <Toaster />
      </main>
    </SidebarProvider>
  );
}