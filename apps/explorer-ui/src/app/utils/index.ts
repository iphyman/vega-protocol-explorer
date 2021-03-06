import { VegaClient } from "@vega-scan/sdk";
import { validators } from "../constants";

export const formatUSD = (value = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const roundToDecimal = (value = 0, precision = 2) => {
  const multiplier = Math.pow(10, precision);

  return Math.round(value * multiplier) / multiplier;
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

export const shortenAddress = (address: string, first = 22, last = 3) => {
  if (!address) return;
  address = address.toUpperCase();
  return `${address.substring(0, first)}...${address.substring(
    address.length - last
  )}`;
};

export const makeRequest = async (endpoint: string, payload?: any) => {
  const res = await fetch(endpoint, {
    method: payload ? "POST" : "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

export const getChartData = async ({
  currency = "usd",
  days = "max",
  interval = "daily",
}: {
  currency?: string;
  days?: string;
  interval?: string;
}) => {
  const endpoint = `https://api.coingecko.com/api/v3/coins/vega-protocol/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;

  return await makeRequest(endpoint);
};

/**
 * Mimicking database fetch for validators
 */
export const getValidatorInfo = (proposer: string) => {
  return validators.filter((validator) => {
    return validator.address === proposer;
  })[0];
};

export const getBlockchain = async () => {
  const client = new VegaClient("TESTNET");

  const { block_metas, last_height } = await client.getBlockchain();

  const blocks: any[] = [];

  block_metas.forEach((block: any) => {
    blocks.push({
      height: parseInt(block.header.height),
      time: new Date(block.header.time),
      proposer_address: block.header.proposer_address,
      proposer_name:
        getValidatorInfo(block.header.proposer_address).name || null,
      block_size: parseInt(block.block_size),
      transaction_count: parseInt(block.num_txs),
    });
  });

  return { block_metas: blocks, last_height };
};
export const getBlock = async (height: string) => {
  const client = new VegaClient("TESTNET");
  const block = await client.getBlock(parseInt(height));

  return block;
};
