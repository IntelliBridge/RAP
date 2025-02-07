import { fireEvent, render } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Router } from "@remix-run/router";
import { NavBar } from ".";
import { vi, describe, it, beforeEach } from "vitest";

describe("NavBar", () => {
  let router: Router;

  beforeEach(() => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => vi.fn(),
        useLocation: () => vi.fn(),
      };
    });

    router = createBrowserRouter([
      {
        path: "/",
        children: [{ path: "", element: <NavBar onClickNav={false} /> }],
      },
    ]);
  });

  it("renders w/o crash", () => {
    const comp = render(<RouterProvider router={router} />);

    const navDropDownButton = comp.getByTestId("navDropDownButton");

    fireEvent.click(navDropDownButton);

    expect(comp).toBeDefined();
  });
});
