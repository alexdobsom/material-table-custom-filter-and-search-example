import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// test("table to exist in the document", () => {
//   render(<App />);
//   const table = screen.getByTestId(/table/i);
//   expect(table).toBeInTheDocument();
// });

// test("table with name `ppp` to not exist in the document", () => {
//   render(<App />);
//   const table = screen.queryByTestId("ppp");
//   expect(table).not.toBeInTheDocument();
// });

// test("type 'kan' into search box and should not see value kan", async () => {
//   render(<App />);

//   const input = screen.getByRole("textbox", {
//     name: /search/i,
//   });

//   /* fire events that update state */

//   user.click(input);
//   user.keyboard("an");

//   await waitFor(() => {
//     expect(input).not.toHaveValue("kan");
//   });
// });

describe("suite of test to match row results based on search", () => {
  test("type 'an' into search box and get 2 rows as results", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", {
      name: /search/i,
    });

    await user.click(input);
    await user.keyboard("a");

    await waitFor(() => {
      expect(input).toHaveValue("a");
    });

    await user.keyboard("n");

    await waitFor(async () => {
      const input = await screen.findByRole("textbox", {
        name: /search/i,
      });

      expect(input).toHaveValue("an");
    });

    await waitFor(
      async () => {
        expect(
          await screen.findByRole("row", {
            name: /belmondo/i,
          })
        ).toThrow();
      },
      { timeout: 3000 }
    );

    // eslint-disable-next-line testing-library/no-debugging-utils
    // await waitFor(() => screen.debug(), { timeout: 3000 });

    // await waitForElementToBeRemoved(
    //   () =>
    //     screen.queryByRole("row", {
    //       name: /belmondo/i,
    //     })
    //   // { timeout: 30000 }
    // );

    //   expect(
    //     screen.getByRole("row", {
    //       name: /ana belle/i,
    //     })
    //   ).toBeInTheDocument();

    //   expect(
    //     screen.getByRole("row", {
    //       name: /anabel/i,
    //     })
    //   ).toBeInTheDocument();

    // const row = screen.queryByRole("row", {
    //   name: /belmondo/i,
    // });
    // expect(row).not.toBeInTheDocument();
  });
});
