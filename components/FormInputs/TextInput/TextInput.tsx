import { ErrorMessage as ErrorMessageUSWDS, TextInput as TextInputUSWDS } from "@trussworks/react-uswds";
import { OptionalTextInputProps } from "@trussworks/react-uswds/lib/components/forms/TextInput/TextInput";
import InputLabel from "../InputLabel/InputLabel";
import "../inputComponent.scss";
import useFormInputInit from "../useFormInputInit";

export interface TextInputProps extends OptionalTextInputProps {
  label?: string | boolean;
  required?: boolean;
  name: string;
  type?: "number" | "text" | "email" | "password" | "search" | "tel" | "url";
  width?: string;
  rightIcon?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange?: (value: string) => void;
}

export default function TextInput({ label, required = false, name, type = "text", width, ...inputProps }: TextInputProps) {
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
  } = useFormInputInit({ label, required, name, width, ...inputProps });
  if (overrideRender) {
    return overrideRender;
  }
  /* end of copy section for new inputs */

  return (
    <div className={`text-input-component input-component ${validationStatus ? "has-error" : ""}`}>
      <InputLabel name={name} label={displayLabel} required={required} />
      {validationStatus === "error" && <ErrorMessageUSWDS>{errorMsg}</ErrorMessageUSWDS>}
      <TextInputUSWDS
        {...inputProps}
        id={id}
        data-testid={name}
        name={name}
        type={type}
        autoCapitalize="off"
        autoCorrect="off"
        required={required}
        value={values[name]}
        validationStatus={validationStatus}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        aria-label={name}
      />
    </div>
  );
}
