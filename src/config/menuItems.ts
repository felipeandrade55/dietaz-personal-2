import { Dumbbell, Users, CreditCard, LayoutDashboard, UserPlus, ClipboardList, Search } from "lucide-react";

export const menuItems = [
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
    title: "Alunos",
    icon: Users,
    path: "/students",
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