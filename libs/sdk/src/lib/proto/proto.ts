import { Buffer } from "buffer";
import {
  SignedTransaction,
  InputData,
  OrderSubmission,
  OrderCancellation,
  OrderAmendment,
  WithdrawSubmission,
  ProposalSubmission,
  VoteSubmission,
  LiquidityProvisionSubmission,
  DelegateSubmission,
  UndelegateSubmission,
  LiquidityProvisionCancellation,
  LiquidityProvisionAmendment,
  Transfer,
  CancelTransfer,
  AnnounceNode,
  NodeVote,
  NodeSignature,
  ChainEvent,
  KeyRotateSubmission,
  StateVariableProposal,
  ValidatorHeartbeat,
  OracleDataSubmission,
  RestoreSnapshotSubmission,
  StateValueProposal,
  KeyValueBundle,
  LiquidityOrder,
} from "../types/tx/inputs";
import { Proto } from "./index";
import { Commands } from "../types/proto";
import { getCommandPrefix } from "../utils";

export const unMarshal = (bytes: Buffer, type?: any) => {
  const proto = new Proto(bytes);
  const { decoded } = proto.unMarshal();

  if (!type) {
    return { value: decoded };
  }

  const keys = Object.keys(type);

  keys.forEach((key, index) => {
    type[key] = decoded[index].value;
  });

  return { value: type };
};
export const unMarshalTx = (bytes: Buffer) => {
  const signedTx = new SignedTransaction();
  unMarshal(bytes, signedTx);

  const { value } = unMarshal(signedTx.input_data);
  const inputData = new InputData() as any;

  const keys = Object.keys(inputData).filter((key) => key !== "command_prefix");
  keys.forEach((key, index) => {
    inputData[key] = value[index].value;
  });

  inputData.command_prefix = value[2].index;

  const hash = Buffer.from(inputData.command).toString("hex");

  const { data, command_name } = unMarshalInput(
    inputData.command,
    inputData.command_prefix
  );

  return { data, command_name, hash };
};

export const unMarshalInput = (bytes: Buffer, commandPrefix: Commands) => {
  const command_name = getCommandPrefix(commandPrefix);
  let data: any;

  switch (commandPrefix) {
    case Commands.OrderSubmission: {
      data = unMarshalOrderSubmission(bytes);
      break;
    }

    case Commands.OrderCancellation: {
      data = unMarshalOrderCancellation(bytes);
      break;
    }

    case Commands.OrderAmendment: {
      data = unMarshalOrderAmendment(bytes);
      break;
    }

    case Commands.WithdrawSubmission: {
      data = unMarshalWithdrawSubmission(bytes);
      break;
    }

    case Commands.ProposalSubmission: {
      data = unMarshalProposalSubmission(bytes);
      break;
    }

    case Commands.VoteSubmission: {
      data = unMarshalVoteSubmission(bytes);
      break;
    }

    case Commands.LiquidityProvisionSubmission: {
      data = unMarshalLiquidityProvisionSubmission(bytes);
      break;
    }

    case Commands.DelegateSubmission: {
      data = unMarshalDelegateSubmission(bytes);
      break;
    }

    case Commands.UndelegateSubmission: {
      data = unMarshalUndelegateSubmission(bytes);
      break;
    }

    case Commands.LiquidityProvisionCancellation: {
      data = unMarshalLiquidityProvisionCancellation(bytes);
      break;
    }

    case Commands.LiquidityProvisionAmendment: {
      data = unMarshalLiquidityProvisionAmendment(bytes);
      break;
    }

    case Commands.Transfer: {
      data = unMarshalTransfer(bytes);
      break;
    }

    case Commands.CancelTransfer: {
      data = unMarshalCancelTransfer(bytes);
      break;
    }

    case Commands.AnnounceNode: {
      data = unMarshalAnnounceNode(bytes);
      break;
    }

    case Commands.NodeVote: {
      data = unMarshalNodeVote(bytes);
      break;
    }

    case Commands.NodeSignature: {
      data = unMarshalNodeSignature(bytes);
      break;
    }

    case Commands.ChainEvent: {
      data = unMarshalChainEvent(bytes);
      break;
    }

    case Commands.KeyRotateSubmission: {
      data = unMarshalKeyRotateSubmission(bytes);
      break;
    }

    case Commands.StateVariableProposal: {
      data = unMarshalStateVariableProposal(bytes);
      break;
    }

    case Commands.ValidatorHeartbeat: {
      data = unMarshalValidatorHeartbeat(bytes);
      break;
    }

    case Commands.OracleDataSubmission: {
      data = unMarshalOracleDataSubmission(bytes);
      break;
    }

    case Commands.RestoreSnapshotSubmission: {
      data = unMarshalRestoreSnapshotSubmission(bytes);
      break;
    }

    default:
      break;
  }

  return { data, command_name };
};

export const unMarshalOrderSubmission = (bytes: Buffer) => {
  const order = new OrderSubmission();
  unMarshal(bytes, order);

  order.market_id = Buffer.from(order.market_id).toString();
  order.price = Buffer.from(order.price).toString();
  order.reference = Buffer.from(order.reference).toString();

  return order;
};

