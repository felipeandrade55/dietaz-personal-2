import { Dumbbell, Users, CreditCard, LayoutDashboard, LogOut, UserPlus, ClipboardList } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Cadastros",
    icon: ClipboardList,
    submenu: [
      {
        title: "Alunos",
        icon: UserPlus,
        path: "/students",
        dropdownItems: [
          { title: "Novo Aluno", path: "/students/new" },
          { title: "Lista de Alunos", path: "/students" },
        ],
      },
    ],
  },
  {
    title: "Clientes",
    icon: Users,
    path: "/clients",
  },
  {
    title: "Planos",
    icon: Dumbbell,
    path: "/workouts",
  },
  {
    title: "Financeiro",
    icon: CreditCard,
    path: "/finance",
  },
];

export function DashboardSidebar() {
  const navigate = useNavigate();

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
              {menuItems.map((item) => (
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
                          <DropdownMenu key={subItem.title}>
                            <DropdownMenuTrigger asChild>
                              <div className="flex items-center px-2 py-1.5 cursor-pointer hover:bg-accent rounded-sm">
                                <subItem.icon className="w-4 h-4 mr-2" />
                                <span>{subItem.title}</span>
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" className="w-48">
                              {subItem.dropdownItems.map((dropdownItem) => (
                                <DropdownMenuItem
                                  key={dropdownItem.title}
                                  onClick={() => navigate(dropdownItem.path)}
                                >
                                  {dropdownItem.title}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <SidebarMenuButton onClick={() => navigate(item.path)}>
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
      </SidebarContent>
    </Sidebar>
  );
}