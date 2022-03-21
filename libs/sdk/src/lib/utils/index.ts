import { Commands } from "../types/proto";
import { unMarshalTx } from "../proto/proto";

export const unpackSignedTx = (rawTx?: string) => {
  const rawT =
    "CnoIkLeq2cmgwugjEMOTJMo+aQpAYzE0ZDAwMjhiMzUyODlmMzkwZDRlZGM3OGRkNmUyOGEwY2RmNTAwNTU4ZTRkYjgxYTQ2ZDAzMTAwZGE2ZjlhMxIIMTYzNTk2MTMYSiACKAIw25znpsqY8O4WOAFCCXRyYWRlcmJvdBKTAQqAATBkNDI3NTIwZGE4N2JiZDM5YjZmOWFlMzcxODBhZDU2NjI5ZmY2NDM2MmY0M2Y0MTMwOTM4M2FiNzRlMWEyYjNjZmYxOWFjODY5YjIxZTU3YjE0YzY0ODJlMGJiOThiNmY4ODNjYTcyOGQ5MTVhMzA3ZmY1YWU5NzdiYTgyNjBmEgx2ZWdhL2VkMjU1MTkYAYB9AdI+QDU0Mzg1MzdlYmRkZWM3ZmE3MmQwZmY0ZjgyNzMxNjExNGVlZDQwNzE3ZWQzOTMyZDcyM2QyMGNhNjNlOWZmOTU=";
  const bytes = Buffer.from(rawT, "base64");
  const value = unMarshalTx(bytes);

  return { value };
};

export const getCommandPrefix = (commandPrefixed: Commands): string => {
  const cmdIndex = Object.values(Commands).indexOf(
    commandPrefixed as unknown as Commands
  );

  return Object.keys(Commands)[cmdIndex];
};
