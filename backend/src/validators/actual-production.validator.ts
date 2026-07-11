import type { ActualProductionCSV } from "../types/csv.types.js";
import { parseDate } from "../utils/date-parser.js";


export interface ValidActualProduction {
    date: Date;
    plant_id: string;
    product_code: string;
    units_produced: number;
}

export const validateActualProduction = (
    row: ActualProductionCSV
): ValidActualProduction => {

    if (!row.date)
        throw new Error("date is missing.");

    if (!row.plant_id)
        throw new Error("plant_id is missing.");

    if (!row.product_code)
        throw new Error("product_code is missing.");

    if (!row.units_produced)
        throw new Error("units_produced is missing.");

    const unitsProduced = Number(row.units_produced);

    if (Number.isNaN(unitsProduced))
        throw new Error("units_produced is not a valid number.");

    return {

        date: parseDate(row.date),

        plant_id: row.plant_id.trim(),

        product_code: row.product_code.trim(),

        units_produced: Math.round(unitsProduced),

    };
}