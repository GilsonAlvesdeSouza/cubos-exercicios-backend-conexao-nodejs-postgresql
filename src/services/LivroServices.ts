import Livro from "../models/base/Livro";
import LivroServicesInterface from "./base/LivroServicesInterface";

class LivroServices {
	private repository: LivroServicesInterface;

	constructor(repository: LivroServicesInterface) {
		this.repository = repository;
	}

	public all() {
		return this.repository.all();
	}

	public create(livro: Livro) {
		return this.repository.create(livro);
	}
}

export default LivroServices;
