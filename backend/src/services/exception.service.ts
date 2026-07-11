import exceptionRepository from "../repositories/exception.repository.js";
import { ApiError } from "../utils/api-error.js";
import {
    ExceptionStatus,
    Severity,
} from "../../generated/prisma/enums.js";

interface GetExceptionsOptions {
    page?: number;
    limit?: number;

    product_code?: string;
    severity?: Severity;
    status?: ExceptionStatus;
}

class ExceptionService {

    async getAllExceptions(options: GetExceptionsOptions = {}) {

        return await exceptionRepository.findAll(options);

    }

    async getExceptionDetail(id: number) {

        const exception =
            await exceptionRepository.findExceptionWithTrend(id);

        if (!exception) {

            throw new ApiError(
                "Exception not found." , 404
            );

        }

        return exception;

    }

    async updateExceptionStatus(
        id: number,
        status: ExceptionStatus
    ) {

        const exception =
            await exceptionRepository.findExceptionWithTrend(id);

        if (!exception) {

            throw new ApiError(
                "Exception not found.", 404
            );

        }

        // Prevent changing RESOLVED back to OPEN
        if (
            exception.exception.status === ExceptionStatus.RESOLVED &&
            status === ExceptionStatus.OPEN
        ) {

            throw new ApiError(
                "Resolved exceptions cannot be reopened." , 400
            );

        }

        return await exceptionRepository.updateStatus(
            id,
            status
        );

    }
    
    async getDashboardSummary() {

        return await exceptionRepository.getDashboardSummary();

    }

}

export default new ExceptionService();