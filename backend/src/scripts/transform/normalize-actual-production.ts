import prisma from "../../config/prisma.js";

export const normalizeActualProduction = async () => {

    console.log("\nNormalizing Actual Production...\n");

    const rawActuals = await prisma.rawActualProduction.findMany();

    let inserted = 0;

    for (const row of rawActuals) {

        await prisma.actualProduction.create({

            data: {

                date: row.date,

                plant: row.plant_id,

                product_code: row.product_code,

                actual_units: row.units_produced,

            }

        });

        inserted++;

    }

    console.log(`Inserted ${inserted} Actual Production records.`);

    return {
        totalRows: rawActuals.length,
        insertedRows: inserted,
    };

};