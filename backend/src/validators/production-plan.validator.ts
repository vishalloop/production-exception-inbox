import type { ProductionPlanCSV } from "../types/csv.types.js";
import { parseDate } from "../utils/date-parser.js";


export interface ValidProductionPlan {
    plan_date: Date;
    plant: string;
    sku: string;
    planned_units: number;
}

export const validateProductionPlan = (row: ProductionPlanCSV ): ValidProductionPlan => {

    if (!row.plan_date)
        throw new Error("plan_date is missing.");

    if (!row.plant)
        throw new Error("plant is missing.");

    if (!row.sku)
        throw new Error("sku is missing.");

    if (
        row.planned_units === undefined ||
        row.planned_units === null ||
        row.planned_units.trim() === ""
        ) {
            throw new Error("planned_units is missing.");
    }

    const plannedUnits = Number(row.planned_units);

    if (Number.isNaN(plannedUnits))
        throw new Error("planned_units is not a valid number.");

    return {
        plan_date: parseDate(row.plan_date),

        plant: row.plant.trim(),

        sku: row.sku.trim(),

        planned_units: Math.round(plannedUnits),
    };
};