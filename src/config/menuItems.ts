import { Dumbbell, Users, CreditCard, LayoutDashboard } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
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