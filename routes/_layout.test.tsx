import { fireEvent, render } from "@testing-library/react";
import { vi, it, describe, expect, beforeEach } from "vitest";
import { Router } from "@remix-run/router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./_layout";

describe("_layout", () => {
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
        children: [{ path: "", element: <Layout /> }],
      },
    ]);
  });

  it("renders w/o crash", () => {
    const comp = render(<RouterProvider router={router} />);

    expect(comp).toBeDefined();
  });

  it("renders header control", () => {
    const { getByTestId, getByText } = render(
      <RouterProvider router={router} />
    );

    const button = getByTestId("header-control-button");

    fireEvent.click(button);

    expect(getByText("Extend Header:")).toBeInTheDocument();
    expect(getByText("Enable Search:")).toBeInTheDocument();
    expect(getByText("Enable MegaNavBar:")).toBeInTheDocument();
    expect(getByText("Footer Toggle")).toBeInTheDocument();
  });
});
