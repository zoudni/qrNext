export interface Event {
  id: string;
  user_id: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface QRCode {
  id: string;
  event_id: string;
  code: string;
  active: boolean;
} 