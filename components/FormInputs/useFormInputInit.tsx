import { ValidationStatus } from "@trussworks/react-uswds";
import { useFormikContext } from "formik";
import { startCase } from "lodash";
import { CSSProperties, useEffect, useState } from "react";
import DisplayValueInput from "./DisplayValueInput/DisplayValueInput";
import { getValidationStatus, updateStyleWithWidth } from "./formInputUtils";

export interface UseFormInputInitProps {
  name: string;
  required?: boolean;
  label?: string | boolean;
  id?: string;
  style?: CSSProperties | undefined;
  width?: string | undefined;
  type?: string;
  viewOnlyFormatter?: (val: string) => Element;
  displayType?: string;
  afterInput?: JSX.Element;
}
export default function useFormInputInit({ name, label, required, width, displayType, afterInput, ...inputProps }: UseFormInputInitProps) {
  const { values, errors, touched, handleBlur, setValues } = useFormikContext<Record<string, string>>();
  const [value, setValue] = useState<string>(values[name]);
  const errorMsg = errors[name];
  const [validationStatus, setValidationStatus] = useState<ValidationStatus | undefined>(getValidationStatus(errors[name], touched[name]));
  useEffect(() => {
    setValidationStatus(getValidationStatus(errors[name], touched[name]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors[name], touched[name]]);

  useEffect(() => {
    setValues({
      ...values,
      [name]: value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const id = inputProps.id ?? `field-${name}`;

  const displayLabel = label === true ? startCase(name) : label;
  inputProps.style = updateStyleWithWidth(width, inputProps.style);
  let overrideRender = null;
  if (value === undefined) {
    overrideRender = <div>Value for {name} is undefined in formik initialValues.</div>;
  }
  if (values.viewOnly) {
    overrideRender = <DisplayValueInput {...{ label, required, name, type: displayType, afterInput, style: inputProps.style }} />;
  }
  return {
    /* field specific outputs */
    value,
    setValue,
    validationStatus,
    displayLabel,
    errorMsg,
    id,
    overrideRender,
    /* general form outputs */
    values,
    errors,
    touched,
    handleBlur,
    setValues,
  };
}
