import { Request, Response, NextFunction } from "express";
import { ApiError } from "../helpers/api-errors";

export const erros = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    const statusCode = error.statusCode ?? 400;
    return res.status(statusCode).json({
      mensagem: error.message,
    });
  }

  return res.status(500).json({
    mensagem: "Erro interno do servidor",
  });
};
