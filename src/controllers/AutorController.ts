import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Autor, AutorSchema, Livro, LivroSchema } from "../schemas";
import { AutorServices } from "../services/AutorServices";

const autorServices = new AutorServices();

class AutorController {
	async index(req: Request, res: Response) {
		const autores: Array<Autor> = await autorServices.all();
		if (autores.length === 0) {
			return res.status(200).json({ mensagem: "Nenhum autor encontrado." });
		}
		res.status(200).json(autores);
	}

	async store(req: Request, res: Response) {
		const { nome, idade }: Autor = req.body;
		const autor = AutorSchema.safeParse({ nome, idade });

		if (!autor.success) {
			return res.status(400).json({ mensagem: autor.error.issues[0].message });
		}

		const novoAutor = await autorServices.save(autor.data);

		return res.status(201).json(novoAutor);
	}

	async show(req: Request, res: Response) {
		const id = req.params.id;

		if (!id || id === "") {
			throw new BadRequestError("O id é obrigatório");
		}

		const autor = await autorServices.getByIdAutor(Number(id));

		if (!autor) {
			throw new NotFoundError("Livro não encontrado.");
		}

		return res.status(200).json(autor);
	}

	async createBook(req: Request, res: Response) {
		const id = req.params.id;
		const { nome, genero, editora, data_publicacao }: Livro = req.body;
		const livro = LivroSchema.safeParse({
			nome,
			genero,
			editora,
			data_publicacao: new Date(data_publicacao),
			idAutor: Number(id),
		});

		if (!livro.success) {
			if (livro.error.issues[0].message === "Invalid date") {
				return res.status(400).json({ mensagem: "Data invalida" });
			}
			return res.status(400).json({ mensagem: livro.error.issues[0].message });
		}

		const novoLivro = await autorServices.saveBook(livro.data);

		res.status(201).json({ novoLivro });
	}

	async showBook(req: Request, res: Response) {
		const livros = await autorServices.allBooks();
		res.status(200).json(livros);
	}
}

export { AutorController };
