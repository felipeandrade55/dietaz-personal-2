import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/finance/FinancialSummary";
import { AccountsReceivable } from "@/components/finance/AccountsReceivable";
import { AccountsPayable } from "@/components/finance/AccountsPayable";

export default function Finance() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Controle Financeiro</h2>
          <p className="text-gray-600">Gerencie suas finanças de forma eficiente</p>
        </div>

        <FinancialSummary />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccountsReceivable />
          <AccountsPayable />
        </div>
      </div>
    </DashboardLayout>
  );
}