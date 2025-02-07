import { render } from "@testing-library/react";
import { vi, it, describe, beforeEach } from "vitest";
import Logout from "./logout";
import { Router } from "@remix-run/router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

describe("Logout", () => {
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
        children: [{ path: "", element: <Logout /> }],
      },
    ]);
  });

  it("renders w/o crash", () => {
    const comp = render(<RouterProvider router={router} />);

    expect(comp).toBeDefined();
  });
});
