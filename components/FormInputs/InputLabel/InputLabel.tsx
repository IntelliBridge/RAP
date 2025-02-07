import { Label } from "@trussworks/react-uswds";
import { startCase } from "lodash";

interface InputLabelProps {
  label?: string | boolean;
  name: string;
  required?: boolean;
}

export default function InputLabel({ label, name, required }: InputLabelProps) {
  if (!label) {
    return null;
  }
  label = label === true ? startCase(name) : label;
  return (
    <Label htmlFor={name} id={`${name}-label`}>
      {label}
      {required && (
        <abbr title="required" className="usa-label--required">
          {` *`}
        </abbr>
      )}
    </Label>
  );
}
