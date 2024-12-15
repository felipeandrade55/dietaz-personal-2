import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <DashboardSidebar />
        <main className={`flex-1 overflow-auto ${isMobile ? 'p-2' : 'pl-2 pr-4 py-6'}`}>
          {isMobile && (
            <div className="mb-4">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SidebarTrigger>
            </div>
          )}
          <div className="max-w-[100vw] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}