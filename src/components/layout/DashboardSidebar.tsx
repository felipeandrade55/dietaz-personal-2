import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { menuItems } from "@/config/menuItems";
import { MenuItems } from "./MenuItems";
import { LogoutButton } from "./LogoutButton";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#F97316]">DietaZ</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={menuItems} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <LogoutButton />
      </SidebarContent>
    </Sidebar>
  );
}