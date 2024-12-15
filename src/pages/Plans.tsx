import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PlanCard } from "@/components/plans/PlanCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlanForm } from "@/components/plans/PlanForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

const initialPlans: WorkoutPlan[] = [
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
  const [plans, setPlans] = useState<WorkoutPlan[]>(initialPlans);
  const { toast } = useToast();

  const handleCreatePlan = (data: Partial<WorkoutPlan>) => {
    const newPlan = {
      ...data,
      id: crypto.randomUUID(),
    } as WorkoutPlan;

    setPlans((current) => [...current, newPlan]);
    toast({
      title: "Plano criado",
      description: "O novo plano foi criado com sucesso.",
    });
  };

  const handleUpdatePlan = (id: string, data: Partial<WorkoutPlan>) => {
    setPlans((current) =>
      current.map((plan) =>
        plan.id === id ? { ...plan, ...data } : plan
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Planos</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Plano</DialogTitle>
              </DialogHeader>
              <PlanForm onSubmit={handleCreatePlan} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onUpdate={handleUpdatePlan}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}