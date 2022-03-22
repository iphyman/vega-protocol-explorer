import styled from "styled-components/macro";
import { MdSearch } from "react-icons/md";
import {
  Column,
  Container,
  FlexColumn,
  FullWidth,
  Row,
  FlexCenter,
  StyledInput,
  Button,
  Card,
  LatestBlockRow,
  LatestTxRow,
  Loader,
} from "@vega-scan/ui-components";
import { darken } from "polished";
import { Link } from "react-router-dom";
import { Dashboard } from "../../components/Dashboard";
// import Ad1 from "../../../assets/images/ad1.jpg";
import VegaBg from "../../../assets/images/blocks-bg.png";
import { useAppStates } from "../../contexts/application";

const HomeWrap = styled(FlexColumn)``;

const HeroSection = styled(FlexCenter)`
  min-height: 18rem;
  background-image: url(${VegaBg});
  background-color: ${({ theme }) => theme.bg500};
`;

const HeroTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.yellow};
  font-weight: 500;
  font-family: "Inter", sans-serif;
  margin-bottom: 0.5rem;
`;

// const Image = styled.img`
//   width: 100%;
//   border-radius: 0.5rem;
// `;

const SearchWrapper = styled(FullWidth)`
  position: relative;
  height: 3rem;
`;

const SearchInput = styled(StyledInput)`
  background-color: ${({ theme }) => theme.white};
  border-radius: 0.5rem;
  padding: 0.75rem 4rem 0.75rem 1rem;
`;

const SearchButton = styled(Button)`
  width: 3.75rem;
  height: 100%;
  border-radius: 0rem 0.5rem 0.5rem 0rem;
  background-color: ${({ theme }) => theme.primary100};
  position: absolute;
  top: 0rem;
  right: 0rem;
  :hover {
    background-color: ${({ theme }) => darken(0.2, theme.primary100)};
  }
`;

const LatestBlockWrapper = styled(FullWidth)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardHeader = styled(FullWidth)`
  padding: 1rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.bg500};
`;

const CardBody = styled(FullWidth)`
  padding: 1rem;
  height: 26rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CardFooter = styled(Link)`
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.primary400};
  color: ${({ theme }) => theme.primary100};
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: normal;
  border-radius: 0.5rem;
  margin: 1rem;
  transition: all 0.4s ease;
  :hover {
    background-color: ${({ theme }) => theme.primary100};
    color: ${({ theme }) => theme.white};
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.text300};
  line-height: 1.5;
  text-transform: capitalize;
`;

export default function Home() {
  const { blocks, txs } = useAppStates();

  return (
    <HomeWrap>
      <HeroSection>
        <Container>
          <Row AlignItems="center" JustifyContent="space-between">
            <Column columnAtLeastTablet={12} columnAtLeastTabletL={7}>
              <HeroTitle>The VegaProtocol Blockchain Explorer</HeroTitle>
              <SearchWrapper>
                <SearchInput placeholder="Search Party/Txn/Block..." />
                <SearchButton>
                  <MdSearch size={32} />
                </SearchButton>
              </SearchWrapper>
            </Column>
            <Column columnAtLeastTablet={12} columnAtLeastTabletL={5}>
              {/* <Image src={Ad1} /> */}
            </Column>
          </Row>
        </Container>
      </HeroSection>
      <Dashboard />
      <LatestBlockWrapper>
        <Container>
          <Row AlignItems="center" JustifyContent="space-between">
            <Column
              column={12}
              columnAtLeastTablet={12}
              columnAtLeastTabletL={6}
            >
              <Card>
                <CardHeader>
                  <Title>Latest Blocks</Title>
                </CardHeader>
                <CardBody>
                  {!blocks ? (
                    <Loader />
                  ) : (
                    blocks.map((block, index) => {
                      return <LatestBlockRow key={index} {...block} />;
                    })
                  )}
                </CardBody>
                <CardFooter to="/blocks">View all blocks</CardFooter>
              </Card>
            </Column>
            <Column
              column={12}
              columnAtLeastTablet={12}
              columnAtLeastTabletL={6}
            >
              <Card>
                <CardHeader>
                  <Title>Latest Transactions</Title>
                </CardHeader>
                <CardBody>
                  {!txs ? (
                    <Loader />
                  ) : (
                    txs.map((tx, index) => {
                      return <LatestTxRow key={index} block={tx} />;
                    })
                  )}
                </CardBody>
                <CardFooter to="/txs">View all transactions</CardFooter>
              </Card>
            </Column>
          </Row>
        </Container>
      </LatestBlockWrapper>
    </HomeWrap>
  );
}
