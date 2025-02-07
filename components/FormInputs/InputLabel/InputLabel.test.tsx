import { render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import InputLabel from "./InputLabel";

describe("<InputLabel />", () => {
  it("renders w/o crash", () => {
    const comp = render(<InputLabel name={"name"} label={"label"} required={true} />);

    expect(comp).toBeDefined();
  });

  it("renders null", async () => {
    const { container } = render(<InputLabel name={"name"} label={undefined} required={true} />);

    await waitFor(() => {
      expect(container.childElementCount).toEqual(0);
    });
  });
});
