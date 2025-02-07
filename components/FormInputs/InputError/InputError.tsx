import { ErrorMessage } from "@trussworks/react-uswds";

interface InputErrorProps {
  error: string | undefined;
  touched: boolean | undefined;
}

export default function InputError({ error, touched }: InputErrorProps) {
  if (error && touched) {
    return <ErrorMessage>{error}</ErrorMessage>;
  } else {
    return null;
  }
}
