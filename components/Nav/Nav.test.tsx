import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Router } from "@remix-run/router";
import Nav from "./Nav";
import { vi, it, describe, beforeEach } from "vitest";

describe("ApisUtils", () => {
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
        children: [{ path: "", element: <Nav activeNav="activeNav" /> }],
      },
    ]);
  });

  it("handleSubmission()", async () => {
    const comp = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(comp).toBeDefined();
    });
  });
});
