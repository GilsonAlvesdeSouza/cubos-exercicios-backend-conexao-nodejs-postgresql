import Autor from "../../models/base/Autor";
import AutorServicesInterface from "../base/AutorServicesInterface";

class AutorServicesMySQL implements AutorServicesInterface {
	findAutorLivro(id: number): Promise<Autor | undefined> {
		throw new Error("Method not implemented.");
	}
	all(): Promise<Autor[]> {
		throw new Error("Method not implemented.");
	}
	create(data: Autor): Promise<Autor> {
		throw new Error("Method not implemented.");
	}
	find(id: number): Promise<Autor | undefined> {
		throw new Error("Method not implemented.");
	}
	update(data: Autor): Promise<Autor> {
		throw new Error("Method not implemented.");
	}
	delete(id: number): Promise<Autor> {
		throw new Error("Method not implemented.");
	}
}

export default AutorServicesMySQL;
