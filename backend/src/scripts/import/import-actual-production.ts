import path from "path";
import type { ImportResult } from "../../types/import-helper.types.js";
import type { ActualProductionCSV } from "../../types/csv.types.js";
import { parseCSV } from "../../utils/csv-parser.js";
import { validateActualProduction } from "../../validators/actual-production.validator.js";
import prisma from "../../config/prisma.js";

export const importActualProduction = async (): Promise<ImportResult> => {

    const filePath = path.join(
        process.cwd(),
        "data",
        "actual_production.csv"
    );

    const rows = await parseCSV<ActualProductionCSV>(filePath);

    let importedRows = 0;
    let skippedRows = 0;

    for (const row of rows) {

        try {

            const validatedRow = validateActualProduction(row);

            await prisma.rawActualProduction.create({

                data: validatedRow,

            });

            importedRows++;

        } catch (error) {

            skippedRows++;

            console.error(error);

        }

    }

    return {

        totalRows: rows.length,

        importedRows,

        skippedRows,

    };

};