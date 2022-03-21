import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import media from "../theme/media";
import { darken, lighten } from "polished";

export interface ColumnProps {
  column?: string | number | boolean;
  columnAtLeastMobile?: string | number;
  columnAtLeastMobileL?: string | number;
  columnAtLeastTablet?: string | number;
  columnAtLeastTabletL?: string | number;
  columnAtLeastLaptop?: string | number;
}

const TotalColums = 12;
const OneColumn = 100 / TotalColums;
const flexBasis = (col: any): string => {
  switch (col) {
    case true:
      return `
            flex: 0 0 auto;
            `;
    case "auto":
      return `
            flex: 0 0 auto;
            width: auto;
            `;
    default:
      return `
            flex: 0 0 ${OneColumn * col + "%"};
            max-width: ${OneColumn * col + "%"};
            `;
  }
};

export const FullWidth = styled.div`
  width: 100%;
`;

export const Flex = styled(FullWidth)`
  display: flex;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexBetween = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;

export const FlexCenter = styled(FlexBetween)`
  justify-content: center;
`;

export const FlexStart = styled(FlexBetween)`
  justify-content: flex-start;
`;

export const FlexColumnStart = styled(FlexStart)`
  flex-direction: column;
  align-items: flex-start;
`;

export const FlexColumnCenter = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexEnd = styled(FlexStart)`
  justify-content: flex-end;
`;

export const Brand = styled.a`
  display: flex;
  img {
    width: 10rem;
  }
`;

export const ContainerFluid = styled(FullWidth)`
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
  min-height: 0.0625rem;
`;

export const Container = styled(ContainerFluid)`
  ${media.atLeastMobileL`
    max-width: 540px;
  `};
  ${media.atLeastTablet`
    max-width: 720px;
  `};
  ${media.atLeastTabletL`
    max-width: 960px;
  `};
  ${media.atLeastLaptopML`
    max-width: 1200px;
  `};
  ${media.atLeastLaptopL`
    max-width: 1320px;
  `}
`;

export const InternalLink = styled(Link)`
  display: flex;
  height: 100%;
  line-height: 1;
  padding: 1rem;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text200};
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.25s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.text300};
    background-color: ${({ theme }) => theme.bg100};
    text-decoration: none;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  outline: 0rem;
  padding: 0rem;
  margin: 0rem;
  border: none;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text100};
  background-color: ${({ theme }) => theme.bg300};
  :focus {
    color: #495057;
  }
`;

export const Row = styled(Flex)<{
  AlignItems?: string;
  JustifyContent?: string;
}>`
  width: unset;
  margin-right: -1rem;
  margin-left: -1rem;
  flex-wrap: wrap;
  align-items: ${({ AlignItems }) => (AlignItems ? AlignItems : null)};
  justify-content: ${({ JustifyContent }) =>
    JustifyContent ? JustifyContent : null};
`;

export const Column = styled.div<ColumnProps>`
  position: relative;
  min-height: 0.0625rem;
  padding-right: 1rem;
  padding-left: 1rem;

  ${media.atLeastMobile`
${({ columnAtLeastMobile }: ColumnProps) =>
  columnAtLeastMobile ? flexBasis(columnAtLeastMobile) : null};
`};

  ${media.atLeastMobileL`
${({ columnAtLeastMobileL }: ColumnProps) =>
  columnAtLeastMobileL ? flexBasis(columnAtLeastMobileL) : null};
`};

  ${media.atLeastTablet`
${({ columnAtLeastTablet }: ColumnProps) =>
  columnAtLeastTablet ? flexBasis(columnAtLeastTablet) : null};
`};

  ${media.atLeastTabletL`
    ${({ columnAtLeastTabletL }: ColumnProps) =>
      columnAtLeastTabletL ? flexBasis(columnAtLeastTabletL) : null};
`};

  ${media.atLeastLaptop`
${({ columnAtLeastLaptop }: ColumnProps) =>
  columnAtLeastLaptop ? flexBasis(columnAtLeastLaptop) : null};
`};
`;

export const Card = styled(FlexColumn)`
  min-width: 0rem;
  background-color: ${({ theme }) => theme.bg200};
  border: 0.0625rem solid ${({ theme }) => theme.bg500};
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

export const SocialLink = styled.a`
  min-width: 2rem;
  width: 2rem;
  min-height: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: #191b1f;
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  margin-right: 0.5rem;
  transition: background-color 0.5s ease-in-out;
  :hover {
    background-color: ${lighten(0.3, "#191B1F")};
  }
`;

export const ExternalLink = styled.a`
  display: block;
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #c3c5cb;
  transition: color 0.3s ease-in-out;
  margin-bottom: 0.25rem;
  :hover {
    color: #ffffff;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.primary100};
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: color 0.4s ease-in-out;
  overflow: hidden;
  :hover {
    color: ${({ theme }) => darken(0.1, theme.primary100)};
  }
`;

export const PageTitle = styled.h2`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text200};
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;
