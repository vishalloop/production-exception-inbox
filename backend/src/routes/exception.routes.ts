import { Router } from "express";
import exceptionController from "../controllers/exception.controller.js";

const exceptionRouter = Router();

/**
 * GET /exceptions
 */
exceptionRouter.get( "/", exceptionController.getAllExceptions );

/**
 * GET /exceptions/:id
 */
exceptionRouter.get( "/:id", exceptionController.getExceptionById );

/**
 * PATCH /exceptions/:id
 */
exceptionRouter.patch( "/:id", exceptionController.updateExceptionStatus );

export default exceptionRouter;