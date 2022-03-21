import { useState, useEffect } from "react";
import { BaseChart, Loader, FullWidth } from "@vega-scan/ui-components";
import { getChartData } from "../../utils";

export const VegaPriceChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    const get = async () => {
      const { prices } = await getChartData({});

      if (isMounted) {
        setData(prices);
        setIsLoading(false);
      }
    };

    get();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <FullWidth>
      {isLoading ? (
        <Loader />
      ) : (
        <BaseChart data={data} height={200} color="#ff3" interval="DAYS" />
      )}
    </FullWidth>
  );
};
