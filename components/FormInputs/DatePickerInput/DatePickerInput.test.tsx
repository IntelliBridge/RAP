import { render, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, it, vi } from "vitest";
import DatePickerInput from "./DatePickerInput";

describe("DatePickerInput", () => {
  it("renders w/o crash", () => {
    const formikVariables = {
      initialValues: { dob: "01/01/2024" },
      onSubmit: vi.fn(),
    };

    const comp = render(
      <Formik {...formikVariables}>
        <DatePickerInput label="DOB" name="dob" />
      </Formik>
    );

    waitFor(() => {
      expect(comp).toBeDefined();
    });
  });
});
