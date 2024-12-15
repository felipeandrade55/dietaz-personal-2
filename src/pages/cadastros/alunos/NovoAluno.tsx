import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  dataNascimento: z.string(),
  // Campos da anamnese
  objetivos: z.string(),
  restricoesAlimentares: z.string(),
  problemaSaude: z.string(),
  medicamentos: z.string(),
  cirurgias: z.string(),
  atividadeFisica: z.string(),
});

export default function NovoAluno() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      objetivos: "",
      restricoesAlimentares: "",
      problemaSaude: "",
      medicamentos: "",
      cirurgias: "",
      atividadeFisica: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <TabsContent value="dados-pessoais">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o nome completo" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Digite o email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite o telefone" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dataNascimento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="anamnese">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="objetivos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objetivos</FormLabel>
                            <FormControl>
                              <Input placeholder="Quais são seus objetivos?" {...field} />
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
                              <Input placeholder="Possui alguma restrição alimentar?" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="problemaSaude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Problemas de Saúde</FormLabel>
                            <FormControl>
                              <Input placeholder="Possui algum problema de saúde?" {...field} />
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
                              <Input placeholder="Faz uso de algum medicamento?" {...field} />
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
                              <Input placeholder="Já realizou alguma cirurgia?" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="atividadeFisica"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Atividade Física</FormLabel>
                            <FormControl>
                              <Input placeholder="Pratica alguma atividade física?" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
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