import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PlanCard } from "@/components/plans/PlanCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WorkoutPlan {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "quarterly" | "semiannual";
  schedule: string;
  sessionsPerWeek: number;
  type: "individual" | "group";
  description: string;
}

const mockPlans: WorkoutPlan[] = [
  {
    id: "1",
    name: "Plano Básico",
    price: 250.00,
    period: "monthly",
    schedule: "06:00 - 22:00",
    sessionsPerWeek: 3,
    type: "group",
    description: "Acompanhamento personalizado do seu treino"
  },
  {
    id: "2",
    name: "Plano Premium",
    price: 350.00,
    period: "monthly",
    schedule: "Horário Livre",
    sessionsPerWeek: 5,
    type: "individual",
    description: "Treino + Plano alimentar personalizado + Suplementação"
  }
];

export default function Plans() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Planos</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Plano
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}