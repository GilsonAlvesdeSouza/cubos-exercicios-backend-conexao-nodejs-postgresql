import { Router } from "express";
import { AutorController } from "./controllers/AutorController";
import { dbConnect } from "./pg_connect";

const autorController = new AutorController();

const router = Router();

router.post("/autor", autorController.store);

export { router };
