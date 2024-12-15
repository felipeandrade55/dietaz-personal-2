import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/alunoFormSchema";

type AnamneseFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function AnamneseForm({ form }: AnamneseFormProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name="objetivos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Objetivos com o Treino</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Quais são seus objetivos com a musculação? (Ex: hipertrofia, emagrecimento, força...)" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experienciaPrevia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experiência Prévia</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Já praticou musculação antes? Por quanto tempo? Há quanto tempo está sem praticar?" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="restricoesAlimentares"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Restrições Alimentares</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Possui alguma restrição alimentar ou segue alguma dieta específica?" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="problemaSaude"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condições de Saúde</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Possui alguma condição de saúde? (Ex: hipertensão, diabetes, problemas cardíacos, lesões...)" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="medicamentos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medicamentos</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Faz uso de algum medicamento? Quais?" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cirurgias"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cirurgias</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Já realizou alguma cirurgia? Quando?" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lesoes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lesões Musculares/Articulares</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Possui ou já teve alguma lesão muscular ou articular? Descreva." 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="atividadeFisica"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Outras Atividades Físicas</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Pratica outras atividades físicas além da musculação? Quais e com que frequência?" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="horarioTreino"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Horário Preferido para Treino</FormLabel>
            <FormControl>
              <Input 
                type="time"
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="observacoes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações Adicionais</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Outras informações relevantes que gostaria de compartilhar" 
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}