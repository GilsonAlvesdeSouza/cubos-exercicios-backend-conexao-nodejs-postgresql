import { z } from "zod";

const LivroSchema = z.object({
	id: z
		.number({ invalid_type_error: "O identificador precisa ser um número." })
		.optional(),
	nome: z
		.string({
			required_error: "O campo nome é obrigatório.",
			invalid_type_error: "O campo nome é do tipo texto.",
		})
		.min(2, { message: "O campo nome deve conter pelo menos 2 letras." })
		.trim(),
	genero: z
		.string({
			required_error: "O gênero nome é obrigatório.",
			invalid_type_error: "O gênero nome é do tipo texto.",
		})
		.trim()
		.optional(),

	editora: z
		.string({
			required_error: "O nome da editora é obrigatório.",
			invalid_type_error: "O nome da é do tipo texto.",
		})
		.trim()
		.optional(),
	dataPublicacao: z.date({
		required_error: "A data da publicação é obrigatória.",
		invalid_type_error: "A data da publicação no formato YYYY-MM-DD.",
	}),

	idAutor: z.number({
		required_error: "O campo de identificação do autor é obrigatório.",
		invalid_type_error: "O identificador precisa ser um número.",
	}),
});

type Livro = z.infer<typeof LivroSchema>;

export { Livro, LivroSchema };
