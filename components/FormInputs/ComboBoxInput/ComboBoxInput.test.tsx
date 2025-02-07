import { render, waitFor } from "@testing-library/react";
import * as Formik from "formik";
import { describe, it } from "vitest";
import ComboBoxInput, { NewOptionsHandler } from "./ComboBoxInput";
import { ComboBoxOption } from "@trussworks/react-uswds";

describe("SelectInput", () => {
  it("renders w/o crash", () => {
    const formikVariables = {
      initialValues: { risk: "Low" },
      onSubmit: (values: { risk: string }) => {
        console.log(values);
      },
    };
    const options: ComboBoxOption[] = [];
    function optionsUpdater(value: string, newOptionsHandler: NewOptionsHandler) {
      const data = ["Low", "High"];
      const newOptions: ComboBoxOption[] = [];
      data.forEach((element) => {
        if (value.includes(element)) {
          newOptions.push({ value: element, label: element });
        }
      });
      newOptionsHandler(newOptions);
    }
    const comp = render(
      <Formik.Formik {...formikVariables}>
        <ComboBoxInput label="label 1" name="risk" width="134px" options={options} optionsUpdater={optionsUpdater} />
      </Formik.Formik>
    );
    waitFor(() => {
      expect(comp).toBeDefined();
    });
  });

  // it("renders error", () => {
  //   //@ts-ignore
  //   const getFieldMetaMock = (name: string) => {
  //     return {
  //       value: "risk",
  //       initialTouched: true,
  //       touched: true,
  //       error: "error",
  //     };
  //   };
  //   const useFormikContextMock = jest.spyOn(Formik, "useFormikContext");
  //   useFormikContextMock.mockReturnValue({
  //     getFieldMeta: getFieldMetaMock,
  //     values: {
  //       risk: "Low",
  //     },
  //   } as unknown as any);
  //   const formikVariables = {
  //     initialValues: { risk: "Low" },
  //     onSubmit: (values: { risk: string }) => {
  //       console.log(values);
  //     },
  //   };
  //   const options: ComboBoxOption[] = [];
  //   function optionsUpdater(value: string, newOptionsHandler: NewOptionsHandler) {
  //     const data = ["Low", "High"];
  //     const newOptions: ComboBoxOption[] = [];
  //     data.forEach((element) => {
  //       if (value.includes(element)) {
  //         newOptions.push({ value: element, label: element });
  //       }
  //     });
  //     newOptionsHandler(newOptions);
  //   }
  //   const comp = render(
  //     <Formik.Formik {...formikVariables}>
  //       <ComboBoxInput label="label 1" name="risk" width="134px" options={options} optionsUpdater={optionsUpdater} />
  //     </Formik.Formik>
  //   );
  //   waitFor(() => {
  //     expect(comp).toBeDefined();
  //   });
  // });
});
