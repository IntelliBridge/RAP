import { TextInputProps } from "@trussworks/react-uswds/lib/components/forms/TextInput/TextInput";
import React from "react";

export interface ITextInput extends TextInputProps {
  label: string;
  name: string;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
  onInputChange?: (value: string) => void;
}
