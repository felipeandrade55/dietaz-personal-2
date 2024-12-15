import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialKPIs } from "@/components/finance/dashboard/FinancialKPIs";
import { FinancialReports } from "@/components/finance/dashboard/FinancialReports";
import { AccountsReceivable } from "@/components/finance/AccountsReceivable";
import { AccountsPayable } from "@/components/finance/AccountsPayable";
import { TuitionManagement } from "@/components/finance/tuition/TuitionManagement";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Finance() {
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-full overflow-x-hidden pb-8">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Controle Financeiro</h2>
          <p className="text-sm md:text-base text-gray-600">Gerencie suas finanças de forma eficiente</p>
        </div>

        <div className="grid gap-6">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <FinancialKPIs />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className={`min-w-full ${isMobile ? 'px-0' : 'px-4'}`}>
              <FinancialReports />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <TuitionManagement />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <AccountsReceivable />
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <AccountsPayable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}