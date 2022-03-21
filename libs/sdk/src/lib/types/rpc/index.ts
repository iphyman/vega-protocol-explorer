export type QueryParams = {
  [k: string]: any;
};

export type SupportedNetworks = "MAINNET" | "TESTNET";

export interface BlockResponse {
  result: {
    block: {
      header: {
        height: number;
        time: Date;
        proposer_address: string;
      };
      data: {
        txs: string[];
      };
    };
  };
}

interface BlockMeta {
  block_size: number;
  header: {
    height: number;
    time: Date;
    proposer_address: string;
  };
  num_txs: string;
}

export interface BlockchainResponse {
  result: {
    last_height: number;
    block_metas: BlockMeta[];
  };
}

export type Bytes = Uint8Array;

type VegaTradeSide = "SIDE_UNSPECIFIED" | "SIDE_BUY" | "SIDE_SELL";
