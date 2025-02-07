import { waitFor } from "@testing-library/react";
import { handleSignOut } from "./events";
import { vi, expect, describe } from "vitest";

describe("tests", () => {
  const mocks = vi.hoisted(() => {
    return vi.fn();
  });

  beforeEach(() => {
    vi.mock("aws-amplify/auth", async () => {
      const actual = await vi.importActual("aws-amplify/auth");
      return {
        ...actual,
        signOut: mocks,
      };
    });
  });

  test("handleSignOut event has been called successfully", async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    handleSignOut(onSuccess, onError);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });
  });

  test("handleSignOut event failed", async () => {
    mocks.mockRejectedValueOnce("failed");

    const onSuccess = vi.fn();
    const onError = vi.fn();

    handleSignOut(onSuccess, onError);

    await waitFor(() => {
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });
  });
});
