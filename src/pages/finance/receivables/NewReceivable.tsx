import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewReceivable() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Nova Conta a Receber</h2>
            <p className="text-muted-foreground">
              Cadastre uma nova cobrança no sistema
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/finance/receivables/list")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nova Conta a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implementar formulário de nova conta a receber */}
            <p>Em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}