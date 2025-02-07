import { render } from "@testing-library/react";
import InputError from "./InputError";

describe("InputError", () => {
  it("renders w/o crash", () => {
    const comp = render(<InputError error={undefined} touched={true} />);

    expect(comp).toBeDefined();
  });

  it("renders error message", () => {
    const { getByTestId } = render(
      <InputError error={"error"} touched={true} />
    );

    expect(getByTestId("errorMessage")).toBeInTheDocument();
  });
});
