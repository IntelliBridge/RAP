import { ComboBox, ComboBoxOption, ErrorMessage as ErrorMessageUSWDS } from "@trussworks/react-uswds";
import { CSSProperties } from "react";
import InputLabel from "../InputLabel/InputLabel";
import "../inputComponent.scss";
import useFormInputInit from "../useFormInputInit";
import "./ComboBoxInput.scss";

export const SelectInputDefaultEmptyLabel = " - Select - ";

export interface CustomizableFilter {
  filter: string;
  extras?: Record<string, string>;
}

/* copy/pasted here as they don't export them */
declare type USWDSComboBoxProps = {
  name: string;
  className?: string;
  options: ComboBoxOption[];
  defaultValue?: string;
  disabled?: boolean;
  assistiveHint?: string;
  noResults?: string;
  inputProps?: JSX.IntrinsicElements["input"];
  selectProps?: JSX.IntrinsicElements["select"];
  ulProps?: JSX.IntrinsicElements["ul"];
  customFilter?: CustomizableFilter;
  disableFiltering?: boolean;
};

export type NewOptionsHandler = (options: ComboBoxOption[]) => void;

export interface ComboBoxInputProps extends USWDSComboBoxProps {
  label?: string | boolean;
  required?: boolean;
  style?: CSSProperties | undefined;
  width?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange?: (value: string) => void;
  optionsUpdater: (currentText: string, newOptionsHandler: NewOptionsHandler) => void;
  options: ComboBoxOption[];
  displayType?: string;
  afterInput?: JSX.Element;
}

export default function ComboBoxInput({ label, required = false, name, width, optionsUpdater, options, afterInput, ...inputProps }: ComboBoxInputProps) {
  /* start of copy section for new inputs */
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
    afterInput,
    ...inputProps,
  });

  if (overrideRender) {
    return overrideRender;
  }
  /* end of copy section for new inputs */

  const newOptionsHandler = (newOptions: ComboBoxOption[]) => {
    options.length = 0;
    newOptions.forEach((option: ComboBoxOption) => {
      options.push(option);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    optionsUpdater(value, newOptionsHandler);
  };

  return (
    <div className={`combo-box-input-component input-component ${validationStatus ? "has-error" : ""}`}>
      <InputLabel name={name} label={displayLabel} required={required} />
      {validationStatus === "error" && <ErrorMessageUSWDS>{errorMsg}</ErrorMessageUSWDS>}
      <div className="input-and-after-input-wrapper">
        <ComboBox
          {...inputProps}
          options={options}
          id={id}
          data-testid={id}
          name={name}
          defaultValue={values[name]}
          onChange={(value) => setValue(value ?? "")}
          inputProps={{ onChange: handleInputChange, onBlur: handleBlur }}
        ></ComboBox>
        {/* {afterInput ? <div className="after-input after-select">{afterInput}</div> : null} */}
      </div>
    </div>
  );
  
}
