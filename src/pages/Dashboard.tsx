import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Este é o conteúdo do Dashboard. Aqui você pode visualizar as informações principais do sistema.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Métricas 1</h2>
            <p>Informações sobre a métrica 1.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Métricas 2</h2>
            <p>Informações sobre a métrica 2.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Métricas 3</h2>
            <p>Informações sobre a métrica 3.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
