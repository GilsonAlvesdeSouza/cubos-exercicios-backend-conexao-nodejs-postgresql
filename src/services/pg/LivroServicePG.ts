import Livro from "../../models/base/Livro";
import { dbConnect } from "../../pg_connect";
import LivroServicesInterface from "../base/LivroServicesInterface";

class LivroServicePG implements LivroServicesInterface {
	async all(): Promise<Array<Livro>> {
		const query = `select l.id, l.nome, l.genero, l.editora, l.data_publicacao, a.id as id_autor,  a.nome as nome_autor , a.idade from livros l 
		join autores a  on l.id_autor = a.id
`;
		const result = await dbConnect.query(query);
		
		const livros: Array<Livro> = [];
		for (const livro of result.rows) {
			livros.push({
				id: livro.id,
				nome: livro.nome,
				genero: livro.genero,
				editora: livro.editora,
				data_publicacao: livro.data_publicacao,
				id_autor: livro.id_autor,
				autor: {
					id: livro.id_autor,
					nome: livro.nome,
					idade: livro.idade,
				},
			});
		}
		
		return livros;
	}
	async create({
		nome,
		genero,
		editora,
		data_publicacao,
		id_autor,
	}: Partial<Livro>): Promise<Partial<Livro>> {
		const query = `insert into livros (nome, genero, editora, data_publicacao, id_autor)
		values($1, $2, $3, $4, $5) returning *;`;
		const params = [nome, genero, editora, data_publicacao, id_autor];
		const result = await dbConnect.query(query, params);

		console.log(result.rows[0]);
		return result.rows[0];
	}

	find(id: number): Promise<Livro | undefined> {
		throw new Error("Method not implemented.");
	}
	update(data: Livro): Promise<Livro> {
		throw new Error("Method not implemented.");
	}
	delete(id: number): Promise<Livro> {
		throw new Error("Method not implemented.");
	}
	findLivroAutor(idLivro: number): Promise<Livro[]> {
		throw new Error("Method not implemented.");
	}
}

export default LivroServicePG;
