import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, User } from "lucide-react";

interface WorkoutPlan {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "quarterly" | "semiannual";
  schedule: string;
  sessionsPerWeek: number;
  type: "individual" | "group";
}

interface PlanCardProps {
  plan: WorkoutPlan;
}

const periodLabels = {
  monthly: "Mensal",
  quarterly: "Trimestral",
  semiannual: "Semestral",
};

export function PlanCard({ plan }: PlanCardProps) {
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
          <Button className="w-full">Editar Plano</Button>
        </div>
      </CardContent>
    </Card>
  );
}