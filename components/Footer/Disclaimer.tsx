import { Grid, GridContainer } from "@trussworks/react-uswds";
import "./Footer.scss";
import logo from '../assets/logos/agile-logo.png';

const Disclaimer = () => {
  return (
    <>
      <section className="usa-footer-idenitifier usa-footer-disclaimer" role="complementary">
        <GridContainer containerSize="widescreen" className="usa-footer-idenitifier">
          <Grid row gap>
            <Grid col={10}>
              <div className="disclaimer-title">
                Disclaimer
              </div>
              <div className="disclaimer-text">
              <p>The contents of this presentation, including information disclosed verbally and/or in any slides, documents, or in any electronic or other recordable form, are the CONFIDENTIAL AND PROPRIETARY Information (“Confidential Information”) of IntelliBridge LLC. Use and/or disclosure of this Confidential Information is strictly prohibited without express written authorization from the company. This Confidential Information is protected by 18 U.S.C. section 1905 and exempt from disclosure under 5 U.S.C. section 552(b)(4).</p>
              <p>Copyright 2025 | All rights reserved.</p>
              </div>
            </Grid>
            <Grid col={2}>
              <img src={logo} alt="Agile Defense Logo" />
              <div className="offset-text-disclaimer">
                <p>1430 Spring Hill Road, Suite 200<br />
                Mclean, VA 22102</p>
                <p>Phone: (703) 351-9977</p>
                <p>Email: info@agile-defense.com</p>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </section>
    </>
  );
};

export default Disclaimer;
