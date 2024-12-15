import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TuitionManagement } from "@/components/finance/tuition/TuitionManagement";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TuitionControl() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Controle de Mensalidades</h2>
            <p className="text-muted-foreground">
              Gerencie as mensalidades dos alunos
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/finance")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
        <TuitionManagement />
      </div>
    </DashboardLayout>
  );
}