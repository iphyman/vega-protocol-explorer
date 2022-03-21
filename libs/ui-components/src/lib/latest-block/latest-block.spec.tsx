import { render } from "@testing-library/react";

import LatestBlock from "./latest-block";

describe("LatestBlock", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LatestBlock />);
    expect(baseElement).toBeTruthy();
  });
});
