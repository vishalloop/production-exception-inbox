import { Router } from "express";
import exceptionController from "../controllers/exception.controller.js";

const dashbaordRouter = Router();

/**
 * GET /dashboard
 */
dashbaordRouter.get( "/", exceptionController.getDashboardSummary );

export default dashbaordRouter;