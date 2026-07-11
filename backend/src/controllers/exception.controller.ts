import exceptionService from "../services/exception.service.js";
import {
    ExceptionStatus,
    Severity,
} from "../../generated/prisma/enums.js";
import type { NextFunction, Request, Response } from "express";

class ExceptionController {

    /**
     * GET /exceptions
     */
    async getAllExceptions( req: Request, res: Response, next: NextFunction ) {

        try {

            const {
                page,
                limit,
                product_code,
                severity,
                status,
            } = req.query;

            const options: any = {
                product_code: product_code as string,
                severity: severity as Severity,
                status: status as ExceptionStatus,
            };

            if (page) options.page = Number(page);
            if (limit) options.limit = Number(limit);

            const exceptions = await exceptionService.getAllExceptions(options);

            return res.status(200).json({

                success: true,

                message: "Exceptions fetched successfully.",

                data: exceptions,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * GET /exceptions/:id
     */
    async getExceptionById( req: Request, res: Response, next: NextFunction ) {

        try {

            const id = Number(req.params.id);

            const exception =
                await exceptionService.getExceptionDetail(id);

            return res.status(200).json({

                success: true,

                message: "Exception fetched successfully.",

                data: exception,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * PATCH /exceptions/:id
     */
    async updateExceptionStatus( req: Request, res: Response, next: NextFunction ) {

        try {

            const id = Number(req.params.id);

            const { status } = req.body;

            const updatedException =
                await exceptionService.updateExceptionStatus(

                    id,

                    status

                );

            return res.status(200).json({

                success: true,

                message: "Exception status updated successfully.",

                data: updatedException,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * GET /dashboard
     */
    async getDashboardSummary( req: Request, res: Response, next: NextFunction ) {

        try {

            const dashboard =
                await exceptionService.getDashboardSummary();

            return res.status(200).json({

                success: true,

                message: "Dashboard fetched successfully.",

                data: dashboard,

            });

        } catch (error) {

            next(error);

        }

    }

}

export default new ExceptionController();