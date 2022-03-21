import { FlexCenter } from "../styled";
import { rgba } from "polished";
import styled, { keyframes } from "styled-components/macro";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  background: ${({ theme }) => rgba(theme.black, 0.45)};
  z-index: 1000;
`;

export const SpinLoader = styled.div<{ size?: number }>`
  width: ${({ size }) => (size ? size + "rem" : "3rem")};
  height: ${({ size }) => (size ? size + "rem" : "3rem")};
  position: relative;
  border: 0.5rem solid ${({ theme }) => theme.bg500};
  border-radius: 50%;
  border-top: 0.5rem solid ${({ theme }) => theme.primary100};
  animation: ${spinAnimation} 0.5s linear infinite;
`;

export const Loader = () => {
  return (
    <Container>
      <SpinLoader></SpinLoader>
    </Container>
  );
};
