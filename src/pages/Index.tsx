import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChartBar, Users, Wallet } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      description: "Visão geral do seu negócio",
      icon: ChartBar,
      path: "/",
      color: "bg-blue-500",
    },
    {
      title: "Financeiro",
      description: "Controle suas finanças",
      icon: Wallet,
      path: "/finance",
      color: "bg-green-500",
    },
    {
      title: "Clientes",
      description: "Gerencie seus alunos",
      icon: Users,
      path: "/clients",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Bem-vindo ao FitnessPro</h1>
        <p className="text-gray-600 mb-8">Selecione uma opção para começar</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-start space-x-4">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;