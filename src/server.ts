import "express-async-errors";
import express from "express";
import "dotenv/config";
import { erros } from "./middlewares/erros";
import { router } from "./router";

const PORT = process.env.APP_PORT || 3001;

const app = express();

app.use(express.json());

app.use(router);

app.use(erros);

app.listen(PORT, () => {
	console.log(
		`server is running on port ${PORT}\nhttp://localhost:${PORT}\nto exit press ctrl + c`
	);
});