export const unMarshalOrderCancellation = (bytes: Buffer) => {
  const order = new OrderCancellation();
  unMarshal(bytes, order);

  order.order_id = Buffer.from(order.order_id).toString("hex");
  order.market_id = Buffer.from(order.market_id).toString();

  return order;
};

export const unMarshalOrderAmendment = (bytes: Buffer) => {
  const order = new OrderAmendment();
  unMarshal(bytes, order);

  return order;
};

export const unMarshalWithdrawSubmission = (bytes: Buffer) => {
  const withdrawal = new WithdrawSubmission();
  unMarshal(bytes, withdrawal);

  return withdrawal;
};

export const unMarshalProposalSubmission = (bytes: Buffer) => {
  const proposal = new ProposalSubmission();
  unMarshal(bytes, proposal);

  return proposal;
};

export const unMarshalVoteSubmission = (bytes: Buffer) => {
  const vote = new VoteSubmission();
  unMarshal(bytes, vote);

  return vote;
};

export const unMarshalLiquidityProvisionSubmission = (bytes: Buffer) => {
  const liquidity = new LiquidityProvisionSubmission();
  unMarshal(bytes, liquidity);
  liquidity.market_id = Buffer.from(liquidity.market_id).toString();
  liquidity.commitment_amount = Buffer.from(
    liquidity.commitment_amount
  ).toString();
  liquidity.fee = Buffer.from(liquidity.fee).toString();
  liquidity.reference = Buffer.from(liquidity.reference).toString("hex");

  const sells = new LiquidityOrder();
  unMarshal(liquidity.sells as any, sells);
  sells.offset = Buffer.from(sells.offset).toString();

  const buys = new LiquidityOrder();
  unMarshal(liquidity.buys as any, buys);
  buys.offset = Buffer.from(buys.offset).toString();

  liquidity.sells = sells;
  liquidity.buys = buys;

  return liquidity;
};

export const unMarshalDelegateSubmission = (bytes: Buffer) => {
  const delegate = new DelegateSubmission();
  unMarshal(bytes, delegate);

  return delegate;
};

export const unMarshalUndelegateSubmission = (bytes: Buffer) => {
  const undelegate = new UndelegateSubmission();
  unMarshal(bytes, undelegate);

  return undelegate;
};

export const unMarshalLiquidityProvisionCancellation = (bytes: Buffer) => {
  const liquidity = new LiquidityProvisionCancellation();
  unMarshal(bytes, liquidity);

  return liquidity;
};

export const unMarshalLiquidityProvisionAmendment = (bytes: Buffer) => {
  const liquidity = new LiquidityProvisionAmendment();
  unMarshal(bytes, liquidity);

  return liquidity;
};

export const unMarshalTransfer = (bytes: Buffer) => {
  const transfer = new Transfer();
  unMarshal(bytes, transfer);

  return transfer;
};

export const unMarshalCancelTransfer = (bytes: Buffer) => {
  const transfer = new CancelTransfer();
  unMarshal(bytes, transfer);

  return transfer;
};

export const unMarshalAnnounceNode = (bytes: Buffer) => {
  const node = new AnnounceNode();
  unMarshal(bytes, node);

  return node;
};

export const unMarshalNodeVote = (bytes: Buffer) => {
  const node = new NodeVote();
  unMarshal(bytes, node);

  node.pub_key = (node.pub_key as unknown as Buffer).toString("base64");
  node.reference = Buffer.from(node.reference as any).toString();

  return node;
};

export const unMarshalNodeSignature = (bytes: Buffer) => {
  const node = new NodeSignature();
  unMarshal(bytes, node);

  return node;
};

export const unMarshalChainEvent = (bytes: Buffer) => {
  const event = new ChainEvent();
  unMarshal(bytes, event);

  return event;
};

export const unMarshalKeyRotateSubmission = (bytes: Buffer) => {
  const key = new KeyRotateSubmission();
  unMarshal(bytes, key);

  return key;
};

export const unMarshalStateVariableProposal = (bytes: Buffer) => {
  const state = new StateVariableProposal();
  unMarshal(bytes, state);

  const stateValue = new StateValueProposal();
  unMarshal(state.proposal, stateValue);

  stateValue.event_id = Buffer.from(stateValue.event_id).toString();
  stateValue.state_var_id = Buffer.from(stateValue.state_var_id).toString();

  const kv = new KeyValueBundle();
  unMarshal(stateValue.kvb, kv);
  kv.key = Buffer.from(kv.key).toString();
  kv.tolerance = Buffer.from(kv.tolerance).toString();

  // TODO: unmarshal value to scaler/vector/matrix value
  kv.value = Buffer.from(kv.value).toString();

  return {
    state_var_id: stateValue.state_var_id,
    event_id: stateValue.event_id,
    key: kv.key,
    tolerance: kv.tolerance,
  };
};

export const unMarshalValidatorHeartbeat = (bytes: Buffer) => {
  const heartbeat = new ValidatorHeartbeat();
  unMarshal(bytes, heartbeat);

  return heartbeat;
};

export const unMarshalOracleDataSubmission = (bytes: Buffer) => {
  const oracle = new OracleDataSubmission();
  unMarshal(bytes, oracle);

  return oracle;
};

export const unMarshalRestoreSnapshotSubmission = (bytes: Buffer) => {
  const snapshot = new RestoreSnapshotSubmission();
  unMarshal(bytes, snapshot);

  return snapshot;
};
