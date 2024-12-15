import { Dumbbell, Users, CreditCard, LayoutDashboard, UserPlus, ClipboardList } from "lucide-react";

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