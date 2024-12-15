import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Index() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Bem-vindo ao Sistema</h1>
        <p>Selecione uma opção no menu lateral para começar.</p>
      </div>
    </DashboardLayout>
  );
}