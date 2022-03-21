import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
} from "react";
import { VegaClient } from "@vega-scan/sdk";
import { getValidatorInfo } from "../../utils";

interface Stats {
  price: string;
  current_tps: string;
  max_tps: string;
  validators_count: number;
  total_stake: number;
  fully_diluted_market_cap: number;
  market_cap: number;
  latest_block_count: number;
  circulating_supply: number;
  total_supply: number;
}

interface Blocks {
  height: number;
  time: Date;
  proposer_address: string;
  proposer_name: string | null;
  block_size: number;
  transaction_count: number;
}

const ApplicationContext = createContext<{
  stats: Stats;
  blocks: Blocks[] | null;
} | null>(null);

const STATS_INITIAL_STATE = {
  price: "",
  current_tps: "",
  max_tps: "",
  validators_count: 5,
  total_stake: 0,
  fully_diluted_market_cap: 0,
  market_cap: 0,
  latest_block_count: 0,
  circulating_supply: 0,
  total_supply: 0,
};

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlock] = useState<Blocks[] | null>(null);

  const [stats, updateStats] = useReducer(
    (stats: Stats, updates: Partial<Stats>) => ({
      ...stats,
      ...updates,
    }),
    STATS_INITIAL_STATE
  );

  const client = new VegaClient("TESTNET");

  const getBlockMetas = async () => {
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

  const getLatestBlocks = async () => {
    const { block_metas, last_height } = await getBlockMetas();

    updateStats({ latest_block_count: last_height });
    setBlock([...block_metas, blocks]);
  };

  useEffect(() => {
    getLatestBlocks();
    console.log(blocks);

    const interval = setInterval(() => {
      getLatestBlocks();
      console.log(blocks);
      console.log("Am called every 10 seconds");
    }, 60000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApplicationContext.Provider value={{ blocks, stats }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useAppStates = () => {
  const context = useContext(ApplicationContext);

  if (!context) throw new Error("Missing Application context");

  const { blocks: blks, stats } = context;

  const blocks = blks?.filter((el) => {
    return el != null;
  });

  return { blocks, stats };
};
