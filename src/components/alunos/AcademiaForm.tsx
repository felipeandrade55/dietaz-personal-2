import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/alunoFormSchema";

type AcademiaFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function AcademiaForm({ form }: AcademiaFormProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Academia</h3>
      <FormField
        control={form.control}
        name="academia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Academia</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a academia" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="smart_fit_centro">Smart Fit - Centro</SelectItem>
                <SelectItem value="smart_fit_shopping">Smart Fit - Shopping</SelectItem>
                <SelectItem value="bodytech_centro">Bodytech - Centro</SelectItem>
                <SelectItem value="bodytech_shopping">Bodytech - Shopping</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}