import { render } from "@testing-library/react";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInput } from ".";

describe("TextInput", () => {
  it("renders w/o crash", () => {
    const formikVariables = {
      initialValues: { lname: "te" },
      validationSchema: yup.object().shape({
        Passport: yup.string().default("").required("Passport is required!"),
      }),
      onSubmit: (values: { lname: string }) => {
        console.log(values);
      },
    };

    const comp = render(
      <Formik {...formikVariables}>
        <TextInput
          id="lname"
          label="Last Name"
          required={true}
          name="lname"
          type="text"
        />
      </Formik>
    );
    expect(comp).toBeDefined();
  });
});
