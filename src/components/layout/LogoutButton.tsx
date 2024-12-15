import { LogOut } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function LogoutButton() {
  return (
    <div className="mt-auto p-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sair</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}