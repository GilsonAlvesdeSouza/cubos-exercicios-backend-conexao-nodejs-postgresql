import { z } from "zod";

const AutorSchema = z.object({
	id: z.number({invalid_type_error:"O identificador precisa ser um número"}).optional(),
	nome: z
		.string({
			required_error: "O campo nome é Obrigatório.",
			invalid_type_error: "O campo nome é deve tipo texto",
		})
		.min(3, { message: "O nome deve conter pelo menos 3 letras" })
		.trim(),
	idade: z.number({
		required_error: "O campo idade é obrigatório.",
		invalid_type_error: "O campo idade deve conter apenas números",
	}),
});

type Autor = z.infer<typeof AutorSchema>;

export { Autor, AutorSchema };
