import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentList } from "@/components/students/StudentList";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Students() {
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className={`${isMobile ? 'text-center' : ''}`}>
          <h1 className="text-2xl md:text-3xl font-bold text-[#F97316]">Alunos</h1>
          <p className="text-gray-600">Gerencie seus alunos</p>
        </div>
        <StudentList />
      </div>
    </DashboardLayout>
  );
}