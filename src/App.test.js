import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("table to exist in the document", () => {
  render(<App />);
  const table = screen.getByTestId(/table/i);
  expect(table).toBeInTheDocument();
});

describe("suite of test to match row results based on search", () => {
  test.only("type 'Ana' into search box and get 2 rows results", async () => {
    render(<App />);
    const input = screen.getByRole("textbox", {
      name: /search/i,
    });

    userEvent.type(input, "Ana");
    expect(input).toHaveValue("Ana");

    const firstRow = screen.getByRole("row", {
      name: /ana belle/i,
    });
    const secondRow = screen.getByRole("row", {
      name: /anabel/i,
    });
    const thirdRow = screen.getByRole("row", {
      name: /belmondo/i,
    });

    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();

    await waitFor(() => {
      expect(thirdRow).not.toBeNull();
    });
  });
});
