import { Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";
import { Autor, AutorSchema } from "../schemas";
import { AutorServices } from "../services/AutorServices";

const autorServices = new AutorServices();

class AutorController {
	async store(req: Request, res: Response) {
		const { nome, idade }: Autor = req.body;
		const autor = AutorSchema.safeParse({ nome, idade });

		if (!autor.success) {
			return res.json({ mensagem: autor.error.issues[0].message });
		}

		const novoAutor = await autorServices.save(autor.data);

		return res.status(201).json(novoAutor);
	}

	async show(req: Request, res: Response) {
		const id = req.params.id;
		const autor = await autorServices.getById(Number(id));

		if (!autor) {
			throw new ApiError("Autor não encontrado.", 404);
		}
		return res.status(200).json(autor);
	}
}

export { AutorController };
