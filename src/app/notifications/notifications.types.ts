export interface IRawNotification {
  id: number,
  usage_type: string;
  the_item_id: number;
  the_item_name_english: string;
  the_item_name_dari: string;
  quantity: number;
  status: string;
  generation_datetime: Date;
  seen_by_id: number;
  seen_by_name: string;
  seen_datetime: Date;
  resolved_by_id: number;
  resolved_by_name: string;
  resolved_datetime: Date;
}

export interface INotificationsInfo {
  count: number
}
