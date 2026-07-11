import prisma from "../config/prisma.js";

export const resetDatabase = async () => {
    await prisma.exception.deleteMany();
    await prisma.actualProduction.deleteMany();
    await prisma.productionPlan.deleteMany();

    await prisma.rawActualProduction.deleteMany();
    await prisma.rawProductionPlan.deleteMany();

    console.log("Database cleaned.");
};