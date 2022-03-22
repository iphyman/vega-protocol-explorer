import { Button } from "../button";
import {
  Column,
  Row,
  Container,
  FullWidth,
  Card,
  FlexBetween,
  FlexCenter,
  FlexColumn,
  StyledLink,
  FlexStart,
} from "../styled";
import styled from "styled-components/macro";

const ItemRowWrapper = styled(FullWidth)`
  padding: 0.25rem 0rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.bg600};
`;

const BlockIcon = styled(FlexCenter)<{ rounded?: boolean }>`
  min-width: 3rem;
  width: 3rem;
  height: 3rem;
  min-height: 3rem;
  background-color: ${({ theme }) => theme.secondary200};
  border-radius: ${({ rounded }) => (rounded ? "100%" : "0.5rem")};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text300};
  text-transform: capitalize;
  margin-right: 0.5rem;
`;

const BlockTime = styled.div<{ pl?: string }>`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text200};
  padding-left: ${({ pl }) => (pl ? pl : null)};
  white-space: nowrap;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text200};
  padding-right: 0.2rem;
`;

const Badge = styled(BlockIcon)`
  min-width: 4.5rem;
  width: auto;
  min-height: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
`;

const RowColumn = styled(FlexColumn)`
  overflow: hidden;
`;

interface Block {
  height: number;
  time: Date;
  proposer_address: string;
  proposer_name: string | null;
  block_size: number;
  transaction_count: number;
}

export const LatestTxRow = (block: any) => {
  const block_time = new Date().getSeconds() + 1 - new Date().getSeconds();

  return (
    <ItemRowWrapper>
      <Row AlignItems="center" JustifyContent="space-between">
        <Column columnAtLeastMobileL={5} column={5}>
          <FlexBetween>
            <BlockIcon rounded>Tx</BlockIcon>
            <RowColumn>
              <StyledLink to={`/tx/${block.block.hash}`}>
                {block.block.hash}
              </StyledLink>
              <BlockTime>{Math.abs(block_time)} secs ago</BlockTime>
            </RowColumn>
          </FlexBetween>
        </Column>
        <Column columnAtLeastMobileL={7} column={7}>
          <FlexBetween>
            <FlexColumn>
              <FlexStart>
                <Label>Type:</Label>
                <StyledLink to={`/tx/${block.block.hash}`}>
                  {block.block.command_name}
                </StyledLink>
              </FlexStart>
              <FlexStart>
                {/* <StyledLink to={`/txns?block=${block.block.height}`}>
                  {block.transaction_count} Txns
                </StyledLink> */}
                {/* <BlockTime pl="0.2rem">in 1 secs</BlockTime> */}
              </FlexStart>
            </FlexColumn>
            <Badge>0 VEGA</Badge>
          </FlexBetween>
        </Column>
      </Row>
    </ItemRowWrapper>
  );
};

export const LatestBlockRow = (block: Block) => {
  const block_time =
    new Date().getSeconds() - new Date(block.time).getSeconds();

  return (
    <ItemRowWrapper>
      <Row AlignItems="center" JustifyContent="space-between">
        <Column columnAtLeastMobileL={5} column={5}>
          <FlexBetween>
            <BlockIcon>Bk</BlockIcon>
            <FlexColumn>
              <StyledLink to={`/block/${block.height}`}>
                {block.height}
              </StyledLink>
              <BlockTime>{Math.abs(block_time)} secs ago</BlockTime>
            </FlexColumn>
          </FlexBetween>
        </Column>
        <Column columnAtLeastMobileL={7} column={7}>
          <FlexBetween>
            <FlexColumn>
              <FlexStart>
                <Label>Proposer:</Label>
                <StyledLink to={`/party/${block.proposer_address}`}>
                  {block.proposer_name}
                </StyledLink>
              </FlexStart>
              <FlexStart>
                <StyledLink to={`/txns?block=${block.height}`}>
                  {block.transaction_count} Txns
                </StyledLink>
                <BlockTime pl="0.2rem">in 1 secs</BlockTime>
              </FlexStart>
            </FlexColumn>
            <Badge>0 VEGA</Badge>
          </FlexBetween>
        </Column>
      </Row>
    </ItemRowWrapper>
  );
};
