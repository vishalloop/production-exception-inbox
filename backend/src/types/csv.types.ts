export interface ProductionPlanCSV {
    plan_date: string;
    plant: string;
    sku: string;
    planned_units: string;
}

export interface ActualProductionCSV {
    date: string;
    plant_id: string;
    product_code: string;
    units_produced: string;
}