import { render } from "@testing-library/react";
import DisplayValueInput from "./DisplayValueInput";
import * as Formik from "formik";

describe("DiplayValueInput", () => {
  beforeEach(() => {
    //@ts-ignore
    const getFieldMetaMock = (name: string) => {
      return {
        value: "priorityDate",
        initialTouched: true,
        touched: false,
      };
    };

    const useFormikContextMock = jest.spyOn(Formik, "useFormikContext");
    useFormikContextMock.mockReturnValue({
      getFieldMeta: getFieldMetaMock,
      values: {
        priorityDate: "test",
      },
    } as unknown as any);
  });

  it("renders w/o crash", () => {
    const comp = render(
      <DisplayValueInput
        label="Priority Date (in CSV file)"
        name="priorityDate"
      />
    );

    expect(comp).toBeDefined();
  });
});
