import { importActualProduction } from "./import/import-actual-production.js";
import { importProductionPlan } from "./import/import-production-plan.js";
import { resetDatabase } from "./reset-database.js";
import { normalizeProductionPlan } from "./transform/normalize-production-plan.js";

const run = async () => {

    console.log("\nClearing Database...\n");

    await resetDatabase();

    console.log("\nImporting Raw Production Plan...\n");

    const rawProductionPlan = await importProductionPlan();

    console.table(rawProductionPlan);

    console.log("\nImporting Raw Actual Production...\n");

    const rawActualProduction = await importActualProduction();

    console.table(rawActualProduction);

    console.log("\nImporting Clean Production Plan...\n");

    const cleanProductionPlan = await normalizeProductionPlan();

    console.table(cleanProductionPlan);

    process.exit(0);

};

run();