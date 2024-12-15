import { z } from "zod";

export const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  dataNascimento: z.string(),
  objetivos: z.string(),
  experienciaPrevia: z.string(),
  restricoesAlimentares: z.string(),
  problemaSaude: z.string(),
  medicamentos: z.string(),
  cirurgias: z.string(),
  lesoes: z.string(),
  atividadeFisica: z.string(),
  horarioTreino: z.string(),
  observacoes: z.string(),
});