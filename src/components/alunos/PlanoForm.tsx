import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/alunoFormSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { format, differenceInDays, getDaysInMonth, parse, startOfMonth, endOfMonth } from "date-fns";

type PlanoFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

// Mock function to fetch plans - replace with actual API call later
const fetchPlanos = async () => {
  return [
    {
      id: "1",
      name: "Plano Básico",
      price: 250.00,
      description: "Acompanhamento personalizado do seu treino"
    },
    {
      id: "2",
      name: "Plano Premium",
      price: 350.00,
      description: "Treino + Plano alimentar personalizado + Suplementação"
    }
  ];
};

export function PlanoForm({ form }: PlanoFormProps) {
  const { data: planos } = useQuery({
    queryKey: ['planos'],
    queryFn: fetchPlanos,
  });

  const selectedPlanId = form.watch("planoId");
  const dataInicio = form.watch("dataInicio");
  const diaVencimento = form.watch("diaVencimento");
  const selectedPlan = planos?.find(p => p.id === selectedPlanId);

  const calculateProRataValue = () => {
    if (!selectedPlan || !dataInicio || !diaVencimento) return null;

    const startDate = parse(dataInicio, 'yyyy-MM-dd', new Date());
    const daysInMonth = getDaysInMonth(startDate);
    const monthStart = startOfMonth(startDate);
    const monthEnd = endOfMonth(startDate);
    
    // Convert diaVencimento to a number
    const paymentDay = parseInt(diaVencimento);
    if (isNaN(paymentDay) || paymentDay < 1 || paymentDay > 31) return null;

    // Calculate remaining days until next payment
    let daysUntilPayment;
    if (paymentDay < startDate.getDate()) {
      // Payment will be in the next month
      daysUntilPayment = differenceInDays(endOfMonth(startDate), startDate) + paymentDay;
    } else {
      // Payment will be in the current month
      daysUntilPayment = paymentDay - startDate.getDate();
    }

    // Calculate pro-rata value
    const dailyRate = selectedPlan.price / daysInMonth;
    const proRataValue = dailyRate * daysUntilPayment;

    return {
      proRataValue: proRataValue.toFixed(2),
      daysUntilPayment,
      nextPaymentDate: format(
        parse(`${paymentDay}`, 'd', startDate), 
        "dd/MM/yyyy"
      )
    };
  };

  const proRataInfo = calculateProRataValue();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="planoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plano</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {planos?.map((plano) => (
                    <SelectItem key={plano.id} value={plano.id}>
                      {plano.name} - R$ {plano.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataInicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Início</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diaVencimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia do Vencimento</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  max="31" 
                  placeholder="Ex: 10" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {selectedPlan && proRataInfo && (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h4 className="font-semibold">{selectedPlan.name}</h4>
              <p className="text-sm text-gray-600">{selectedPlan.description}</p>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-green-600">
                  Mensalidade: R$ {selectedPlan.price.toFixed(2)}/mês
                </p>
                <p className="text-sm text-gray-600">
                  Valor proporcional até o vencimento: R$ {proRataInfo.proRataValue}
                </p>
                <p className="text-sm text-gray-600">
                  Próximo vencimento: {proRataInfo.nextPaymentDate}
                </p>
                <p className="text-sm text-gray-600">
                  Dias até o vencimento: {proRataInfo.daysUntilPayment}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}