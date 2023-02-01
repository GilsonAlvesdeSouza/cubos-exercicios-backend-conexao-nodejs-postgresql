import { Autor, Livro } from "../schemas";
import { dbConnect } from "../pg_connect";

class AutorServices {
	// all() {
	// 	return autorRepository.all();
	// }

	// create(autor: Autor) {
	// 	return autorRepository.create(autor);
	// }

	// getByIdAutor(idAutor: number) {
	// 	return autorRepository.findAutorLivro(idAutor);
	// }

	async saveBook({
		nome,
		genero,
		editora,
		data_publicacao: dataPublicacao,
		idAutor,
	}: Livro) {
		const query = `insert into livros (nome, genero, editora, data_publicacao, id_autor)
		values($1, $2, $3, $4, $5) returning id;`;
		const params = [nome, genero, editora, dataPublicacao, idAutor];
		const result = await dbConnect.query(query, params);
		const id = result.rows[0].id;
		const autor = this.getByIdLivro(id);
		return autor;
	}

	async getByIdLivro(id: number) {
		const query = `select * from livros where id = $1`;
		const params = [id];
		const result = await dbConnect.query(query, params);
		const livro: Livro = result.rows[0];
		return livro;
	}

	async allBooks() {
		const query = `select a.nome as nome_autor, a.idade, l.* from autores a 
		join livros l on l.id_autor = a.id`;

		const result = await dbConnect.query(query);

		let livros: object[] = [];

		for (const autor of result.rows) {
			livros.push({
				id: autor.id,
				nome: autor.nome,
				genero: autor.genero,
				editora: autor.editora,
				data_publicacao: autor.data_publicacao,
				autor: {
					id: autor.id_autor,
					nome: autor.nome_autor,
					idade: autor.idade,
				},
			});
		}

		return livros;
	}
}

export { AutorServices };
