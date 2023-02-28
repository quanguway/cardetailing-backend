export interface UnitExchange {
    id?: string;
    value?: number;
    is_base_unit?: boolean;
    is_report?: boolean
    is_active?: boolean
    allow_sale?: boolean
    product_id ?: string;
    unit_id ?: string;
    date_created?: date
    date_updated?: date
    staff_updated?: date
    staff_created?: date
}