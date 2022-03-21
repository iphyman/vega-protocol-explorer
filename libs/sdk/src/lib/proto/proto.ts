import {
  SignedTransaction,
  InputData,
  OrderSubmission,
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
  const { value } = unMarshal(bytes);

  const signedTx = new SignedTransaction() as any;
  const keys = Object.keys(signedTx).filter((key) => key !== "command_prefix");

  keys.forEach((key, index) => {
    signedTx[key] = value[index].value;
  });

  signedTx.command_prefix = value[3].index;

  const { data, cmd } = unMarshalInput(
    signedTx.input_data,
    signedTx.command_prefix
  );

  return { data, cmd };
};

export const unMarshalInput = (bytes: Buffer, commandPrefix: Commands) => {
  const inputData = new InputData();
  unMarshal(bytes, inputData);

  const cmd = getCommandPrefix(commandPrefix);
  let data: any;

  switch (commandPrefix) {
    case Commands.OrderSubmission: {
      data = unMarshalOrderSubmission(inputData.command);
      break;
    }

    case Commands.OrderCancellation: {
      data = unMarshalOrderSubmission(inputData.command);
      break;
    }

    case Commands.OrderAmendment: {
      break;
    }

    default:
      break;
  }

  return { data, cmd };
};

export const unMarshalOrderSubmission = (bytes: Buffer) => {
  const order = new OrderSubmission();
  unMarshal(bytes, order);

  order.market_id = Buffer.from(order.market_id).toString();
  order.price = Buffer.from(order.price).toString();
  order.reference = Buffer.from(order.reference).toString();

  return order;
};
