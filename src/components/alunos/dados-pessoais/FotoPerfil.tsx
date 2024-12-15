import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../schemas/alunoFormSchema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type FotoPerfilProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function FotoPerfil({ form }: FotoPerfilProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={form.watch("fotoPerfil") || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"} />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <FormField
        control={form.control}
        name="fotoPerfil"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foto de Perfil</FormLabel>
            <FormControl>
              <Input type="url" placeholder="URL da foto" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}