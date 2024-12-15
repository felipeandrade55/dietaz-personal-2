import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentList } from "@/components/students/StudentList";

export default function Students() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Alunos</h1>
        <StudentList />
      </div>
    </DashboardLayout>
  );
}