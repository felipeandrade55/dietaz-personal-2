import { Check, ChevronsUpDown } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command";
import { cn } from "@/lib/utils";

// Mock data for students (will be replaced with real data later)
const students = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com"
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com"
  },
];

export function StudentSelect({ form, open, setOpen }: any) {
  return (
    <FormField
      control={form.control}
      name="studentId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Aluno</FormLabel>
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
                    ? students.find((student) => student.id === field.value)?.name
                    : "Selecione um aluno"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Buscar aluno..." />
                <CommandList>
                  <CommandEmpty>Nenhum aluno encontrado.</CommandEmpty>
                  <CommandGroup>
                    {students.map((student) => (
                      <CommandItem
                        key={student.id}
                        value={student.name}
                        onSelect={() => {
                          form.setValue("studentId", student.id);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            student.id === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {student.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}