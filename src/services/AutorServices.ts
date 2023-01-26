import { AutorInterface } from "../schemas";
import { dbConnect } from "../pg_connect";

class AutorServices {
	async save({ nome, idade }: Partial<AutorInterface>) {
		const query = `insert into autores (nome, idade) values($1, $2) returning id;`;
		const params = [nome, idade];
		const result = await dbConnect.query(query, params);
		const id = result.rows[0].id;
		const autor = await dbConnect.query(
			`select * from autores a where id = ${id}`
		);
		return autor.rows[0];
	}
}

export { AutorServices };
