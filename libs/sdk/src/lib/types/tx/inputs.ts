import { Buffer } from "buffer";
import { Commands } from "../proto";

export class SignedTransaction {
  public input_data: Buffer;
  public signature: Signature;
  public version: number;
  public public_key: string;

  constructor(
    props: Partial<{
      input_data: Buffer;
      signature: Buffer;
      version: number;
      public_key: string;
    }> = {}
  ) {
    props = props || {};
    this.input_data = props.input_data || Buffer.from("");
    this.signature = new Signature();
    this.version = props.version || 0;
    this.public_key = props.public_key || "";
  }
}

export class Signature {
  public value: string;
  public algorithm: string;
  public version: number;

  constructor(
    props: Partial<{
      value: string;
      algorithm: string;
      version: number;
    }> = {}
  ) {
    props = props || {};
    this.value = props.value || "";
    this.algorithm = props.algorithm || "";
    this.version = props.version || 0;
  }
}

export class InputData {
  public nonce: number;
  public block_height: number;
  public command: Buffer;
  public command_prefix: Commands | null;

  constructor(
    props: Partial<{
      nonce: number;
      block_height: number;
      command: Buffer;
      command_prefix: Commands | null;
    }> = {}
  ) {
    props = props || {};
    this.nonce = props.nonce || 0;
    this.block_height = props.block_height || 0;
    this.command = props.command || Buffer.from("");
    this.command_prefix = props.command_prefix || null;
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

export class OrderCancellation {
  public order_id: string;
  public market_id: string;

  constructor(props: Partial<{ order_id: string; market_id: string }> = {}) {
    props = props || {};
    this.order_id = props.order_id || "";
    this.market_id = props.market_id || "";
  }
}

export class OrderAmendment {
  public order_id: string;
  public market_id: string;
  public price: string;
  public size_delta: number;
  public expires_at: number;
  public time_in_force: number;
  public pegged_offset: number;
  public pegged_reference: number;

  constructor(
    props: Partial<{
      order_id: string;
      market_id: string;
      price: string;
      size_delta: number;
      expires_at: number;
      time_in_force: number;
      pegged_offset: number;
      pegged_reference: number;
    }> = {}
  ) {
    this.order_id = props.order_id || "";
    this.market_id = props.market_id || "";
    this.price = props.price || "";
    this.size_delta = props.size_delta || 0;
    this.expires_at = props.expires_at || 0;
    this.time_in_force = props.time_in_force || 0;
    this.pegged_offset = props.pegged_offset || 0;
    this.pegged_reference = props.pegged_reference || 0;
  }
}

export class WithdrawSubmission {
  public amount: string;
  public asset: string;
  public ext: string;
  constructor(
    props: Partial<{ amount: string; asset: string; ext: string }> = {}
  ) {
    this.amount = props.amount || "";
    this.asset = props.asset || "";
    this.ext = props.ext || "";
  }
}

export class ProposalSubmission {
  public reference: string;
  public terms: string;

  constructor(props: Partial<{ reference: string; terms: string }> = {}) {
    this.reference = props.reference || "";
    this.terms = props.terms || "";
  }
}

export class VoteSubmission {
  public proposal_id: string;
  public value: string;

  constructor(props: Partial<{ proposal_id: string; value: string }> = {}) {
    this.proposal_id = props.proposal_id || "";
    this.value = props.value || "";
  }
}
export class LiquidityProvisionSubmission {
  public market_id: string;
  public commitment_amount: string;
  public fee: string;
  public sells: LiquidityOrder;
  public buys: LiquidityOrder;
  public reference: string;

  constructor(
    props: Partial<{
      market_id: string;
      commitment_amount: string;
      fee: string;
      sells: LiquidityOrder;
      buys: LiquidityOrder;
      reference: string;
    }> = {}
  ) {
    this.market_id = props.market_id || "";
    this.commitment_amount = props.commitment_amount || "";
    this.fee = props.fee || "";
    this.sells = new LiquidityOrder();
    this.buys = new LiquidityOrder();
    this.reference = props.reference || "";
  }
}

export class DelegateSubmission {
  public node_id: string;
  public amount: string;

  constructor(props: Partial<{ node_id: string; amount: string }> = {}) {
    this.node_id = props.node_id || "";
    this.amount = props.node_id || "";
  }
}

export enum UndelegateSubmissionMethod {
  METHOD_UNSPECIFIED = 0,
  METHOD_NOW = 1,
  METHOD_AT_END_OF_EPOCH = 2,
  METHOD_IN_ANGER = 3,
}
export class UndelegateSubmission {
  public node_id: string;
  public amount: string;
  public method: UndelegateSubmissionMethod;

  constructor(
    props: Partial<{
      node_id: string;
      amount: string;
      method: UndelegateSubmissionMethod;
    }> = {}
  ) {
    props = props || {};
    this.node_id = props.node_id || "";
    this.amount = props.amount || "";
    this.method = props.method || UndelegateSubmissionMethod.METHOD_UNSPECIFIED;
  }
}

export class RestoreSnapshot {
  public data: string[];

  constructor(data: string[] = []) {
    this.data = data;
  }
}

export class LiquidityProvisionCancellation {
  public market_id: string;

  constructor(market_id = "") {
    this.market_id = market_id;
  }
}

export class LiquidityProvisionAmendment extends LiquidityProvisionSubmission {}

export class Transfer {
  public from_account_type: string;
  public to: string;
  public to_account_type: string;
  public asset: string;
  public amount: string;
  public reference: string;
  public kind: "ONE_OFF_TRANSFER" | "RECURRING_TRANSFER";
  public deliver_on: number;
  public start_epoch: number;
  public end_epoch: number;
  public factor: number;

  constructor(
    props: Partial<{
      from_account_type: string;
      to: string;
      to_account_type: string;
      asset: string;
      amount: string;
      reference: string;
      kind: "ONE_OFF_TRANSFER" | "RECURRING_TRANSFER";
      deliver_on: number;
      start_epoch: number;
      end_epoch: number;
      factor: number;
    }> = {}
  ) {
    props = props || {};
    this.from_account_type = props.from_account_type || "";
    this.to = props.to || "";
    this.to_account_type = props.to_account_type || "";
    this.asset = props.asset || "";
    this.amount = props.amount || "";
    this.reference = props.reference || "";
    this.kind = props.kind || "ONE_OFF_TRANSFER";
    this.deliver_on = props.deliver_on || 0;
    this.start_epoch = props.start_epoch || 0;
    this.end_epoch = props.end_epoch || 0;
    this.factor = props.factor || 0;
  }
}

export class CancelTransfer {
  public transfer_id: string;

  constructor(transfer_id = "") {
    this.transfer_id = transfer_id;
  }
}

export class AnnounceNode {
  public vega_pub_key: string;
  public ethereum_address: string;
  public chain_pub_key: string;
  public info_url: string;
  public country: string;
  public id: string;
  public name: string;
  public avatar_url: string;
  public vega_pub_key_index: string;
  public from_epoch: string;
  public ethereum_signature: Signature;
  public vega_signature: Signature;

  constructor(
    props: Partial<{
      vega_pub_key: string;
      ethereum_address: string;
      chain_pub_key: string;
      info_url: string;
      country: string;
      id: string;
      name: string;
      avatar_url: string;
      vega_pub_key_index: string;
      from_epoch: string;
      ethereum_signature: Signature;
      vega_signature: Signature;
    }> = {}
  ) {
    this.vega_pub_key = props.vega_pub_key || "";
    this.ethereum_address = props.ethereum_address || "";
    this.chain_pub_key = props.chain_pub_key || "";
    this.info_url = props.info_url || "";
    this.country = props.country || "";
    this.id = props.id || "";
    this.name = props.name || "";
    this.avatar_url = props.avatar_url || "";
    this.vega_pub_key_index = props.vega_pub_key_index || "";
    this.from_epoch = props.from_epoch || "";
    this.ethereum_signature = new Signature();
    this.vega_signature = new Signature();
  }
}

export class NodeVote {
  public pub_key: string;
  public reference: string;

  constructor(props: Partial<{ pub_key: string; reference: string }> = {}) {
    this.pub_key = props.pub_key || "";
    this.reference = props.reference || "";
  }
}

export enum NodeSignatureKind {
  NODE_SIGNATURE_KIND_UNSPECIFIED = 0,
  NODE_SIGNATURE_KIND_ASSET_NEW = 1,
  NODE_SIGNATURE_KIND_ASSET_WITHDRAWAL = 2,
  NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_ADDED = 3,
  NODE_SIGNATURE_KIND_ERC20_MULTISIG_SIGNER_REMOVED = 4,
}

export class NodeSignature {
  public id: string;
  public sig: string[];
  public kind: NodeSignatureKind;

  constructor(
    props: Partial<{ id: string; sig: string[]; kind: NodeSignatureKind }> = {}
  ) {
    this.id = props.id || "";
    this.sig = props.sig || [];
    this.kind = props.kind || 0;
  }
}

export class ChainEvent {
  public tx_id: string;
  public nonce: number;
  public event: string;

  constructor(
    props: Partial<{ tx_id: string; nonce: number; event: string }> = {}
  ) {
    this.tx_id = props.tx_id || "";
    this.nonce = props.nonce || 0;
    this.event = props.event || "";
  }
}

export class KeyRotateSubmission {
  public new_pub_key_index: string;
  public target_block: string;
  public new_pub_key: string;
  public current_pub_key_hash: string;

  constructor(
    props: Partial<{
      new_pub_key_index: string;
      target_block: string;
      new_pub_key: string;
      current_pub_key_hash: string;
    }> = {}
  ) {
    this.new_pub_key_index = props.new_pub_key_index || "";
    this.target_block = props.target_block || "";
    this.new_pub_key = props.new_pub_key || "";
    this.current_pub_key_hash = props.current_pub_key_hash || "";
  }
}

export class StateVariableProposal {
  public proposal: Buffer;

  constructor(proposal = Buffer.alloc(0)) {
    this.proposal = proposal;
  }
}

export class ValidatorHeartbeat {
  public node_id: string;
  public ethereum_signature: Signature;
  public vega_signature: Signature;

  constructor(
    props: Partial<{
      node_id: string;
      ethereum_signature: Signature;
      vega_signature: Signature;
    }> = {}
  ) {
    this.node_id = props.node_id || "";
    this.ethereum_signature = new Signature();
    this.vega_signature = new Signature();
  }
}

export enum OracleDataSubmissionSource {
  ORACLE_SOURCE_UNSPECIFIED = 0,
  ORACLE_SOURCE_OPEN_ORACLE = 1,
  ORACLE_SOURCE_JSON = 2,
}
export class OracleDataSubmission {
  public source: OracleDataSubmissionSource;
  public payload: string[];

  constructor(
    props: Partial<{
      source: OracleDataSubmissionSource;
      payload: string[];
    }> = {}
  ) {
    this.source =
      props.source || OracleDataSubmissionSource.ORACLE_SOURCE_UNSPECIFIED;
    this.payload = props.payload || [];
  }
}

export class RestoreSnapshotSubmission {
  public data: string[];

  constructor(data = []) {
    this.data = data;
  }
}

export class KeyValueBundle {
  public key: string;
  public tolerance: string;
  public value: any;

  constructor(
    props: Partial<{
      key: string;
      tolerance: string;
      value: string | string[];
    }> = {}
  ) {
    this.key = props.key || "";
    this.tolerance = props.tolerance || "";
    this.value = props.value || "";
  }
}

export class StateValueProposal {
  public state_var_id: string;
  public event_id: string;
  public kvb: Buffer;

  constructor(
    props: Partial<{
      state_var_id: string;
      event_id: string;
      kvb: Buffer;
    }> = {}
  ) {
    this.state_var_id = props.state_var_id || "";
    this.event_id = props.event_id || "";
    this.kvb = props.kvb || Buffer.alloc(0);
  }
}

export enum PeggedReferance {
  PEGGED_REFERENCE_UNSPECIFIED = 0,
  PEGGED_REFERENCE_MID = 1,
  PEGGED_REFERENCE_BEST_BID = 2,
  PEGGED_REFERENCE_BEST_ASK = 3,
}

export class LiquidityOrder {
  public reference: string;
  public proportion: string;
  public offset: string;

  constructor(
    props: Partial<{
      reference: string;
      proportion: string;
      offset: string;
    }> = {}
  ) {
    this.reference = props.reference || "";
    this.proportion = props.proportion || "";
    this.offset = props.offset || "";
  }
}
