import styled from "styled-components/macro";
import {
  Brand,
  Container,
  FlexEnd,
  FullWidth,
  InternalLink,
  DarkModeIcon,
  LightModeIcon,
  Button,
} from "@vega-scan/ui-components";
import DarkLogo from "../../../assets/images/logo-dark.png";
import LightLogo from "../../../assets/images/logo-light.png";
import { useDarkMode } from "../../contexts/theme";

const HeaderWrap = styled(FullWidth)`
  height: 4.5rem;
  background-color: ${({ theme }) => theme.bg100};
`;

const HeaderNav = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftMenuItems = styled(FlexEnd)`
  width: fit-content;
`;

const StyledLink = styled(InternalLink)`
  font-weight: 600;
`;

const ThemeModeButton = styled(Button)`
  color: ${({ theme }) => theme.text300};
  border-radius: 0.5rem;
`;

export const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <HeaderWrap>
      <HeaderNav>
        <Brand href="/">
          <img src={darkMode ? LightLogo : DarkLogo} alt="logo" />
        </Brand>
        <LeftMenuItems>
          <StyledLink to="/blocks">Blockchain</StyledLink>
          <StyledLink to="/transactions">Trading</StyledLink>
          <StyledLink to="/">Resources</StyledLink>
          <ThemeModeButton onClick={toggleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </ThemeModeButton>
        </LeftMenuItems>
      </HeaderNav>
    </HeaderWrap>
  );
};
