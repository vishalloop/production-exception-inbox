import prisma from "../config/prisma.js";
import { ExceptionStatus, Severity } from "../../generated/prisma/enums.js";

interface FindAllOptions {
    page?: number;
    limit?: number;
    product_code?: string;
    severity?: Severity;
    status?: ExceptionStatus;
}

class ExceptionRepository {

    async findAll(options: FindAllOptions = {}) {

        const {
            page = 1,
            limit = 20,
            product_code,
            severity,
            status,
        } = options;

        const skip = (page - 1) * limit;

        const where = {
            ...(product_code && { product_code }),
            ...(severity && { severity }),  
            ...(status && { status }),
        };

        const [data, total] = await prisma.$transaction([

            prisma.exception.findMany({

                where,

                skip,

                take: limit,

                orderBy: [

                    {
                        date: "desc",
                    },

                    {
                        deficit_percentage: "desc",
                    },

                ],

            }),

            prisma.exception.count({

                where,

            }),

        ]);

        return {

            data,

            pagination: {

                page,

                limit,

                total,

                totalPages: Math.ceil(total / limit),

            },

        };

    }

    async findExceptionWithTrend(id: number) {

        // Step 1 : Find Exception

        const exception = await prisma.exception.findUnique({

            where: {

                id,

            },

        });

        if (!exception)
            return null;

        // Step 2 : Last 7 Days
    
        const startDate = new Date(exception.date);

        startDate.setDate(startDate.getDate() - 6);

        // Step 3 : Read Production Plans

        const plans = await prisma.productionPlan.findMany({

            where: {

                product_code: exception.product_code,

                plant: exception.plant,

                date: {

                    gte: startDate,

                    lte: exception.date,

                },

            },

            orderBy: {

                date: "asc",

            },

        });

        // Step 4 : Read Actual Production

        const actuals = await prisma.actualProduction.findMany({

            where: {

                product_code: exception.product_code,

                plant: exception.plant,

                date: {

                    gte: startDate,

                    lte: exception.date,

                },

            },

        });

        // Step 5 : Create Lookup Map

        const actualMap = new Map<string, number>();

        for (const actual of actuals) {

            actualMap.set(

                actual.date.toISOString().slice(0, 10),

                actual.actual_units

            );

        }

        // Step 6 : Merge Plan + Actual

        const trend = plans.map(plan => ({

            date: plan.date,

            planned_units: plan.planned_units,

            actual_units:

                actualMap.get(

                    plan.date.toISOString().slice(0, 10)

                ) ?? 0,

        }));

        return {

            exception,

            trend,

        };

    }

    async updateStatus(
        id: number,
        status: ExceptionStatus
    ) {

        return await prisma.exception.update({

            where: {

                id,

            },

            data: {

                status,

            },

        });

    }

    async getDashboardSummary() {

        const [

            total,

            high,

            medium,

            low,

            open,

            acknowledged,

            resolved,

        ] = await prisma.$transaction([

            prisma.exception.count(),

            prisma.exception.count({

                where: {

                    severity: "HIGH",

                },

            }),

            prisma.exception.count({

                where: {

                    severity: "MEDIUM",

                },

            }),

            prisma.exception.count({

                where: {

                    severity: "LOW",

                },

            }),

            prisma.exception.count({

                where: {

                    status: "OPEN",

                },

            }),

            prisma.exception.count({

                where: {

                    status: "ACKNOWLEDGED",

                },

            }),

            prisma.exception.count({

                where: {

                    status: "RESOLVED",

                },

            }),

        ]);

        return {

            total,

            high,

            medium,

            low,

            open,

            acknowledged,

            resolved,

        };

    }

}

export default new ExceptionRepository();