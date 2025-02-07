import { Alert, Grid } from "@trussworks/react-uswds";

export interface PageErrorProps {
  error: string | undefined;
}
export default function PageError({ error }: PageErrorProps) {
  if (!error) return null;
  return (
    <Grid col={12}>
      <Alert type="error" heading="Error status" headingLevel="h4">
        {error}
      </Alert>
    </Grid>
  );
}
