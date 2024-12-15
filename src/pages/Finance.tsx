import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Finance() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <p>Aqui você pode gerenciar suas finanças, incluindo contas a pagar e a receber.</p>
        <div className="flex flex-col space-y-2">
          <a href="/finance/payables" className="text-blue-600 hover:underline">Contas a Pagar</a>
          <a href="/finance/receivables" className="text-blue-600 hover:underline">Contas a Receber</a>
          <a href="/finance/tuition" className="text-blue-600 hover:underline">Mensalidades</a>
        </div>
      </div>
    </DashboardLayout>
  );
}
