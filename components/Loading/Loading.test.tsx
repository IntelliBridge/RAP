import { render, waitFor } from "@testing-library/react";
import { describe } from "vitest";
import Loading, { setLoading } from "./Loading";
import { act } from "react-dom/test-utils";

describe("Loading", () => {
  it("renders w/o crash", () => {
    const comp = render(<Loading />);
    expect(comp).toBeDefined();
  });

  it("renders loading", async () => {
    act(() => {
      setLoading(false, 100);
    });

    const { getByTestId } = render(<Loading />);

    act(() => {
      setLoading(true, 0);
    });

    await waitFor(() => {
      expect(getByTestId("loading-component")).toBeInTheDocument();
    });
  });
});
