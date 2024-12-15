import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListaAlunos() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#F97316]">Lista de Alunos</h1>
            <p className="text-gray-600">Gerencie seus alunos</p>
          </div>
          <Button 
            className="bg-[#F97316]"
            onClick={() => navigate("/cadastros/alunos/novo")}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Novo Aluno
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alunos Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Aqui será implementada a listagem dos alunos */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}