import { Request, Response } from "express";
import { LivroSchema } from "../schemas";
import Livro from "../models/base/Livro";
import LivroServices from "../services/LivroServices";
import LivroServicePG from "../services/pg/LivroServicePG";

const livroServices = new LivroServices(new LivroServicePG());
class LivroController {
	async index(req: Request, res: Response) {
		const livros: Array<Livro> = await livroServices.all();
		const livrosMap = livros.map((livro) => {
			return {
				id: livro.id,
				nome: livro.nome,
				genero: livro.genero,
				editora: livro.editora,
				data_publicacao: livro.data_publicacao,
				autor: {
					id: livro.autor?.id,
					nome: livro.autor?.nome,
					idade: livro.autor?.idade,
				},
			};
		});
		res.status(200).json(livrosMap);
	}

	async store(req: Request, res: Response) {
		const id = req.params.id;
		const { nome, genero, editora, data_publicacao }: Livro = req.body;
		const livro = LivroSchema.safeParse({
			nome,
			genero,
			editora,
			data_publicacao: new Date(data_publicacao),
			id_autor: Number(id),
		});
		if (!livro.success) {
			if (livro.error.issues[0].message === "Invalid date") {
				return res.status(400).json({ mensagem: "Data invalida" });
			}
			return res.status(400).json({ mensagem: livro.error.issues[0].message });
		}

		const novoLivro = await livroServices.create(livro.data);
		delete novoLivro.id_autor;
		res.status(201).json(novoLivro);
	}
}

export default LivroController;
