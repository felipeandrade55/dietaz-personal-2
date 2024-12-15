import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/alunoFormSchema";
import { MedidasCorporais } from "./medidas/MedidasCorporais";
import { FotosEvolucao } from "./medidas/FotosEvolucao";

type MedidasFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function MedidasForm({ form }: MedidasFormProps) {
  return (
    <div className="space-y-6">
      <MedidasCorporais form={form} />
      <FotosEvolucao form={form} />
    </div>
  );
}