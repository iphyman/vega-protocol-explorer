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

export default function Blocks() {
  const { blocks, stats } = useAppStates();

  return (
    <PageWrapper>
      <PageTitle>Blocks</PageTitle>
      <Card>
        <CardHeader>
          <Title>
            Total {formatNumber(stats.latest_block_count)} blocks found (Showing
            the last {blocks ? formatNumber(blocks.length) : 0} records)
          </Title>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Block</th>
                  <th>Age</th>
                  <th>Number of Txns</th>
                  <th>Size</th>
                  <th>Proposer</th>
                </tr>
              </thead>
              <tbody>
                {!blocks ? (
                  <tr>
                    <td colSpan={4}>No record yet</td>
                  </tr>
                ) : (
                  blocks.map((block, index) => {
                    const block_time =
                      new Date().getSeconds() -
                      new Date(block.time).getSeconds();

                    return (
                      <tr key={index}>
                        <td>
                          <StyledLink to={`/block/${block.height}`}>
                            {block.height}
                          </StyledLink>
                        </td>
                        <td>{Math.abs(block_time)} secs ago</td>
                        <td>
                          <StyledLink to={`/txs?block=${block.height}`}>
                            {block.transaction_count}
                          </StyledLink>
                        </td>
                        <td>{block.block_size}</td>
                        <td>
                          <StyledLink to={`/party/${block.proposer_address}`}>
                            Proposer: {block.proposer_name}
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
