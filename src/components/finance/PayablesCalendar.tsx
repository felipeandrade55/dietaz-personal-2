import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarCheck, CalendarX } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PayableEvent {
  id: number;
  description: string;
  dueDate: string;
  value: number;
  status: string;
}

interface PayablesCalendarProps {
  payables: PayableEvent[];
}

export function PayablesCalendar({ payables }: PayablesCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Função para verificar se há contas em um determinado dia
  const hasPayablesOnDay = (day: Date) => {
    return payables.some(
      (payable) => format(new Date(payable.dueDate), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  // Função para obter as contas de um determinado dia
  const getPayablesForDay = (day: Date) => {
    return payables.filter(
      (payable) => format(new Date(payable.dueDate), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Calendário de Vencimentos</h3>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        modifiers={{
          hasPayable: (date) => hasPayablesOnDay(date),
        }}
        modifiersStyles={{
          hasPayable: {
            fontWeight: "bold",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
          },
        }}
        components={{
          DayContent: ({ date }) => {
            const dayPayables = getPayablesForDay(date);
            if (dayPayables.length === 0) return <span>{date.getDate()}</span>;

            return (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="relative w-full h-full flex items-center justify-center cursor-pointer">
                    <span>{date.getDate()}</span>
                    {dayPayables.some((p) => p.status === "pendente") ? (
                      <CalendarX className="w-3 h-3 absolute top-0 right-0 text-red-500" />
                    ) : (
                      <CalendarCheck className="w-3 h-3 absolute top-0 right-0 text-green-500" />
                    )}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">
                      Contas para {format(date, "dd 'de' MMMM", { locale: ptBR })}
                    </h4>
                    {dayPayables.map((payable) => (
                      <div
                        key={payable.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{payable.description}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            R$ {payable.value.toFixed(2)}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              payable.status === "pago"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payable.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          },
        }}
      />
    </div>
  );
}