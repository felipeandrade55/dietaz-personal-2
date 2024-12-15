import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReceivablesList() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contas a Receber</h2>
            <p className="text-muted-foreground">
              Gerencie suas contas a receber de forma eficiente
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
            <Button onClick={() => navigate("/finance/receivables/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Cobrança
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contas a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implementar lista de contas a receber */}
            <p>Em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}