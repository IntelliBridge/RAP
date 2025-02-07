import { render, waitFor } from "@testing-library/react";
import Footer from "./Footer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Router } from "@remix-run/router";
import { vi, it, describe, beforeEach } from "vitest";

describe("Footer", () => {
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

  it("renders w/o crash", async () => {
    router = createBrowserRouter([
      {
        path: "/",
        children: [{ path: "", element: <Footer footerFormat={"big"} /> }],
      },
    ]);
    const comp = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(comp).toBeDefined();
    });
  });

  it("renders Footer with footerFormat=slim ", async () => {
    router = createBrowserRouter([
      {
        path: "/",
        children: [{ path: "", element: <Footer footerFormat={"slim"} /> }],
      },
    ]);
    const comp = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(comp).toBeDefined();
    });
  });

  it("renders Footer with footerFormat=medium ", async () => {
    router = createBrowserRouter([
      {
        path: "/",
        children: [{ path: "", element: <Footer footerFormat={"medium"} /> }],
      },
    ]);
    const comp = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(comp).toBeDefined();
    });
  });
});
