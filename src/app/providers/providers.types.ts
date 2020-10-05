enum provider_order_status {
  New = 'New',
  Viewed = 'Viewed',
  Served = 'Served'
}
export interface  IRawProviderListItem extends Object{
  table_id: number;
  order_id: number;
  provider_order_id: number;
  provider_order_status: provider_order_status;
  insert_datetime: Date;
}

export interface IProviderOrderItem {
  id: number;
  name_en: string;
  name_da: string;
  count: number;
  notes?: string
}

export interface  IRawProviderOrder extends Object{

  // columns of provider_orders
  provider_order_id: number;
  order_id: number;
  last_table_id: number;
  status: provider_order_status;
  insert_datetime: Date;
  provider: string;

  // columns of provider_order_items
  provider_order_item_id: number;
  provider_order_item_name_dari: string;
  provider_order_item_name_english: string;
  count: number;
  notes?: string;
}
