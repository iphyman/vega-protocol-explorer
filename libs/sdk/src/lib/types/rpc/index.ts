export type QueryParams = {
  [k: string]: any;
};

export type SupportedNetworks = "MAINNET" | "TESTNET";

export interface GetBlockResponse {
  height: number;
  time: string;
  proposer_address: string;
  transaction_count: number;
  block_hash: string;
  parent_block_hash: string;
  transactions: any;
}

export type Bytes = Uint8Array;

type VegaTradeSide = "SIDE_UNSPECIFIED" | "SIDE_BUY" | "SIDE_SELL";
