import { Alert, GridContainer } from "@trussworks/react-uswds";
import { Link } from "react-router-dom";
import "./Logout.scss";
import PageTemplate from "../../../layouts/PageTemplate";

export default function Logout() {
  const mainContent = (
    <GridContainer containerSize="desktop">
      <div className="logout-page">
        <h1>Signed Out</h1>
        <Alert
          className="logout-confirmed"
          type="success"
          heading="You have successfully signed out."
          headingLevel="h2"
        >
          <p>
            Your Session has ended safely. All your case information remains
            secure.
          </p>
          <p>If you're done, please close your browser for added security.</p>
        </Alert>
        <div className="logout-content">
          <p>
            Ready to return? Access your case information by securely signing in
            again.
          </p>
          <Link to="/" className="usa-button usa-button--primary">
            Sign In Again
          </Link>
          <p>
            Need help? Contact our support teams at [support email/phone
            number].
          </p>
        </div>
      </div>
    </GridContainer>
  );
  return <PageTemplate mainContent={mainContent} />;
}
