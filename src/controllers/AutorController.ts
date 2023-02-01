import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Autor, AutorSchema } from "../schemas";
import AutorServices from "../services/AutorServices";
import AutorServicesPG from "../services/pg/AutorServicesPG";
import AutorServicesMySQL from "../services/mysql/AutorServicesMySQL";
// import { AutorServices } from "../servicesAjeitar/AutorServices";

// const autorServices = new AutorServices();
const autorServices = new AutorServices(new AutorServicesPG());

class AutorController {
	async index(req: Request, res: Response) {
		const autores: Array<Partial<Autor>> = await autorServices.all();
		if (autores.length === 0) {
			return res.status(204).json({ mensagem: "Nenhum autor encontrado." });
		}
		res.status(200).json(autores);
	}

	async store(req: Request, res: Response) {
		const { nome, idade }: Autor = req.body;
		const autor = AutorSchema.safeParse({ nome, idade });

		if (!autor.success) {
			return res.status(400).json({ mensagem: autor.error.issues[0].message });
		}

		const novoAutor = await autorServices.create(autor.data);

		return res.status(201).json(novoAutor);
	}

	async show(req: Request, res: Response) {
		const id = req.params.id;

		if (!id || id === "") {
			throw new BadRequestError("O id é obrigatório");
		}

		const autor = await autorServices.findAutorLivro(Number(id));

		if (!autor) {
			throw new NotFoundError("Autor não encontrado ou não possui livro");
		}

		return res.status(200).json(autor);
	}
}

export default AutorController;
