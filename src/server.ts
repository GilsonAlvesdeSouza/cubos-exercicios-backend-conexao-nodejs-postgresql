import express from "express";
import "dotenv/config";
import { dbConnect } from "./pg_connect";


const PORT = process.env.APP_PORT || 3001;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
	console.log(
		`server is running on port ${PORT}\nhttp://localhost:${PORT}\nto exit press ctrl + c`
	);
});
