import { render } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Router } from "@remix-run/router";
import Header from "./Header";
import { vi, it, describe, beforeEach } from "vitest";

describe("Header", () => {
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
  });

  it("renders w/o crash", () => {
    router = createBrowserRouter([
      {
        path: "/",
        children: [{ path: "", element: <Header extendHeader={true} /> }],
      },
    ]);

    const comp = render(<RouterProvider router={router} />);

    expect(comp).toBeDefined();
  });

  it("renders with extendHeader=false ", () => {
    router = createBrowserRouter([
      {
        path: "/",
        children: [{ path: "", element: <Header extendHeader={false} /> }],
      },
    ]);

    const comp = render(<RouterProvider router={router} />);

    expect(comp).toBeDefined();
  });
});
