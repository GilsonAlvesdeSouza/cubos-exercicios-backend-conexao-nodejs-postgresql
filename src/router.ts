import { Router } from "express";
import AutorController from "./controllers/AutorController";
import LivroController from "./controllers/LivroController";

const autorController = new AutorController();
const livroController = new LivroController();

const router = Router();

router.get("/autor", autorController.index);
router.post("/autor", autorController.store);
router.get("/autor/:id", autorController.show);

router.post("/autor/:id/livro", livroController.store);
router.get("/livro", livroController.index);

export { router };
