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
      color: "bg-[#F97316]",
    },
    {
      title: "Financeiro",
      description: "Controle suas finanças",
      icon: Wallet,
      path: "/finance",
      color: "bg-[#F97316]",
    },
    {
      title: "Clientes",
      description: "Gerencie seus pacientes",
      icon: Users,
      path: "/clients",
      color: "bg-[#F97316]",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-[#F97316]">Bem-vindo ao DietaZ</h1>
        <p className="text-gray-600 mb-8">Selecione uma opção para começar</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-white"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-start space-x-4">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#F97316]">{item.title}</h2>
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