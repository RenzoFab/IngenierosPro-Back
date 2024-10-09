export interface CreateOrder {
  object: string;
  id: string;
  amount: number;
  payment_code: null;
  currency_code: string;
  description: string;
  order_number: string;
  state: string;
  total_fee: null;
  net_amount: null;
  fee_details: null;
  creation_date: number;
  expiration_date: number;
  updated_at: number;
  paid_at: null;
  available_on: null;
  metadata: null;
  qr: null;
  cuotealo: null;
  url_pe: null;
  // * ERROR
  type?: string;
  merchant_message?: string;
  user_message?: string;
  param?: string;
}
