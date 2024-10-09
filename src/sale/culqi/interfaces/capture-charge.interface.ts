export interface CaptureCharge {
  object: string;
  duplicated: boolean;
  id: string;
  creation_date: number;
  amount: number;
  amount_refunded: number;
  current_amount: number;
  installments: number;
  installments_amount: null;
  currency_code: string;
  email: null;
  description: null;
  source: Source;
  outcome: Outcome;
  fraud_score: number;
  antifraud_details: AntifraudDetails;
  dispute: boolean;
  capture: boolean;
  capture_date: number;
  reference_code: string;
  authorization_code: string;
  total_fee: number;
  fee_details: FeeDetails;
  total_fee_taxes: number;
  transfer_amount: number;
  paid: boolean;
  statement_descriptor: string;
  transfer_id: null;
  operations: any[];
  metadata: null;
}

export interface AntifraudDetails {
  country_code: string;
  first_name: string;
  last_name: string;
  address_city: string;
  address: string;
  phone: number;
  object: string;
}

export interface FeeDetails {
  fixed_fee: FixedFee;
  variable_fee: VariableFee;
}

export interface FixedFee {}

export interface VariableFee {
  currency_code: string;
  commision: number;
  total: number;
}

export interface Outcome {
  type: string;
  code: string;
  merchant_message: string;
  user_message: string;
}

export interface Source {
  object: string;
  id: string;
  type: string;
  email: string;
  creation_date: number;
  card_number: string;
  last_four: string;
  active: boolean;
  iin: Iin;
  client: Client;
  metadata: Metadata;
}

export interface Client {
  ip: string;
  ip_country: string;
  ip_country_code: string;
  browser: null;
  device_fingerprint: null;
  device_type: null;
}

export interface Iin {
  object: string;
  bin: string;
  card_brand: string;
  card_type: string;
  card_category: string;
  issuer: Issuer;
  installments_allowed: number[];
}

export interface Issuer {
  name: string;
  country: string;
  country_code: string;
  website: null;
  phone_number: null;
}

export interface Metadata {
  coment: string;
}
