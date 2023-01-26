import { Autor, Livro } from "../schemas";
import { dbConnect } from "../pg_connect";

class AutorServices {
	async all() {
		const query = `select * from autores;`;
		const result = await dbConnect.query(query);
		const autores = result.rows;
		return autores;
	}

	async save({ nome, idade }: Autor) {
		const query = `insert into autores (nome, idade) values($1, $2) returning id;`;
		const params = [nome, idade];
		const result = await dbConnect.query(query, params);
		const id = result.rows[0].id;
		const autor = this.getByIdAutor(id);
		return autor;
	}

	async getByIdAutor(id: number) {
		const query = `select * from autores where id = $1`;
		const params = [id];
		const result = await dbConnect.query(query, params);
		const autor: Autor = result.rows[0];
		return autor;
	}

	async saveBook({ nome, genero, editora, dataPublicacao, idAutor }: Livro) {
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
}

export { AutorServices };
