import prisma from "../../config/prisma.js";

export const normalizeProductionPlan = async () => {

    console.log("\nNormalizing Production Plan...\n");

    const rawPlans = await prisma.rawProductionPlan.findMany();

    console.log(`Found ${rawPlans.length} records.\n`);

    let inserted = 0;

    for (const row of rawPlans) {

        await prisma.productionPlan.create({

            data: {

                date: row.plan_date,

                plant: row.plant,

                product_code: row.sku,

                planned_units: row.planned_units,

            }

        });

        inserted++;

    }

    console.log(`Inserted ${inserted} Production Plans.`);

};