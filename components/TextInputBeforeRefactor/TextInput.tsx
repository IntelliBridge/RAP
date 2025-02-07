import { useEffect, useState } from 'react';
import { TextInput } from "@trussworks/react-uswds";
import { ITextInput } from "./types";

const TextInputComp = ({
  name,
  type,
  validationStatus,
  onBlur,
  onInputChange,
  ...inputProps
}: ITextInput & { label: string; isRequired?: boolean; errorMsg?: string }) => {
 
  const [value, setValue] = useState("");

  useEffect(() => {
    onInputChange && onInputChange(value);
  }, [value]);

  return (
    <>
      <TextInput
        {...inputProps}
        id={name}
        name={name}
        type={type}
        value={value}
        validationStatus={validationStatus}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    </>
  );
};

export default TextInputComp;
