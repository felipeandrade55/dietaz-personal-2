import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/alunoFormSchema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

type MedidasFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function MedidasForm({ form }: MedidasFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medidas Corporais</h3>
          
          <FormField
            control={form.control}
            name="peso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura (cm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pescoco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pescoço (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ombros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ombros (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="torax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tórax (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bracoDireito"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Braço Direito (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bracoEsquerdo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Braço Esquerdo (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="antebracoDireito"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antebraço Direito (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="antebracoEsquerdo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antebraço Esquerdo (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cintura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cintura (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quadril"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quadril (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coxaDireita"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coxa Direita (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coxaEsquerda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coxa Esquerda (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panturrilhaDireita"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Panturrilha Direita (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panturrilhaEsquerda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Panturrilha Esquerda (cm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fotos</h3>
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Para melhor acompanhamento da evolução, tire as fotos seguindo estas orientações:
            <ul className="list-disc list-inside mt-2">
              <li>Use roupa adequada (bikini para mulheres, sunga para homens)</li>
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
    </div>
  );
}