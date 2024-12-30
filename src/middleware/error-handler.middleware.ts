import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction): void => {

    const status = error.status || (error.name === "ValidationError" ? 400 : 500);
    const message = error.message || "Internal server error";
    const data = error.data || null;

    res.status(status).json({
        status,
        message,
        error: data || "",
    });
};