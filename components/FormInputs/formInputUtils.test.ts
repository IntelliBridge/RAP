import { describe, it } from "vitest";
import { getValidationStatus } from "./formInputUtils";

describe("FormInputUtils", () => {
  it("returns error", () => {
    const error = "error";
    const touched = true;
    const result = getValidationStatus(error, touched);

    expect(result).toBe("error");
  });

  it("returns undefined", () => {
    const error = "error";
    const touched = false;
    const result = getValidationStatus(error, touched);

    expect(result).toBeUndefined();
  });
});
