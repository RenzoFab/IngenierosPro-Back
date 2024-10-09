export interface WebhookOrder {
  type: string;
  creation_date: number;
  id: string;
  data: string;
  object: string;
}

export interface Data {
  net_amount: null;
  fee_details: null;
  id: string;
  expiration_date: number;
  paid_at: null;
  available_on: null;
  metadata: null;
  qr: null;
  cuotealo: null;
  url_pe: null;
  object: string;
  state: string;
  amount: number;
  payment_code: null;
  currency_code: string;
  updated_at: number;
  order_number: string;
  creation_date: number;
  description: string;
  total_fee: null;
}
