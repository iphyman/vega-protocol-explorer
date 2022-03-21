import styled from "styled-components/macro";
import {
  Row,
  Column,
  Container,
  Card,
  FullWidth,
  FlexBetween,
  FlexStart,
  FlexEnd,
  FlexCenter,
} from "@vega-scan/ui-components";
import { VegaPriceChart } from "../Chart";
import PriceIcon from "../../../assets/images/price.png";
import BlockHeightIcon from "../../../assets/images/block-height.png";
import CirculatingSupplyIcon from "../../../assets/images/circulating-supply.png";
import MarketcapIcon from "../../../assets/images/marketcap.png";
import ValidatorNodeIcon from "../../../assets/images/validator-nodes.png";

const StatsWrapper = styled(FullWidth)`
  position: relative;
  margin-top: -3rem;
  margin-bottom: 2rem;
`;

const CardBody = styled(FullWidth)`
  padding: 1.5rem;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
`;

const LeftItems = styled(FlexStart)`
  flex-direction: column;
  width: fit-content;
  align-items: flex-start;
`;

const RightItems = styled(FlexEnd)`
  flex-direction: column;
  width: fit-content;
  align-items: flex-end;
`;

const Label = styled.h3`
  font-size: 0.8125rem;
  margin: 0rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text200};
`;

const Value = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text300};
`;

const StatItemWrapper = styled(FlexCenter)`
  margin-bottom: 2rem;
`;

interface StatItemProps {
  icon: string;
  leftItemLabel: string;
  leftItemValue: string;
  rightItemLabel: string;
  rightItemValue: string;
}

const StatItem = (props: StatItemProps) => {
  return (
    <StatItemWrapper>
      <FlexCenter>
        <Icon>
          <img src={props.icon} alt="icon" />
        </Icon>
        <FlexBetween>
          <LeftItems>
            <Label>{props.leftItemLabel}</Label>
            <Value>{props.leftItemValue}</Value>
          </LeftItems>
          <RightItems>
            <Label>{props.rightItemLabel}</Label>
            <Value>{props.rightItemValue}</Value>
          </RightItems>
        </FlexBetween>
      </FlexCenter>
    </StatItemWrapper>
  );
};

export const Dashboard = () => {
  return (
    <StatsWrapper>
      <Container>
        <Card>
          <CardBody>
            <Row AlignItems="center" JustifyContent="space-between">
              <Column columnAtLeastTabletL={4} columnAtLeastTablet={6}>
                <StatItem
                  icon={PriceIcon}
                  leftItemLabel="Vega price"
                  leftItemValue="$4.58"
                  rightItemLabel="current/max tps"
                  rightItemValue="45/2000"
                />
                <StatItem
                  icon={ValidatorNodeIcon}
                  leftItemLabel="Validators"
                  leftItemValue="5"
                  rightItemLabel="total stake"
                  rightItemValue="NA"
                />
                <StatItem
                  icon={MarketcapIcon}
                  leftItemLabel="Fully diluted market cap"
                  leftItemValue="$45,000,000"
                  rightItemLabel="market cap"
                  rightItemValue="$456,000,000"
                />
              </Column>
              <Column columnAtLeastTabletL={4} columnAtLeastTablet={6}>
                <StatItem
                  icon={BlockHeightIcon}
                  leftItemLabel="Latest Block"
                  leftItemValue="# 57,000"
                  rightItemLabel="Transactions"
                  rightItemValue="45"
                />
                <StatItem
                  icon={PriceIcon}
                  leftItemLabel="Vega price"
                  leftItemValue="$4.58"
                  rightItemLabel="current/max tps"
                  rightItemValue="45/2000"
                />
                <StatItem
                  icon={CirculatingSupplyIcon}
                  leftItemLabel="Circulating Supply"
                  leftItemValue="13,517,276.52"
                  rightItemLabel="Total Supply"
                  rightItemValue="64,999,723"
                />
              </Column>
              <Column
                column={12}
                columnAtLeastTablet={12}
                columnAtLeastTabletL={4}
              >
                <VegaPriceChart />
              </Column>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </StatsWrapper>
  );
};
