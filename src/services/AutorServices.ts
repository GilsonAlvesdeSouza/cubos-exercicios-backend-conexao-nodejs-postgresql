import { Autor } from "../schemas";
import { dbConnect } from "../pg_connect";

class AutorServices {
	async save({ nome, idade }: Autor) {
		const query = `insert into autores (nome, idade) values($1, $2) returning id;`;
		const params = [nome, idade];
		const result = await dbConnect.query(query, params);
		const id = result.rows[0].id;
		const autor = this.getById(id);
		return autor;
	}

	async getById(id: number) {
		const query = `select * from autores where id = $1`;
		const params = [id];
		const result = await dbConnect.query(query, params);
		const autor: Autor = result.rows[0];
		return autor;
	}
}

export { AutorServices };
