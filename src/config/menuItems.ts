import { 
  Dumbbell, 
  Users, 
  CreditCard, 
  LayoutDashboard, 
  ClipboardList, 
  List, 
  Receipt, 
  FileText, 
  CreditCard as CreditCardIcon,
  UserPlus,
  FolderOpen,
  GraduationCap
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Cadastros",
    icon: FolderOpen,
    submenu: [
      {
        title: "Alunos",
        icon: GraduationCap,
        path: "/cadastros/alunos",
        dropdownItems: [
          {
            title: "Novo Aluno",
            path: "/cadastros/alunos/novo",
            icon: UserPlus,
          },
          {
            title: "Lista de Alunos",
            path: "/cadastros/alunos/lista",
            icon: List,
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
        icon: FileText,
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
      {
        title: "Contas a Receber",
        icon: Receipt,
        path: "/finance/receivables",
        dropdownItems: [
          {
            title: "Nova Cobrança",
            path: "/finance/receivables/new",
          },
          {
            title: "Lista de Cobranças",
            path: "/finance/receivables/list",
          },
        ],
      },
      {
        title: "Mensalidades",
        icon: CreditCardIcon,
        path: "/finance/tuition",
        dropdownItems: [
          {
            title: "Gerar Mensalidades",
            path: "/finance/tuition/generate",
          },
          {
            title: "Controle de Mensalidades",
            path: "/finance/tuition/control",
          },
        ],
      },
    ],
  },
];