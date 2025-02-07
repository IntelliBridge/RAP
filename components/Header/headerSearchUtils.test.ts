import { describe, vi } from "vitest";
import { globalSearch } from "./headerSearchUtils";

describe("headerSearchUtils", () => {
  it("renders w/o crash", () => {
    const logSpy = jest.spyOn(console, "log");

    const event = vi.fn();
    // @ts-ignore
    globalSearch(event);

    expect(logSpy).toHaveBeenCalled();
  });
});
