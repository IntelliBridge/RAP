import { render, waitFor } from "@testing-library/react";
import SelectInput from "./SelectInput";
import { Formik } from "formik";
import { describe, it } from "vitest";

describe("SelectInput", () => {
  it("renders w/o crash", () => {
    const riskOptions = ["", "Low", "Medium", "High"];
    const formikVariables = {
      initialValues: { risk: "Low" },
      onSubmit: (values: { risk: string }) => {
        console.log(values);
      },
    };

    const comp = render(
      <Formik {...formikVariables}>
        <SelectInput
          label="label 1"
          name="risk"
          width="134px"
          options={riskOptions}
          validationStatus="success"
        />
      </Formik>
    );

    waitFor(() => {
      expect(comp).toBeDefined();
    });
  });

  it("renders with options as non string values", () => {
    const riskOptions = [
      { label: " - Select - ", value: "" },
      { label: "Low", value: "Low", key: "low" },
    ];
    const formikVariables = {
      initialValues: { risk: "" },
      onSubmit: (values: { risk: string }) => {
        console.log(values);
      },
    };

    const comp = render(
      <Formik {...formikVariables}>
        <SelectInput
          label="label 2"
          name="risk"
          width="134px"
          options={riskOptions}
          validationStatus="success"
        />
      </Formik>
    );

    waitFor(() => {
      expect(comp).toBeDefined();
    });
  });
});
