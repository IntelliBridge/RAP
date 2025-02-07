import { OptionalTextInputProps } from "@trussworks/react-uswds/lib/components/forms/TextInput/TextInput";
import { useFormikContext } from "formik";
import { Component } from "react";
import { countryNameLookup } from "../CountryInput/CountryInput";
import { apiDateToDisplayValue } from "../DatePickerInput/DatePickerInput";
import InputLabel from "../InputLabel/InputLabel";
import "../inputComponent.scss";
import "./DisplayValueInput.scss";

export interface DisplayValueInputProps extends OptionalTextInputProps {
  label?: string | boolean;
  required?: boolean;
  name: string;
  type?: string | "number" | "text" | "email" | "password" | "search" | "tel" | "url";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange?: (value: string) => void;
  viewOnlyFormatter?: Component;
  afterInput?: JSX.Element;
}

/* Acts just like an input, but without the input box actually being there. Good for view pages */
export default function DisplayValueInput({ label, required = false, name, type, afterInput, ...inputProps }: DisplayValueInputProps) {
  const { values } = useFormikContext<Record<string, string>>();
  const id = inputProps.id ?? `field-${name}`;
  const specialHandlingTypes = ["email", "date", "country"];
  const value = values[name];
  return (
    <div className="display-value-input-component input-component" style={inputProps.style}>
      <InputLabel name={name} label={label} required={required} />
      <div className="input-and-after-input-wrapper">
        <div id={id} data-testid={name} className={`display-value display-value-type-${type}`}>
          {type === "email" && <a href={`mailto:${value}`}>{value}</a>}
          {type === "date" && <>{apiDateToDisplayValue(value)}</>}
          {type === "country" && <>{countryNameLookup[value]}</>}
          {!specialHandlingTypes.includes(String(type)) && <>{value}</>}
        </div>
        {afterInput ? <div className="after-input after-select">{afterInput}</div> : null}
      </div>
    </div>
  );
}
