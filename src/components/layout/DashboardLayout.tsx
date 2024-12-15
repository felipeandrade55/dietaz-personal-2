import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <DashboardSidebar />
        <main className={`flex-1 overflow-auto ${isMobile ? 'p-4' : 'p-8'}`}>
          <div className="max-w-[100vw] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}