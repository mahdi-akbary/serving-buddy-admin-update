export interface IStockListItem {
  id: number;
  item_id: number;
  name_english: string;
  name_dari: string;
  usage_type: string;
  category_name_english: string;
  available_quantity: number;
  unit: string;
  notes: string;
  last_update_by_id: number;
  last_update_by_name: string;
  last_update_datetime: Date;
}

export interface IStockManualLog {
  id: number;
  item_id: number;
  name_english: string;
  name_dari: string;
  category_name_english: string;
  available_quantity: number;
  quantity_to_update: number;
  usage_type?: 'Manual';
  unit: string;
  notes: string;
}

export type IStockListItemUiSwitch = 'add-quantity' | 'correction' | 'add-usage';

export interface IStockListItemIdentifier {
  item_id: number;
  usage_type: string;
  ui_switch?: IStockListItemUiSwitch;
}

export interface IRawStockItemMinimal {
  item_id: number;
  name_english: string;
  usage_type: string;
}

export interface IStockItemMinimal {
  itemId: string;
  nameEnglish: string;
  usageType: string;
  itemIdUsageType: string;
}

export interface IManualUsageListItem {
  id: number;
  name_english: string;
  name_dari: string;
  available_quantity: number;
  quantity_to_update?: number;
  unit: string;
  status: string;
  acceptable_limit: number;
  notes?: string;
  last_update_by_id: number;
  last_update_by_name: string;
  last_update_datetime: Date;
}

export interface IAddCorrectionLog {
  item: {
    id: number,
    nameEnglish: string,
    nameDari: string
  };
  categoryNameEnglish: string;
  usageType: string;
  update: {
    datetime: Date,
    by: {
      id: number,
      name: string
    }
  };
  quantity: number;
  notes: string;
  type: string;
  unit: string;
}

export interface IRawAddCorrectionLog {
  item_id: number;
  item_name_english: string;
  item_name_dari: string;
  category_name_english: string;
  usage_type: string;
  update_by_id: number;
  update_by_name: string;
  update_datetime: Date;
  quantity: number;
  type: string;
  unit: string;
  notes: string;
}
