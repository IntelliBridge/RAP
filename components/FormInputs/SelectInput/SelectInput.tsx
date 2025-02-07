import { ErrorMessage as ErrorMessageUSWDS, Select as SelectUSWDS, ValidationStatus } from "@trussworks/react-uswds";
import { CSSProperties } from "react";
import InputLabel from "../InputLabel/InputLabel";
import "../inputComponent.scss";
import useFormInputInit from "../useFormInputInit";

export const SelectInputDefaultEmptyLabel = " - Select - ";
export interface USWDSSelectProps {
  /* copy/pasted here as they don't export them */
  id?: string;
  name: string;
  className?: string;
  // children: React.ReactNode; ... not used here
  validationStatus?: ValidationStatus;
  inputRef?: string | ((instance: HTMLSelectElement | null) => void) | React.RefObject<HTMLSelectElement> | null | undefined;
}

export interface SelectOptionObject {
  label: string;
  value: string;
  key?: string;
}

export type SelectOption = SelectOptionObject | string;

export interface SelectInputProps extends USWDSSelectProps {
  label?: string | boolean;
  required?: boolean;
  style?: CSSProperties | undefined;
  width?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange?: (value: string) => void;
  options: SelectOption[] | string[];
  displayType?: string;
  afterInput?: JSX.Element;
  onChange?: (value: string) => void;
}

export default function SelectInput({ label, required = false, name, width, options, afterInput, onChange, ...inputProps }: SelectInputProps) {
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
  } = useFormInputInit({ label, required, name, width, afterInput, ...inputProps });
  if (overrideRender) {
    return overrideRender;
  }
  /* end of copy section for new inputs */
  const selectOptions: SelectOptionObject[] = [];
  options.forEach((option) => {
    if (typeof option === "string") {
      const label = option === "" ? SelectInputDefaultEmptyLabel : option;
      selectOptions.push({ label, value: option });
    } else {
      selectOptions.push(option);
    }
  });
  return (
    <div className={`select-input-component input-component ${validationStatus ? "has-error" : ""}`}>
      {displayLabel && <InputLabel name={name} label={displayLabel} required={required} />}
      {validationStatus === "error" && <ErrorMessageUSWDS>{errorMsg}</ErrorMessageUSWDS>}
        <SelectUSWDS
          {...inputProps}
          id={id}
          data-testid={id}
          name={name}
          required={required}
          value={values[name]}
          validationStatus={validationStatus}
          onChange={(e) => {
            setValue(e.target.value);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          onBlur={handleBlur}
          aria-label={name}
        >
          {selectOptions.map((option) => {
            return (
              <option key={option.key ?? option.value + option.label} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </SelectUSWDS>
        {afterInput ? <div className="after-input after-select">{afterInput}</div> : null}
    </div>
  );
}
