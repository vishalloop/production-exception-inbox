import prisma from "../../config/prisma.js";

export const generateExceptions = async () => {

    console.log("\nGenerating Exceptions...\n");

    const productionPlans = await prisma.productionPlan.findMany();

    const actualProductions = await prisma.actualProduction.findMany();

    const actualProductionMap = new Map<string, typeof actualProductions[number]>();

    for (const actual of actualProductions) {

        const key = `${actual.date.toISOString()}_${actual.plant}_${actual.product_code}`;

        actualProductionMap.set(key, actual);

    }

    let generated = 0;

    for (const plan of productionPlans) {

        const key = `${plan.date.toISOString()}_${plan.plant}_${plan.product_code}`;

        const actual = actualProductionMap.get(key);

        if (!actual) {

            await prisma.exception.create({

                data: {

                    date: plan.date,

                    plant: plan.plant,

                    product_code: plan.product_code,

                    planned_units: plan.planned_units,

                    actual_units: 0,

                    deficit_units: plan.planned_units,

                    deficit_percentage: 100,

                    severity: "HIGH",

                },

            });

            generated++;

            continue;

        }

        const deficitUnits = plan.planned_units - actual.actual_units;

        if (deficitUnits <= 0)
            continue;

        const deficitPercentage = Number(

            ((deficitUnits / plan.planned_units) * 100).toFixed(2)

        );

        let severity: "LOW" | "MEDIUM" | "HIGH";

        if (deficitPercentage < 10) {

            severity = "LOW";

        } else if (deficitPercentage < 25) {

            severity = "MEDIUM";

        } else {

            severity = "HIGH";

        }

        await prisma.exception.create({

            data: {

                date: plan.date,

                plant: plan.plant,

                product_code: plan.product_code,

                planned_units: plan.planned_units,

                actual_units: actual.actual_units,

                deficit_units: deficitUnits,

                deficit_percentage: deficitPercentage,

                severity,

            },

        });

        generated++;

    }

    console.log(`Generated ${generated} exceptions.`);

    return {

        generated,

    };

};