import { Buffer } from "buffer";
import axios from "axios";
import { BASE_RPC_URL, ENDPOINTS } from "../constants";
import { unpackSignedTx } from "../utils";
import { QueryParams, SupportedNetworks } from "../types/rpc";

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

  public async getTransactionByHash() {
    return;
  }

  public async getBlock(height: number) {
    // const data = await this.makeRequest(ENDPOINTS.block, {
    //   height,
    // });

    // const txs = data.block.data.txs;
    // const { value } = unpackSignedTx(txs[0]);
    const { value } = unpackSignedTx();
    return value;
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
