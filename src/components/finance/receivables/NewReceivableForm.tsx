import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, User, Mail, Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const paymentMethods = {
  pix: "PIX",
  credit: "Cartão de Crédito",
  debit: "Cartão de Débito",
  cash: "Dinheiro",
} as const;

// Mock student data - replace with actual data source
const mockStudents = [
  { id: "1", name: "João Silva", email: "joao@email.com" },
  { id: "2", name: "Maria Santos", email: "maria@email.com" },
  { id: "3", name: "Pedro Oliveira", email: "pedro@email.com" },
];

const formSchema = z.object({
  chargeType: z.enum(["student", "oneTime"]),
  studentId: z.string().optional(),
  studentName: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  description: z.string().min(3, "Descrição deve ter no mínimo 3 caracteres"),
  dueDate: z.string().min(1, "Selecione uma data"),
  value: z.string().min(1, "Informe o valor"),
  paymentMethod: z.enum(Object.keys(paymentMethods) as [string, ...string[]]),
});

export function NewReceivableForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [chargeType, setChargeType] = useState<"student" | "oneTime">("student");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chargeType: "student",
      studentName: "",
      email: "",
      description: "",
      dueDate: "",
      value: "",
      paymentMethod: "pix",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simula o envio dos dados
    setTimeout(() => {
      toast({
        title: "Cobrança criada com sucesso!",
        description: `Cobrança para ${values.studentName} no valor de R$ ${values.value}`,
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  }

  const handleStudentSelect = (studentId: string) => {
    const student = mockStudents.find((s) => s.id === studentId);
    if (student) {
      form.setValue("studentId", student.id);
      form.setValue("studentName", student.name);
      form.setValue("email", student.email);
    }
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-4">
            <FormField
              control={form.control}
              name="chargeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cobrança</FormLabel>
                  <Select
                    onValueChange={(value: "student" | "oneTime") => {
                      field.onChange(value);
                      setChargeType(value);
                      if (value === "oneTime") {
                        form.setValue("studentId", "");
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de cobrança" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Aluno Cadastrado</SelectItem>
                      <SelectItem value="oneTime">Cobrança Avulsa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {chargeType === "student" ? (
            <Card className="p-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buscar Aluno</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? mockStudents.find((student) => student.id === field.value)?.name
                              : "Selecione um aluno"}
                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar aluno..." />
                          <CommandEmpty>Nenhum aluno encontrado.</CommandEmpty>
                          <CommandGroup>
                            {mockStudents.map((student) => (
                              <CommandItem
                                key={student.id}
                                value={student.name}
                                onSelect={() => handleStudentSelect(student.id)}
                              >
                                <User className="mr-2 h-4 w-4" />
                                {student.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          ) : (
            <>
              <Card className="p-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Card className="p-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: joao@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            </>
          )}

          <Card className="p-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Mensalidade de Abril" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Valor
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            <Card className="p-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Data de Vencimento
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <Card className="p-4">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(paymentMethods).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar Cobrança"}
        </Button>
      </form>
    </Form>
  );
}