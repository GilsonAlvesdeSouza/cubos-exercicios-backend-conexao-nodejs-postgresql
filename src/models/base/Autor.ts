import Livro from "./Livro";

export default interface BaseUser {
	id?: number;
	nome: string;
	idade: number;
	livros?: Partial<Array<Livro>>;
}
