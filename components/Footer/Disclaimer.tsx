import { Grid, GridContainer } from "@trussworks/react-uswds";
import "./Footer.scss";

const Disclaimer = () => {
  return (
    <>
      <section className="usa-footer-idenitifier usa-footer-disclaimer" role="complementary">
        <GridContainer containerSize="widescreen" className="usa-footer-idenitifier">
          <Grid row gap>
            <div className="disclaimer-title">
              Disclaimer
            </div>
            <div className="disclaimer-text">
            <p>The contents of this presentation, including information disclosed verbally and/or in any slides, documents, or in any electronic or other recordable form, are the CONFIDENTIAL AND PROPRIETARY Information (“Confidential Information”) of IntelliBridge LLC. Use and/or disclosure of this Confidential Information is strictly prohibited without express written authorization from the company. This Confidential Information is protected by 18 U.S.C. section 1905 and exempt from disclosure under 5 U.S.C. section 552(b)(4).</p>
            </div>
          </Grid>
        </GridContainer>
      </section>
    </>
  );
};

export default Disclaimer;
