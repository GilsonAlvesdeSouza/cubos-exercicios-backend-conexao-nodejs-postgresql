import Livro from "../../models/base/Livro";
import BaseServicesInterface from "./BaseServicesInterface";

export default interface LivroServicesInterface
	extends BaseServicesInterface<Livro> {
	findLivroAutor(idLivro: number): Promise<Array<Livro>>;
}
