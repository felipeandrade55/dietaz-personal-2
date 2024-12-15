import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { PayableForm } from "@/components/finance/PayableForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewPayable() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Nova Conta a Pagar</h2>
            <p className="text-muted-foreground">
              Cadastre uma nova conta no sistema
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/finance/payables/list")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
        <Card className="p-6">
          <PayableForm />
        </Card>
      </div>
    </DashboardLayout>
  );
}