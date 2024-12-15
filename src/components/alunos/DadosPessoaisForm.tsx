import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/alunoFormSchema";
import { FotoPerfil } from "./dados-pessoais/FotoPerfil";
import { InformacoesBasicas } from "./dados-pessoais/InformacoesBasicas";
import { Endereco } from "./dados-pessoais/Endereco";
import { PlanoForm } from "./PlanoForm";
import { AcademiaForm } from "./AcademiaForm";

type DadosPessoaisFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function DadosPessoaisForm({ form }: DadosPessoaisFormProps) {
  return (
    <div className="space-y-6">
      <FotoPerfil form={form} />

      {/* Informações do Plano */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Informações do Plano</h3>
        <PlanoForm form={form} />
      </div>

      {/* Academia */}
      <AcademiaForm form={form} />

      {/* Informações Básicas */}
      <InformacoesBasicas form={form} />

      {/* Endereço */}
      <Endereco form={form} />
    </div>
  );
}