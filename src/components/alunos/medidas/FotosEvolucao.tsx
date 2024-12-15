import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../schemas/alunoFormSchema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

type FotosEvolucaoProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function FotosEvolucao({ form }: FotosEvolucaoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fotos</h3>
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Para melhor acompanhamento da evolução, tire as fotos seguindo estas orientações:
          <ul className="list-disc list-inside mt-2">
            <li>Use roupa adequada (biquíni para mulheres, sunga para homens)</li>
            <li>Tire fotos de 4 ângulos: frente, costas, lado direito e lado esquerdo</li>
            <li>Mantenha a mesma posição e iluminação em todas as fotos</li>
            <li>Use um fundo neutro e bem iluminado</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fotoFrente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto de Frente</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fotoCostas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto de Costas</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fotoLadoDireito"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto Lado Direito</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fotoLadoEsquerdo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto Lado Esquerdo</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}