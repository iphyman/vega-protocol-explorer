import styled from "styled-components/macro";
import {
  Column,
  Row,
  Brand,
  Container,
  ExternalLink,
  FlexStart,
  SocialLink,
  TwitterIcon,
  DiscordIcon,
  TelegramIcon,
  LinkIcon,
  media,
} from "@vega-scan/ui-components";
import { darken } from "polished";
import LightLogo from "../../../assets/images/logo-light.png";
import VegaBg from "../../../assets/images/blocks-bg.png";

const FooterWrapper = styled.footer`
  width: 100%;
  min-height: 10rem;
  background-image: url(${VegaBg});
  background-color: ${({ theme }) => theme.bg500};
  padding: 2rem 0rem 1rem;
`;

const AboutUs = styled.p`
  font-size: 0.875rem;
  color: #c3c5cb;
  line-height: 1.5;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  margin-bottom: 1rem;
  ${media.tabletL`
  margin-top: 1rem;
  `};
`;

const FooterDivider = styled(Container)`
  margin-top: 2rem;
  background-color: ${darken(0.5, "#c3c5cb")};
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Row JustifyContent="space-between">
          <Column column={12} columnAtLeastTabletL={3}>
            <Brand href="/">
              <img src={LightLogo} alt="logo" />
            </Brand>
            <AboutUs>
              VegaScan is a block explorer and analytics platform for Vega
              Protocol, a decentralised derivatives scaling layer for Web3.
            </AboutUs>
            <FlexStart>
              <SocialLink href="https://twitter.com">
                <TwitterIcon />
              </SocialLink>
              <SocialLink href="https://twitter.com">
                <DiscordIcon />
              </SocialLink>
              <SocialLink href="https://twitter.com">
                <TelegramIcon />
              </SocialLink>
              <SocialLink href="https://twitter.com">
                <LinkIcon />
              </SocialLink>
            </FlexStart>
          </Column>
          <Column column={12} columnAtLeastTabletL={3}>
            <ColumnTitle>Community</ColumnTitle>
            <ExternalLink
              href="https://vega.xyz/partners-backers"
              target="_blank"
            >
              Partners
            </ExternalLink>
            <ExternalLink
              href="https://vega.xyz/community/contributors"
              target="_blank"
            >
              Contributors
            </ExternalLink>
            <ExternalLink
              href="https://vegacommunity.substack.com/subscribe"
              target="_blank"
            >
              Newsletter signup
            </ExternalLink>
            <ExternalLink href="https://vega.xyz/community/" target="_blank">
              Join The Community
            </ExternalLink>
          </Column>
          <Column column={12} columnAtLeastTabletL={3}>
            <ColumnTitle>Resources</ColumnTitle>
            <ExternalLink href="https://vega.xyz/develop/" target="_blank">
              Get started
            </ExternalLink>
            <ExternalLink href="" target="_blank">
              Use the network
            </ExternalLink>
            <ExternalLink href="https://docs.vega.xyz/" target="_blank">
              Explore the Docs
            </ExternalLink>
            <ExternalLink
              href="https://token.vega.xyz/governance"
              target="_blank"
            >
              Configure the network
            </ExternalLink>
          </Column>
          <Column column={12} columnAtLeastTabletL={3}>
            <ColumnTitle>Quick links</ColumnTitle>
            <ExternalLink href="https://blog.vega.xyz/" target="_blank">
              Blog
            </ExternalLink>
            <ExternalLink href="https://vega.xyz/key-concepts/" target="_blank">
              Key concepts
            </ExternalLink>
            <ExternalLink
              href="https://token.vega.xyz/staking/"
              target="_blank"
            >
              Stake tokens
            </ExternalLink>
            <ExternalLink href="https://fairground.wtf/" target="_blank">
              Fairground Testnet
            </ExternalLink>
            <ExternalLink href="https://vega.xyz/talks/" target="_blank">
              Events and podcasts
            </ExternalLink>
          </Column>
        </Row>
      </Container>
      <FooterDivider />
      <Container>
        <Row AlignItems="center" JustifyContent="space-between">
          <Column column={12} columnAtLeastTabletL={6}></Column>
          <Column column={12} columnAtLeastTabletL={6}></Column>
        </Row>
      </Container>
    </FooterWrapper>
  );
};
