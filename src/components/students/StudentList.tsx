import { useState } from "react";
import { Search, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: {
    name: string;
    price: number;
  };
  status: "active" | "inactive";
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    plan: {
      name: "Plano Básico",
      price: 250.00
    },
    status: "active",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
    plan: {
      name: "Plano Premium",
      price: 350.00
    },
    status: "active",
  },
];

export function StudentList() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHistoryClick = (studentId: string) => {
    navigate(`/cadastros/alunos/${studentId}/historico`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar alunos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 sm:rounded-lg border">
        <div className="min-w-full align-middle">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Nome</TableHead>
                {!isMobile && (
                  <>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">Telefone</TableHead>
                  </>
                )}
                <TableHead className="whitespace-nowrap">Plano</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell className="max-w-[200px] truncate">
                        {student.email}
                      </TableCell>
                      <TableCell>{student.phone}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium truncate">{student.plan.name}</span>
                      <span className="text-sm text-gray-500">
                        R$ {student.plan.price.toFixed(2)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleHistoryClick(student.id)}
                      className="w-full sm:w-auto"
                    >
                      <History className="w-4 h-4 sm:mr-2" />
                      {!isMobile && "Histórico"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}