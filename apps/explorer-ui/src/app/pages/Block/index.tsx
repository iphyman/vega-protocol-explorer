import styled from "styled-components/macro";
import {
  Card,
  Container,
  FullWidth,
  FlexBetween,
  PageTitle,
  ToolTip,
  StyledLink,
} from "@vega-scan/ui-components";
import { VegaClient, GetBlockResponse } from "@vega-scan/sdk";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

// const CardFooter = styled(FullWidth)``;

const Title = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.text200};
`;

const TableContainer = styled(FullWidth)`
  /* overflow-x: auto; */
  tr {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 20% 80%;
  }
`;

export default function Block() {
  const [block, setBlockData] = useState<GetBlockResponse | null>(null);
  const { height } = useParams<{ height: string }>();
  const isMounted = useIsMounted();
  const block_time = block
    ? new Date(block.time).toUTCString()
    : new Date().toUTCString();

  const getBlock = async () => {
    const client = new VegaClient();
    const block = await client.getBlock(parseInt(height as string));
    setBlockData(block);
  };

  useEffect(() => {
    if (isMounted()) {
      getBlock();
    }
  }, [isMounted]);

  return (
    <PageWrapper>
      <PageTitle>Block</PageTitle>
      <Card>
        <CardHeader>
          <Title>Block details</Title>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <table>
              <tbody>
                <tr>
                  <td>
                    <ToolTip content="Block height indicates the length of the blockchain" />
                    Height
                  </td>
                  <td>{block?.height}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the date and time a block was mined on the blockchain" />
                    Timestamp
                  </td>
                  <td>{block_time}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the number of transactions included on this block" />
                    Transactions
                  </td>
                  <td>
                    <StyledLink to={`/trx/${block?.height}`}>
                      {block?.transaction_count}
                    </StyledLink>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the hash of the current block head" />
                    Hash
                  </td>
                  <td>{block?.block_hash}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the hash of the previous block" />
                    Parent Hash
                  </td>
                  <td>{block?.parent_block_hash}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the validator that included this block to the blockchain" />
                    Proposer
                  </td>
                  <td>{block?.proposer_address}</td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </CardBody>
      </Card>
    </PageWrapper>
  );
}
