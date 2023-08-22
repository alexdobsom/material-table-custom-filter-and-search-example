import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.setTimeout(9000);

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
  test("type 'an ' into search box and get 2 rows as results", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", {
      name: /search/i,
    });

    await user.click(input);
    await user.keyboard("a");

    // await act(async () => {
    await pause();
    // });

    expect(input).toHaveValue("a");

    await user.keyboard("n");

    // await act(async () => {
    await pause();
    // });

    expect(input).toHaveValue("an");

    // const filter = screen.getByRole("searchbox", {
    //   name: /filter data by name/i,
    // });
    // await user.click(filter);
    // await user.keyboard("x");
    // await user.keyboard("{BackSpace}");
    // expect(filter).toHaveValue("");

    expect(
      screen.queryByRole("row", {
        name: /belmondo/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("row", {
        name: /rafa/i,
      })
    ).not.toBeInTheDocument();

    // await waitForElementToBeRemoved(() =>
    //   screen.queryByRole("row", {
    //     name: /belmondo/i,
    //   })
    // );

    // await waitFor(
    //   () => {
    //     expect(
    //       screen.queryByRole("row", {
    //         name: /belmondo/i,
    //       })
    //     ).not.toBeInTheDocument();
    //   },
    //   { timeout: 3000 }
    // );

    // await waitFor(() =>
    //   expect(
    //     screen.getByRole("row", {
    //       name: /belmondo/i,
    //     })
    //   ).toBeVisible()
    // );

    // const row = screen.getByRole("row", {
    //   name: /belmondo/i,
    // });

    // expect(row).not.toBeInTheDocument();

    // await waitFor(
    //   async () =>
    //     screen.findByRole("row", {
    //       name: /belmondo/i,
    //     }),
    //   { timeout: 3000 }
    // );

    // eslint-disable-next-line testing-library/no-debugging-utils
    // await waitFor(() => screen.debug(), { timeout: 3000 });

    // await waitForElementToBeRemoved(() =>
    //   screen.queryByRole("row", {
    //     name: /belmondo/i,
    //   })
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
  });
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};
