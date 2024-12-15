import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/alunoFormSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

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
  const selectedPlan = planos?.find(p => p.id === selectedPlanId);

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

      {selectedPlan && (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h4 className="font-semibold">{selectedPlan.name}</h4>
              <p className="text-sm text-gray-600">{selectedPlan.description}</p>
              <p className="text-lg font-semibold text-green-600">
                R$ {selectedPlan.price.toFixed(2)}/mês
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}