import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentList } from "@/components/students/StudentList";

export default function Students() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#F97316]">Alunos</h1>
          <p className="text-gray-600">Gerencie seus alunos</p>
        </div>
        <StudentList />
      </div>
    </DashboardLayout>
  );
}