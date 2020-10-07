export interface IRawExpense {
  id?: number;
  amount: number;
  description: string;
  datetime: Date;
  last_update_by_id: number;
  last_update_by_name: string;
  last_update_datetime: Date;
}

export interface IExpense {
  id?: number;
  amount: number;
  description: string;
  datetime: string|Date;
  lastUpdate?: {
    by: {
      id: number,
      name: string
    },
    datetime: Date
  }
}
