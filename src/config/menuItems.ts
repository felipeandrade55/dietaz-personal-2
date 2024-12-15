import { Dumbbell, Users, CreditCard, LayoutDashboard, ClipboardList, List } from "lucide-react";

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
        icon: Users,
        path: "/cadastros/alunos",
        dropdownItems: [
          {
            title: "Novo Aluno",
            path: "/cadastros/alunos/novo",
          },
          {
            title: "Lista de Alunos",
            path: "/cadastros/alunos/lista",
          },
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
    submenu: [
      {
        title: "Contas a Pagar",
        icon: List,
        path: "/finance/payables",
        dropdownItems: [
          {
            title: "Nova Conta",
            path: "/finance/payables/new",
          },
          {
            title: "Lista de Contas",
            path: "/finance/payables/list",
          },
        ],
      },
    ],
  },
];