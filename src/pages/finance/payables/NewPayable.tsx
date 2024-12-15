import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { PayableForm } from "@/components/finance/PayableForm";

export default function NewPayable() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Nova Conta a Pagar</h2>
          <p className="text-gray-600">Cadastre uma nova conta a pagar</p>
        </div>
        <Card className="p-6">
          <PayableForm />
        </Card>
      </div>
    </DashboardLayout>
  );
}