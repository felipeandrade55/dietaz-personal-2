import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountsPayable } from "@/components/finance/AccountsPayable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
          <Button onClick={() => navigate("/finance/payables/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Conta
          </Button>
        </div>
        <AccountsPayable />
      </div>
    </DashboardLayout>
  );
}