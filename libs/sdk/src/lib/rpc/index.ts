import { Buffer } from "buffer";
import axios from "axios";
import { BASE_RPC_URL, ENDPOINTS } from "../constants";
import { unpackSignedTx } from "../utils";
import { QueryParams, SupportedNetworks } from "../types/rpc";
import { GetBlockResponse } from "../types/rpc";

export class VegaClient {
  private network: SupportedNetworks = "TESTNET";
  private url = BASE_RPC_URL[this.network];

  constructor(network: SupportedNetworks = "TESTNET") {
    this.network = network;
  }

  private buildQuery(endpoint: string, params?: QueryParams): string {
    const url = this.url + endpoint;
    const query = [];

    if (params) {
      for (const k in params) {
        if (typeof params[k] === "string") {
          query.push(`${k}=${params[k]}`);
        } else if (Buffer.isBuffer(params[k])) {
          query.push(`${k}=0x${params[k].toString("hex")}`);
        } else {
          query.push(`${k}=${params[k]}`);
        }
      }

      return `${url}?${query.join("&")}`;
    }
    return url;
  }

  private async makeRequest(endpoint: string, params?: QueryParams) {
    const url = this.buildQuery(endpoint, params);

    return axios({ url })
      .then(({ data }) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        return data.result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  public async getTransaction() {
    return;
  }

  public async getTransactionByHash(hash: string) {
    const data = await this.makeRequest(ENDPOINTS.tx, {
      hash,
    });

    const decoded = unpackSignedTx(data.tx);

    const resp = {
      hash: data.hash,
      height: data.height,
      data: data.tx_result.data,
      gas_used: data.tx_result.gas_used,
      gas_wanted: data.tx_result.gas_wanted,
      log: data.tx_result.log,
      tx: decoded,
    };

    return resp;
  }

  public async getBlock(height: number) {
    const data = await this.makeRequest(ENDPOINTS.block, {
      height,
    });

    let transactions: any[] = [];
    const rawTxs = data.block.data.txs;

    rawTxs.forEach((tx: string) => {
      const decoded = unpackSignedTx(tx);
      transactions.push(decoded);
    });

    // remove null elements
    transactions = transactions.filter((el) => {
      return el != null;
    });

    const response: GetBlockResponse = {
      height: parseInt(data.block.header.height),
      time: data.block.header.time,
      proposer_address: data.block.header.proposer_address,
      transaction_count: data.block.data.txs.length,
      block_hash: `0x${data.block_id.hash}`,
      parent_block_hash: `0x${data.block.header.last_block_id.hash}`,
      transactions,
    };

    return response;
  }

  public async getStatus() {
    return;
  }

  public async getHealth() {
    return;
  }

  public async getNetInfo() {
    return;
  }

  public async getGenesis() {
    return;
  }

  public async getBlockchain() {
    const data = await this.makeRequest(ENDPOINTS.blockchain);
    return data;
  }

  public async getValidators() {
    return;
  }

  public async getBlockResults() {
    return;
  }

  public async getUnconfirmedTxs() {
    return;
  }

  public async getConsensusState() {
    return;
  }

  public async getNumUnconfirmedTxs() {
    return;
  }

  public async getDumpConsensusState() {
    return;
  }
}
