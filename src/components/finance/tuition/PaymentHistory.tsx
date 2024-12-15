import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "react-router-dom";

interface Payment {
  id: string;
  date: string;
  value: number;
  method: string;
  reference: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    date: "2024-03-15",
    value: 175.00,
    method: "PIX",
    reference: "Mensalidade Março/2024"
  },
  {
    id: "2",
    date: "2024-02-10",
    value: 350.00,
    method: "Cartão de Crédito",
    reference: "Mensalidade Fevereiro/2024"
  }
];

export function PaymentHistory() {
  const { studentId } = useParams();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Pagamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Referência</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  {new Date(payment.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>R$ {payment.value.toFixed(2)}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}