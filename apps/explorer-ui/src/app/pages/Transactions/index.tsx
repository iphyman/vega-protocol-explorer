import {
  Card,
  Container,
  FlexBetween,
  FullWidth,
  PageTitle,
  StyledLink,
  Loader,
} from "@vega-scan/ui-components";
import styled from "styled-components/macro";
import { useAppStates } from "../../contexts/application";
import { formatNumber } from "../../utils";

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
  const { txs, stats } = useAppStates();

  return (
    <PageWrapper>
      <PageTitle>Transactions</PageTitle>
      <Card>
        <CardHeader>
          <Title>
            Showing the last {txs ? formatNumber(txs.length) : 0} transactions
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
                  txs.map((tx, index) => {
                    const block_time =
                      new Date().getSeconds() + 1 - new Date().getSeconds();

                    return (
                      <tr key={index}>
                        <td className="limited-width">
                          <StyledLink to={`/tx/${tx.hash}`}>
                            {tx.hash}
                          </StyledLink>
                        </td>
                        <td>
                          <StyledLink to={`/block/${stats.latest_block_count}`}>
                            {stats.latest_block_count}
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
