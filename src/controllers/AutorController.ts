import { Request, Response } from "express";
import { AutorInterface } from "../interfaces";
import { AutorServices } from "../services/AutorServices";

const autorServices = new AutorServices();

class AutorController {
	async store(req: Request, res: Response) {
		const { nome, idade }: Partial<AutorInterface> = req.body;

		const autor = { nome, idade };

		const newAutor = await autorServices.save(autor);
		return res.status(201).json(newAutor);
	}
}

export { AutorController };
