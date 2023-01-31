import "express-async-errors";
import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";
import { erros } from "./middlewares/erros";
import { router } from "./router";
import swaggerDocument from "../swagger.json";

const PORT = process.env.APP_PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/swagger", (req: Request, res: Response) => {
	return res.sendFile(process.cwd() + "/swagger.json");
});

app.get("/docs", (req: Request, res: Response) => {
	return res.sendFile(process.cwd() + "/index.html");
});

app.use(router);

app.use(erros);

app.listen(PORT, () => {
	console.log(
		`server is running on port ${PORT}\nhttp://localhost:${PORT}\nto exit press ctrl + c`
	);
});
