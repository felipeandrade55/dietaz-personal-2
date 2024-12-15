import { DashboardLayout } from "@/components/layout/DashboardLayout";
import HistoricoEvolucao from "@/components/alunos/HistoricoEvolucao";
import { useParams } from "react-router-dom";

export default function HistoricoAluno() {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#F97316]">Histórico de Evolução</h1>
          <p className="text-gray-600">Acompanhe a evolução do aluno</p>
        </div>
        <HistoricoEvolucao />
      </div>
    </DashboardLayout>
  );
}