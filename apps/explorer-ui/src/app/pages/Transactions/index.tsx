import {
  Card,
  Container,
  FlexBetween,
  FullWidth,
  PageTitle,
  StyledLink,
  Loader,
} from "@vega-scan/ui-components";
import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { getBlock } from "../../utils";
import { useIsMounted } from "../../hooks/useIsMounted";

const PageWrapper = styled(Container)`
  padding-top: 2rem;
  margin-bottom: 2rem;
`;

const CardHeader = styled(FlexBetween)`
  padding: 1.5rem;
`;

const CardBody = styled(FullWidth)`
  padding: 1.5rem;
`;

const CardFooter = styled(FullWidth)``;

const Title = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.text200};
`;

const TableContainer = styled(FullWidth)`
  overflow-x: auto;
`;

export default function Transactions() {
  const [txs, setTxs] = useState<any | null>(null);
  const isMounted = useIsMounted();
  const { blockheight } = useParams<{ blockheight: string }>();

  const getTxsAtHeight = async () => {
    if (isMounted()) {
      const data = await getBlock(blockheight || "513984");
      setTxs(data);
    }
  };

  useEffect(() => {
    getTxsAtHeight();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return (
    <PageWrapper>
      <PageTitle>Transactions</PageTitle>
      <Card>
        <CardHeader>
          <Title>
            Showing {txs && txs.transactions ? txs.transactions.length : 0}{" "}
            transactions from block height #{blockheight}
          </Title>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>TxHash</th>
                  <th>Block</th>
                  <th>Age</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {!txs ? (
                  <tr>
                    <td colSpan={4}>No transactions found</td>
                  </tr>
                ) : (
                  txs.transactions.map((tx: any, index: number) => {
                    const block_time =
                      new Date().getSeconds() - new Date(txs.time).getSeconds();

                    return (
                      <tr key={index}>
                        <td className="limited-width">
                          <StyledLink to={`/tx/${tx.hash}`}>
                            {tx.hash}
                          </StyledLink>
                        </td>
                        <td>
                          <StyledLink to={`/block/${tx.hash}`}>
                            {blockheight}
                          </StyledLink>
                        </td>
                        <td>{Math.abs(block_time)} secs ago</td>
                        <td>
                          <StyledLink to={`/txs/${tx.hash}`}>
                            {tx.command_name}
                          </StyledLink>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </TableContainer>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </PageWrapper>
  );
}
