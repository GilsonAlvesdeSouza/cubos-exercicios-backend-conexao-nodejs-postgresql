import { dbConnect } from "../../pg_connect";
import Autor from "../../models/base/Autor";
import Livro from "../../models/base/Livro";
import AutorServicesInterface from "../base/AutorServicesInterface";

class AutorServicesPG implements AutorServicesInterface {
	async all(): Promise<Array<Autor>> {
		const query = `select * from autores;`;
		const result = await dbConnect.query(query);
		return result.rows;
	}

	async create({ nome, idade }: Autor): Promise<Autor> {
		const query = `insert into autores (nome, idade) values($1, $2) returning *;`;
		const params = [nome, idade];
		const result = await dbConnect.query(query, params);
		return result.rows[0];
	}

	async find(id: number): Promise<Autor | undefined> {
		const query = `select a.* from autores a where a.id = $1`;
		const params = [id];
		const result = await dbConnect.query(query, params);

		if (result.rows.length === 0) {
			return undefined;
		}

		return result.rows[0];
	}

	async update(data: Autor): Promise<Autor> {
		throw new Error("Method not implemented.");
	}

	async delete(id: number): Promise<Autor> {
		throw new Error("Method not implemented.");
	}

	async findAutorLivro(id: number): Promise<Autor | undefined> {
		const query = `select a.nome as nome_autor, a.idade, l.* from autores a
		join livros l on l.id_autor = a.id where a.id = $1`;
		const params = [id];
		const result = await dbConnect.query(query, params);

		if (result.rows.length === 0) {
			return undefined;
		}

		const livros: Array<Livro> = [];
		for (const livro of result.rows) {
			livros.push({
				id: livro.id,
				nome: livro.nome,
				genero: livro.genero,
				editora: livro.editora,
				data_publicacao: livro.data_publicacao,
			} as Livro);
		}

		let autor: Autor = {
			id: result.rows[0].id_autor,
			nome: result.rows[0].nome_autor as string,
			idade: result.rows[0].idade,
			livros: livros,
		};

		return autor;
	}
}

export default AutorServicesPG;
