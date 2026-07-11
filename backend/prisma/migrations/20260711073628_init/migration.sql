-- CreateTable
CREATE TABLE "raw_production_plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plan_date" DATETIME NOT NULL,
    "plant" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "planned_units" INTEGER NOT NULL,
    "imported_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "raw_actual_production" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "plant_id" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "units_produced" INTEGER NOT NULL,
    "imported_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "production_plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "plant" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "planned_units" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "actual_production" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "plant" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "actual_units" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "exceptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "plant" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "planned_units" INTEGER NOT NULL,
    "actual_units" INTEGER NOT NULL,
    "deficit_units" INTEGER NOT NULL,
    "deficit_percentage" REAL NOT NULL,
    "severity" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
