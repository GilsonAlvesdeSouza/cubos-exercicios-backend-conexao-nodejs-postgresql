import { Router } from "express";
import { AutorController } from "./controllers/AutorController";

const autorController = new AutorController();

const router = Router();

router.get("/autor", autorController.index);
router.post("/autor", autorController.store);
router.get("/autor/:id", autorController.show);
// router.post("/autor/:id/livro", autorController.createBook);
// router.get("/livro", autorController.showBook);

export { router };
