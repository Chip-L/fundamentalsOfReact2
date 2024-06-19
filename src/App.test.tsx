import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

type mockResponseProps = {
  ok?: boolean;
  json: string;
  status?: number;
  statusText?: string;
};

const getMockResponse = ({
  ok = true,
  json,
  status = 200,
  statusText = "",
}: mockResponseProps): Response => {
  return {
    json: vi.fn().mockResolvedValue(json),
    ok,
    status,
    statusText,
    headers: {} as Headers,
    redirected: false,
    type: "cors",
    url: "",
    clone: vi.fn(),
    body: {} as ReadableStream<Uint8Array>,
    bodyUsed: false,
    arrayBuffer: vi.fn(),
    blob: vi.fn(),
    formData: vi.fn(),
    text: vi.fn(),
  };
};

const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
  getMockResponse({
    json: JSON.stringify([
      {
        id: "ba6",
        url: "https://cdn2.thecatapi.com/images/ba6.jpg",
        width: 500,
        height: 331,
      },
    ]),
  })
);

function renderApp() {
  render(<App />);
}

describe("something truthy and falsy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading (while getting image)", () => {
    renderApp();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("displays a cat image", () => {
    renderApp();

    const loading = screen.getByText(/loading/i);
    const image = screen.queryByRole("img");

    waitFor(() => {
      expect(loading).not.toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        "https://cdn2.thecatapi.com/images/ba6.jpg"
      );
      expect(image).toHaveAttribute("alt", "cat image");
    });
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("displays a generate button", () => {
    renderApp();

    const btn = screen.getByRole("button", { name: "Get cat" });

    expect(btn).toBeInTheDocument();
  });
});
