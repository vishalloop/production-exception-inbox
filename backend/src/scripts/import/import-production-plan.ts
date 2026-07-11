import path from "path";
import type { ImportResult } from "../../types/import-helper.types.js";
import type { ProductionPlanCSV } from "../../types/csv.types.js";
import { parseCSV } from "../../utils/csv-parser.js";
import { validateProductionPlan } from "../../validators/production-plan.validator.js";
import prisma from "../../config/prisma.js";

export const importProductionPlan = async (): Promise<ImportResult> => {

    const filePath = path.join(
        process.cwd(),
        "data",
        "production_plan.csv"
    );

    const rows = await parseCSV<ProductionPlanCSV>(filePath);

    let importedRows = 0;
    let skippedRows = 0;

    for (const [index, row] of rows.entries()) {

        try {

            const validatedRow = validateProductionPlan(row);

            await prisma.rawProductionPlan.create({
                data: validatedRow,
            });

            importedRows++;

        } catch (error) {

            skippedRows++;

            console.log(`Row Number : ${index + 2}`); // +2 because CSV header + zero index
            console.table(row);
            console.error(error);

        }

    }

    return {

        totalRows: rows.length,

        importedRows,

        skippedRows,

    };

};