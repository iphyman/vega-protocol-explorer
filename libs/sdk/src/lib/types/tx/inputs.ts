import { Commands } from "../proto";

export class SignedTransaction {
  public input_data: Buffer;
  public signature: Buffer;
  public version: number;
  public public_key: string;
  public command_prefix: Commands;

  constructor(
    props: Partial<{
      input_data: Buffer;
      signature: Buffer;
      version: number;
      public_key: string;
      command_prefix: Commands;
    }> = {}
  ) {
    props = props || {};
    this.input_data = props.input_data || Buffer.from("");
    this.signature = props.signature || Buffer.from("");
    this.version = props.version || 0;
    this.public_key = props.public_key || "";
    this.command_prefix = props.command_prefix || 0;
  }
}

export class InputData {
  public nonce: number;
  public block_height: number;
  public command: Buffer;

  constructor(
    props: Partial<{
      nonce: number;
      block_height: number;
      command: Buffer;
    }> = {}
  ) {
    props = props || {};
    this.nonce = props.nonce || 0;
    this.block_height = props.block_height || 0;
    this.command = props.command || Buffer.from("");
  }
}

export class OrderSubmission {
  public market_id: string;
  public price: string;
  public size: number;
  public side: number;
  public time_in_force: number;
  public expires_at: number;
  public type: number;
  public reference: string;

  constructor(
    props: Partial<{
      market_id: string;
      price: string;
      size: number;
      side: number;
      time_in_force: number;
      expires_at: number;
      type: number;
      reference: string;
    }> = {}
  ) {
    props = props || {};
    this.market_id = props.market_id || "";
    this.price = props.price || "";
    this.size = props.size || 0;
    this.side = props.side || 0;
    this.time_in_force = props.time_in_force || 0;
    this.expires_at = props.expires_at || 0;
    this.type = props.type || 0;
    this.reference = props.reference || "";
  }
}
