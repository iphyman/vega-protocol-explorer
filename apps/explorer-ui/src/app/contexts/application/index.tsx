import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
} from "react";
import { getBlockchain, getBlock } from "../../utils";
import { useIsMounted } from "../../hooks/useIsMounted";

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
  txs: any[] | null;
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
  const [txs, setTxs] = useState<any[] | null>(null);
  const isMounted = useIsMounted();

  const [stats, updateStats] = useReducer(
    (stats: Stats, updates: Partial<Stats>) => ({
      ...stats,
      ...updates,
    }),
    STATS_INITIAL_STATE
  );

  const getLatestBlocks = async () => {
    if (isMounted()) {
      const { block_metas, last_height } = await getBlockchain();

      updateStats({ latest_block_count: last_height });
      setBlock([...block_metas, blocks]);

      const { transactions } = await getBlock(last_height);
      setTxs([...transactions]);
    }
  };

  useEffect(() => {
    getLatestBlocks();

    const interval = setInterval(() => {
      getLatestBlocks();
    }, 60000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return (
    <ApplicationContext.Provider value={{ blocks, stats, txs }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useAppStates = () => {
  const context = useContext(ApplicationContext);

  if (!context) throw new Error("Missing Application context");

  const { blocks: blks, stats, txs } = context;

  const blocks = blks?.filter((el) => {
    return el != null;
  });

  return { blocks, stats, txs };
};
