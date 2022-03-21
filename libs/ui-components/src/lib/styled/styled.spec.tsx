import { render } from "@testing-library/react";

import { Flex } from ".";

describe("Styled", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Flex>Hello World! am a flex container</Flex>
    );
    expect(baseElement).toBeTruthy();
  });
});
