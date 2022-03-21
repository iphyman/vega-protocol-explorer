import { render } from "@testing-library/react";

import { LightLogo } from ".";

describe("Icons", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LightLogo />);
    expect(baseElement).toBeTruthy();
  });
});
