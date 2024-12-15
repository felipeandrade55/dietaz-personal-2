import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formSchema } from "@/components/alunos/schemas/alunoFormSchema";
import { DadosPessoaisForm } from "@/components/alunos/DadosPessoaisForm";
import { AnamneseForm } from "@/components/alunos/AnamneseForm";
import { MedidasForm } from "@/components/alunos/MedidasForm";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export default function NovoAluno() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      objetivos: "",
      experienciaPrevia: "",
      restricoesAlimentares: "",
      problemaSaude: "",
      medicamentos: "",
      cirurgias: "",
      lesoes: "",
      atividadeFisica: "",
      horarioTreino: "",
      observacoes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Aluno cadastrado com sucesso!",
      description: "Os dados do aluno foram salvos.",
    });
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#F97316]">Novo Aluno</h1>
          <p className="text-gray-600">Cadastre um novo aluno</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulário de Cadastro</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dados-pessoais">
              <TabsList className="mb-4">
                <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="anamnese">Ficha de Anamnese</TabsTrigger>
                <TabsTrigger value="medidas">Medidas e Fotos</TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <TabsContent value="dados-pessoais">
                    <DadosPessoaisForm form={form} />
                  </TabsContent>

                  <TabsContent value="anamnese">
                    <AnamneseForm form={form} />
                  </TabsContent>

                  <TabsContent value="medidas">
                    <MedidasForm form={form} />
                  </TabsContent>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#F97316]">
                      Salvar
                    </Button>
                  </div>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}