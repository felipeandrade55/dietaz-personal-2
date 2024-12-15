import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountsPayable } from "@/components/finance/AccountsPayable";

export default function PayablesList() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Contas a Pagar</h2>
          <p className="text-gray-600">Gerencie suas contas a pagar</p>
        </div>
        <AccountsPayable />
      </div>
    </DashboardLayout>
  );
}