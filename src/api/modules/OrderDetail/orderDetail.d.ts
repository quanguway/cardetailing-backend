export interface OrderDetail {
    id?: string
    type?: string
    status?: string
    quality?: number
    total?: number
    product_id?: string
    order_id?: string
    price_line_id?: string
    unit_exchange_id?: string
    unit_id?: string
    date_created?: Date
    date_updated?: Date
    user_created?: Date
    user_updateed?: Date
}