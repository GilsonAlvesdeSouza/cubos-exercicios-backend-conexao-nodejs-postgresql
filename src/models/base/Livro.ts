export default interface Livro {
	id?: number;
	nome: string;
	genero?: string;
	editora?: string;
	data_publicacao: Date;
	id_autor: number;
	autor?: {
		id: number;
		nome: string;
		idade: Date;
	};
}
