import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface DropdownItem {
  title: string;
  path: string;
}

interface SubMenuItem {
  title: string;
  icon: LucideIcon;
  path: string;
  dropdownItems: DropdownItem[];
}

interface MenuItem {
  title: string;
  icon: LucideIcon;
  path?: string;
  submenu?: SubMenuItem[];
}

interface MenuItemsProps {
  items: MenuItem[];
}

export function MenuItems({ items }: MenuItemsProps) {
  const navigate = useNavigate();

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          {item.submenu ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center px-3 py-2 cursor-pointer hover:bg-sidebar-accent rounded-md">
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.title}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-48">
                {item.submenu.map((subItem) => (
                  <DropdownMenuSub key={subItem.title}>
                    <DropdownMenuSubTrigger className="flex items-center">
                      <subItem.icon className="w-4 h-4 mr-2" />
                      <span>{subItem.title}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48">
                      {subItem.dropdownItems.map((dropdownItem) => (
                        <DropdownMenuItem
                          key={dropdownItem.title}
                          onClick={() => navigate(dropdownItem.path)}
                        >
                          {dropdownItem.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SidebarMenuButton onClick={() => navigate(item.path!)}>
              <item.icon className="w-4 h-4 mr-2" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </>
  );
}