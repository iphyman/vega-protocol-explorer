export interface Colors {
  white: string;
  black: string;
  yellow: string;

  // Background
  bg100: string;
  bg200: string;
  bg300: string;
  bg400: string;
  bg500: string;
  bg600: string;
  bg700: string;

  // Text
  text100: string;
  text200: string;
  text300: string;
  text400: string;

  // Primary
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;

  // Secondary
  secondary100: string;
  secondary200: string;

  // Notification colors
  red100: string;
}

declare module "styled-components/macro" {
  // eslint-disable-next-line
  export interface DefaultTheme extends Colors {}
}
