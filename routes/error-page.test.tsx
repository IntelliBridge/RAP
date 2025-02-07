import { fireEvent, render } from "@testing-library/react";
import ErrorPage from "./error-page";
import { Router } from "@remix-run/router";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { vi, describe, it, beforeEach } from "vitest";

describe("error-page", () => {
  let router: Router;

  beforeEach(() => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useRouteError: () =>
          vi.fn().mockReturnValue({
            statusText: "400",
            message: "error",
          }),
      };
    });

    router = createBrowserRouter([
      {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: (
              <Link to="/err" data-testid="link">
                Click me
              </Link>
            ),
          },
        ],
      },
    ]);
  });

  it("renders w/o crash", () => {
    const { getByTestId } = render(<RouterProvider router={router} />);

    const link = getByTestId("link");
    fireEvent.click(link);

    expect(getByTestId("error-page")).toBeInTheDocument();
  });
});
