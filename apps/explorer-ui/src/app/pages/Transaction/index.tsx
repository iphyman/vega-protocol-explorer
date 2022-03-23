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
import { VegaClient } from "@vega-scan/sdk";
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

export default function Transaction() {
  const [tx, setBlockData] = useState<any>({});
  const { hash } = useParams<{ hash: string }>();
  const isMounted = useIsMounted();
  const block_time = new Date().toUTCString();

  const getTx = async () => {
    const client = new VegaClient();
    const txs = await client.getTransactionByHash(hash as string);
    setBlockData(txs);
  };

  useEffect(() => {
    if (isMounted()) {
      getTx();
    }
  }, [isMounted]);

  return (
    <PageWrapper>
      <PageTitle>Transaction</PageTitle>
      <Card>
        <CardHeader>
          <Title>Overview</Title>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <table>
              <tbody>
                <tr>
                  <td>
                    <ToolTip content="Indicates the hash of the transaction" />
                    Transaction Hash
                  </td>
                  <td>{tx?.hash}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Block height indicates the length of the blockchain" />
                    Block
                  </td>
                  <td>
                    <StyledLink to={`/block/${tx?.height}`}>
                      {tx?.height}
                    </StyledLink>
                  </td>
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
                    <ToolTip content="Indicates the gas used by the transaction" />
                    Gas Used
                  </td>
                  <td>{tx?.gas_used}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the gas wanted by transaction" />
                    Gas Wanted
                  </td>
                  <td>{tx?.gas_wanted}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the log" />
                    Log
                  </td>
                  <td>{tx?.log}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the data" />
                    Data
                  </td>
                  <td>{tx?.data}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the transaction type" />
                    Type
                  </td>
                  <td>{tx?.tx?.command_name}</td>
                </tr>
                <tr>
                  <td>
                    <ToolTip content="Indicates the data" />
                    Data
                  </td>
                  <td>{tx?.data}</td>
                </tr>
                {tx &&
                  tx.tx &&
                  Object.keys(tx.tx.data).map((key, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <ToolTip content={`Indicates the ${key}`} />
                          {key}
                        </td>
                        <td>{tx.tx.data[key]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </TableContainer>
        </CardBody>
      </Card>
    </PageWrapper>
  );
}
