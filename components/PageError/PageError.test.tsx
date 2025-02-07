import { render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import PageError from "./PageError";

describe("PageError", () => {
  it("renders w/o crash", () => {
    const error = "error";
    const comp = render(<PageError error={error} />);

    expect(comp).toBeDefined();
  });

  it("renders null", async () => {
    const error = undefined;
    const { container } = render(<PageError error={error} />);

    await waitFor(() => {
      expect(container.childElementCount).toEqual(0);
    });
  });
});
