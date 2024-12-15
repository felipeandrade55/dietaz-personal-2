import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountsPayable } from "@/components/finance/AccountsPayable";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PayablesList() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contas a Pagar</h2>
            <p className="text-muted-foreground">
              Gerencie suas contas a pagar de forma eficiente
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/finance")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={() => navigate("/finance/payables/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
          </div>
        </div>
        <AccountsPayable />
      </div>
    </DashboardLayout>
  );
}