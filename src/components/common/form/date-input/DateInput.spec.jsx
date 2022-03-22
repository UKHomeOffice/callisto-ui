import React from "react";
import { screen, render } from "@testing-library/react";

import DateInput from "./DateInput";

describe("DateInput", () => {
  it("should render a date input component with the correct heading", () => {
    render(
      <DateInput name="test" heading="What is the date?" headingSize="l" />
    );

    const heading = screen.getByText("What is the date?");

    expect(heading).toBeTruthy();
  });
});
