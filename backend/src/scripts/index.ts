import { importActualProduction } from "./import/import-actual-production.js";
import { importProductionPlan } from "./import/import-production-plan.js";
import { resetDatabase } from "./reset-database.js";
import { generateExceptions } from "./transform/generate-exceptions.js";
import { normalizeActualProduction } from "./transform/normalize-actual-production.js";
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

    console.log("\nImporting Clean Actual Production...\n");

    const cleanActualProduction = await normalizeActualProduction();

    console.table(cleanActualProduction);

    console.log("\nGenerating Exceptions...\n");

    const exceptions = await generateExceptions();

    console.table(exceptions);

    process.exit(0);

};

run();