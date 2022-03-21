import { Colors } from "@vega-scan/ui-components";

declare module "styled-components/macro" {
  // eslint-disable-next-line
  export interface DefaultTheme extends Colors {}
}
