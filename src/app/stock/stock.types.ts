export interface  IRawStockListItem {
  id: number;
  item_id: number;
  name_english: string;
  name_dari: string;
  usage_type: string;
  category_name_english: string;
  available_quantity: number;
  quantity_to_update?: number;
  unit: string;
  notes: string;
  last_update_by_id: number;
  last_update_by_name: string;
  last_update_datetime: Date;
}

export interface IStockListItemIdentifier {
  item_id: number;
  usage_type: string;
}

export interface  IStockListItem {
  id: number;
  item: {
    id: string,
    nameEnglish: string,
    nameDari: string
  };
  usageType: string;
  categoryNameEnglish: string;
  availableQuantity: number;
  unit: string;
  notes: string;
  lastUpdate: {
    datetime: Date,
    by: {
      id: number,
      name: string
    }
  }
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

export interface  IRawManualUsageListItem {
  id: number;
  name_english: string;
  name_dari: string;
  available_quantity: number;
  unit: string;
  status: string;
  acceptable_limit: number;
  notes?: string;
  last_update_by_id: number;
  last_update_by_name: string;
  last_update_datetime: Date;
}
export interface IName {
  dari:string;
  english:string;
}
export interface IManualUsageListItem {
  id: number;
  name: IName,
  availableQuantity: number;
  unit: string;
  status: string;
  acceptableLimit: number;
  notes?: string;
  lastUpdate: {
    datetime: Date,
    by: {
      id: number,
      name: string
    }
  }
}
