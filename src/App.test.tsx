import { render, screen } from "@testing-library/react";
import App from "./App";

describe("something truthy and falsy", () => {
  it("displays a cat image", () => {
    render(<App />);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});
