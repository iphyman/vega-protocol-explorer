import JSBI from "jsbi";

export const decode = (bytes: Buffer, offset: number) => {
  let byte = 0;
  let initialOffset = 0;
  let value = JSBI.BigInt(0);

  do {
    if (offset >= bytes.length) throw new RangeError("Offset is out of range");
    byte = bytes[offset++];

    const multiplier = JSBI.exponentiate(
      JSBI.BigInt(2),
      JSBI.BigInt(initialOffset)
    );
    const newByte = JSBI.multiply(JSBI.BigInt(byte & 0x7f), multiplier);

    initialOffset += 7;
    value = JSBI.add(value, newByte);
  } while (byte >= 0x80);

  return {
    value,
    offset: initialOffset / 7,
  };
};
