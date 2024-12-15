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

// Tipo para representar um aluno
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

// Dados mockados para exemplo
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
      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Buscar alunos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{student.plan.name}</span>
                  <span className="text-sm text-gray-500">
                    R$ {student.plan.price.toFixed(2)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    student.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleHistoryClick(student.id)}
                >
                  <History className="w-4 h-4 mr-2" />
                  Histórico
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}