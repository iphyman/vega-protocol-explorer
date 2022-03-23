import { Commands } from "../types/proto";
import { unMarshalTx } from "../proto/proto";
import { Buffer } from "buffer";
import hexEncoding from "crypto-js/enc-hex";
import SHA256 from "crypto-js/sha256";

export const unpackSignedTx = (rawTx: string) => {
  const bytes = Buffer.from(rawTx, "base64");

  const { data, command_name } = unMarshalTx(bytes);
  const hash = sum256(bytes);

  return { data, command_name, hash };
};

export const getCommandPrefix = (commandPrefixed: Commands): string => {
  const cmdIndex = Object.values(Commands).indexOf(
    commandPrefixed as unknown as Commands
  );

  return Object.keys(Commands)[cmdIndex];
};

export const sum256 = (bytes: Buffer) => {
  const hex = hexEncoding.parse(bytes.toString("hex"));
  const hash = SHA256(hex);

  return `0x${hash.toString()}`;
};
