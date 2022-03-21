import { decode } from "../utils/varint";

export enum SupportedFieldType {
  VarInt = 0,
  Uint64 = 1,
  String = 2,
  Uint32 = 5,
}

export class Proto {
  private bytes: Buffer;
  private offset: number;
  private savedOffset: number;

  constructor(bytes: Buffer) {
    this.bytes = bytes;
    this.offset = 0;
    this.savedOffset = 0;
  }

  private readVarInt() {
    const { value, offset } = decode(this.bytes, this.offset);
    this.offset += offset;

    return value;
  }

  private readBuffer(len: number) {
    this.checkByte(len);
    const value = this.bytes.slice(this.offset, this.offset + len);
    this.offset += len;

    return value;
  }

  private bytesLeft() {
    return this.bytes.length - this.offset;
  }

  private checkByte(len: number) {
    const availableBytes = this.bytesLeft();

    if (len > availableBytes) {
      throw new Error("Not enough bytes left");
    }
  }

  private checkpoint() {
    this.savedOffset = this.offset;
  }

  private resetToCheckPoint() {
    this.offset = this.savedOffset;
  }

  private skipGrpcHeader() {
    const initialOffset = this.offset;

    if (this.bytes[this.offset] === 0) {
      this.offset++;
      const len = this.bytes.readInt32BE(this.offset);
      this.offset += 4;

      if (len > this.bytesLeft()) {
        this.offset = initialOffset;
      }
    }
  }

  public unMarshal() {
    const decoded = [];

    this.skipGrpcHeader();

    let value: any;
    try {
      while (this.bytesLeft() > 0) {
        this.checkpoint();

        const indexType = parseInt(this.readVarInt().toString());
        const type = indexType & 0b111;
        const index = indexType >> 3;

        if (type === SupportedFieldType.VarInt) {
          value = this.readVarInt();
        } else if (type === SupportedFieldType.String) {
          const len = parseInt(this.readVarInt().toString());
          value = this.readBuffer(len);
        } else if (type === SupportedFieldType.Uint32) {
          value = this.readBuffer(4);
        } else if (type === SupportedFieldType.Uint64) {
          value = this.readBuffer(8);
        } else {
          throw new Error(`${type} not implemented!`);
        }

        decoded.push({ index, type, value });
      }
    } catch (error) {
      this.resetToCheckPoint();
    }

    return { decoded };
  }
}
