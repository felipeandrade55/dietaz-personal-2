import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/finance/FinancialSummary";
import { FinancialReports } from "@/components/finance/dashboard/FinancialReports";
import { FinancialKPIs } from "@/components/finance/dashboard/FinancialKPIs";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao seu painel de controle</p>
        </div>

        <FinancialSummary />
        
        <div className="grid grid-cols-1 gap-8">
          <FinancialKPIs />
          <FinancialReports />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;