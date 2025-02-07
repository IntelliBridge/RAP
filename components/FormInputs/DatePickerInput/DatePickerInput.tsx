import {
  DatePicker,
  ErrorMessage as ErrorMessageUSWDS,
} from "@trussworks/react-uswds";
import { DatePickerProps } from "@trussworks/react-uswds/lib/components/forms/DatePicker/DatePicker";
import { useEffect, useState } from "react";
import InputLabel from "../InputLabel/InputLabel";
import "../inputComponent.scss";
import useFormInputInit from "../useFormInputInit";
export interface DatePickerInputProps extends Omit<DatePickerProps, "id"> {
  label?: string | boolean;
  required?: boolean;
  name: string;
  type?: "number" | "text" | "email" | "password" | "search" | "tel" | "url";
  width?: string;
  rightIcon?: string;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange?: (value: string) => void;
}

export function apiDateToDisplayValue(date: string) {
  if (!date) return "";

  // 2022-12-25 -> 12/25/2022
  const [YYYY, MM, DD] = date.split("-");
  return `${MM}/${DD}/${YYYY}`;
}
export function displayValueToApiDate(date: string) {
  if (!date) return "";

  // 12/25/2022 -> 2022-12-25
  const [MM, DD, YYYY] = date.split("/");
  return `${YYYY}-${MM}-${DD}`;
}

export function DateViewOnlyFormatter({ value }: { value: string }) {
  return <>{apiDateToDisplayValue(value)}</>;
}

export default function DatePickerInput({
  label,
  required = false,
  name,
  type = "text",
  width,
  ...inputProps
}: DatePickerInputProps) {
  const {
    /* field specific outputs */
    setValue,
    validationStatus,
    displayLabel,
    errorMsg,
    id,
    overrideRender,
    /* general form outputs */
    values,
    handleBlur,
  } = useFormInputInit({
    label,
    required,
    name,
    width,
    displayType: "date",
    ...inputProps,
  });
  const [displayValues, setDisplayValues] = useState<{ [key: string]: string }>(
    { date: String(apiDateToDisplayValue(values[name])) }
  );
  useEffect(() => {
    const newValue: string = apiDateToDisplayValue(values[name]);
    setDisplayValues({ ...displayValues, date: newValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[name]]);

  if (overrideRender) {
    return overrideRender;
  }
  console.log(displayValues["date"]);
  return (
    <div
      className={`text-input-component input-component ${
        validationStatus ? "has-error" : ""
      }`}
    >
      <InputLabel name={name} label={displayLabel} required={required} />
      {validationStatus === "error" && (
        <ErrorMessageUSWDS>{errorMsg}</ErrorMessageUSWDS>
      )}

      <DatePicker
        {...inputProps}
        aria-describedby={`${id}-hint`}
        aria-labelledby={`${name}-label`}
        id={id}
        data-testid={name}
        name={name}
        type={type}
        autoCapitalize="off"
        autoCorrect="off"
        required={required}
        validationStatus={validationStatus}
        defaultValue={values[name]}
        onChange={(newDate) => {
          const newValue = displayValueToApiDate(String(newDate));
          setValue(newValue);
        }}
        onBlur={handleBlur}
      />
      <div className="usa-hint" id={`${id}-hint`}>
        mm/dd/yyyy
      </div>
    </div>
  );
}
