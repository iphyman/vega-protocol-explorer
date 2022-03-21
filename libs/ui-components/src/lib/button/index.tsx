import styled from "styled-components/macro";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  opacity?: string;
}

export const Button = styled.button.attrs<ButtonProps>(({ type }) => ({
  type: type ?? "button",
}))<ButtonProps>`
  width: auto;
  height: auto;
  padding: 0.625rem 1rem;
  margin: 0rem;
  background-color: transparent;
  border-width: 0.1rem;
  border-style: solid;
  border-color: transparent;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-align: center;
  line-height: 1;
  color: #fff;
  text-transform: none;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  opacity: ${({ disabled, opacity }) =>
    disabled ? 0.5 : opacity ? opacity : 1};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: 0px;
  }
`;
