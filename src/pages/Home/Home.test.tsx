import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./Home";

describe("Home", () => {
  it("renders w/o crash", () => {
    const comp = render(<Home />);

    expect(comp).toBeDefined();
  });
});

test('should update document title to "Keystone | Home" on mount', () => {
  render(<Home />);
  expect(document.title).toBe('Keystone | Home');
});