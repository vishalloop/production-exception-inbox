import type { NextFunction, Request, Response } from "express";
import type { ApiResponse, customError } from "../types/api.types.js";

export const errorHandler = (err : customError, req : Request, res : Response<ApiResponse>, next : NextFunction) : Response => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success : false,
        message : err.message || "Internal Server Error",
    });
};

export default errorHandler;