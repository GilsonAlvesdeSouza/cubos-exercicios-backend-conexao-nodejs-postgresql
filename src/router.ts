import { Router } from "express";
import { AutorController } from "./controllers/AutorController";
import { dbConnect } from "./pg_connect";

const autorController = new AutorController();

const router = Router();

router.post("/autor", autorController.store);
router.get("/autor/:id", autorController.show);

export { router };
