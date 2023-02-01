import Autor from "../../models/base/Autor";
import BaseServicesInterface from "./BaseServicesInterface";

export default interface AutorServicesInterface
	extends BaseServicesInterface<Autor> {
	findAutorLivro(id: number): Promise<Autor | undefined>;
}
