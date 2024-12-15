import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlanForm } from "./PlanForm";
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

interface PlanCardProps {
  plan: WorkoutPlan;
  onUpdate: (id: string, data: Partial<WorkoutPlan>) => void;
}

const periodLabels = {
  monthly: "Mensal",
  quarterly: "Trimestral",
  semiannual: "Semestral",
};

export function PlanCard({ plan, onUpdate }: PlanCardProps) {
  const { toast } = useToast();

  const handleUpdate = (data: Partial<WorkoutPlan>) => {
    onUpdate(plan.id, data);
    toast({
      title: "Plano atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{plan.name}</span>
          <span className="text-2xl font-bold text-brand-600">
            R$ {plan.price.toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{periodLabels[plan.period]}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{plan.schedule}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            {plan.type === "individual" ? (
              <User className="w-4 h-4" />
            ) : (
              <Users className="w-4 h-4" />
            )}
            <span>
              {plan.type === "individual" ? "Treino Individual" : "Treino em Grupo"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{plan.sessionsPerWeek}x por semana</span>
          </div>
        </div>
        
        <div className="pt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Editar Plano</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Plano</DialogTitle>
              </DialogHeader>
              <PlanForm onSubmit={handleUpdate} defaultValues={plan} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}