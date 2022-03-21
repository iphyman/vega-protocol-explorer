import styled from "styled-components/macro";
import {
  Card,
  Container,
  Row,
  Column,
  FullWidth,
  FlexBetween,
  PageTitle,
} from "@vega-scan/ui-components";

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
  tr {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 20% 80%;
  }
`;

export default function Block() {
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
                  <td>Height</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Timestamp</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Transactions</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </CardBody>
      </Card>
    </PageWrapper>
  );
}
