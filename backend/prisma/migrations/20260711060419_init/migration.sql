-- CreateTable
CREATE TABLE "raw_production_plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "planDate" DATETIME NOT NULL,
    "plant" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "plannedUnits" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "raw_actual_production" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productionDate" DATETIME NOT NULL,
    "plant" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "unitsProduced" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
