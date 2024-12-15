import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Plans() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Planos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Plano Básico</h2>
            <p className="text-gray-600">Acesso básico à academia</p>
            <div className="text-2xl font-bold">R$ 89,90/mês</div>
            <ul className="space-y-2">
              <li>✓ Musculação</li>
              <li>✓ Área de peso livre</li>
              <li>✓ Horário comercial</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Plano Plus</h2>
            <p className="text-gray-600">Acesso intermediário à academia</p>
            <div className="text-2xl font-bold">R$ 129,90/mês</div>
            <ul className="space-y-2">
              <li>✓ Todos os benefícios do Plano Básico</li>
              <li>✓ Aulas em grupo</li>
              <li>✓ Horário estendido</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Plano Premium</h2>
            <p className="text-gray-600">Acesso completo à academia</p>
            <div className="text-2xl font-bold">R$ 199,90/mês</div>
            <ul className="space-y-2">
              <li>✓ Todos os benefícios do Plano Plus</li>
              <li>✓ Personal Trainer</li>
              <li>✓ Acesso 24/7</li>
              <li>✓ Área VIP</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}