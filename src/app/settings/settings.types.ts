export interface IUser {
  id: number;
  username: string;
  name: string;
  user_type: string;
  password?: string;
  confirm_password?: string;
  status: string;
  last_update_datetime: Date;
  last_updated_by_id: number;
  last_updated_by_name: string;
}
