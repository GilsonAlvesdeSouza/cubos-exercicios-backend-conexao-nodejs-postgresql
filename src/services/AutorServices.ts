import Autor from "../models/base/Autor";
import { AutorServicesInterface } from "./base/AutorServicesInterface";

class AutorServices {
	private repository: AutorServicesInterface;

	constructor(repository: AutorServicesInterface) {
		this.repository = repository;
	}

	public all() {
		return this.repository.all();
	}

	public create(autor: Autor) {
		return this.repository.create(autor);
	}

	public find(idAutor: number) {
		return this.repository.find(idAutor);
	}

	public findAutorLivro(idAutor: number) {
		return this.repository.findAutorLivro(idAutor);
	}
}

export default AutorServices;
