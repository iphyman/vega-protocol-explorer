export interface SignedTransactionI {
  input_data: Buffer;
  signature: Buffer;
  version: number;
  public_key: string;
}

export interface InputDataI {
  nonce: number;
  block_height: number;
  command: string;
}

export const VegaTradeSide = ["Unspecified", "Buy Side", "Sell Side"] as const;
export const VegaOrderType = ["Limit", "Market"] as const;

export interface OrderSubmissionI {
  market_id: string;
  price: string;
  size: number;
  side: typeof VegaTradeSide[number];
  time_in_force: number;
  expires_at: number;
  type: typeof VegaOrderType[number];
  reference: string;
  // pegged_order not implemented yet
}

export interface OrderCancellationI {
  order_id: string;
  market_id: string;
}

export interface OrderAmendmentI {
  order_id: string;
  market_id: string;
  price: any;
  size_delta: number;
  expires_at: any;
  time_in_force: any;
  pegged_offset: string;
  pegged_reference: any;
}

export interface LiquidityProvisionSubmissionI {
  market_id: string;
  commitment_amount: string;
  fee: string;
  sells: any;
  buys: any;
  reference: string;
}

export interface LiquidityProvisionCancellationI {
  market_id: string;
}

export type LiquidityProvisionAmendmentI = LiquidityProvisionSubmissionI;

export interface WithdrawSubmissionI {
  amount: string;
  asset: string;
  ext: any;
}

export interface ProposalSubmissionI {
  reference: string;
  terms: any;
}

export interface VoteSubmissionI {
  proposal_id: string;
  vote: any;
}

export interface DelegateSubmissionI {
  node_id: string;
  amount: string;
}

export interface UndelegateSubmissionI extends DelegateSubmissionI {
  method: any;
}

export type RestoreSnapshotI = any;

export interface TransferI {
  from_account_type: any;
  to: string;
  to_account_type: any;
  asset: string;
  amount: string;
  reference: string;
  kind: any;
}
