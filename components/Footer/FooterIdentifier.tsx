import { Grid, GridContainer, Logo } from "@trussworks/react-uswds";
import "./Footer.scss";
import footerLink from "./footerLinks.json";
import { Link } from "react-router-dom";
import parentCompanyLogo from "../assets/logos/domaingov.svg"
import parentCompany from "../assets/logos/intellibridge.svg"

interface Links {
  [key: string]: {
    [key: string]: string;
  };
}

interface FooterLinksProps {
  links: Links;
}

const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => {
  const linkRows = Object.values(links).map((row, rowIndex) => (
    <Grid
      key={rowIndex}
      className="usa-footer__idenitifier-company-links"
    >
      {Object.entries(row).map(([linkText, linkHref], linkIndex) => (
        <Link to={linkHref} key={linkIndex}>
          {linkText}
        </Link>
      ))}
    </Grid>
  ));

  return (
    <Grid className="usa-footer__contact-links" mobileLg={{ col: 12 }}>
      <Grid row>{linkRows}</Grid>
    </Grid>
  );
};

const FooterIdentifier = () => {
  return (
    <>
      <section className="usa-footer-idenitifier" role="complementary">
        <GridContainer containerSize="widescreen" className="usa-footer-idenitifier">
          <Grid row gap>
            <Grid col={6} className="usa-footer__contact-links">
              <Logo
                size="slim"
                image={
                  <img
                    className="usa-footer__logo-img"
                    alt="Parent Company Logo"
                    src={parentCompanyLogo}
                  />
                }
                heading={
                  <div className="usa-footer-idenitifier-container">
                  </div>
                }

              />
              
            </Grid>
            <Grid className="usa-footer__contact-links" mobileLg={{ col: 12 }}>
              <FooterLinks
                links={footerLink["identifier"]["links"]}
              ></FooterLinks>
            </Grid>
            <Grid
              className="usa-footer__contact-links-footer"
              mobileLg={{ col: 12 }}
            >
              <Grid row>
                <Grid className="usa-footer__idenitifier-company-footer">
                  {footerLink["identifier"]["identifierfooter"]["text"]}{" "}
                  <Link
                    to={
                      footerLink["identifier"]["identifierfooter"]["link"][
                        "url"
                      ]
                    }
                  >
                    {" "}
                    {
                      footerLink["identifier"]["identifierfooter"]["link"][
                        "title"
                      ]
                    }
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid col={12} className="identifier-parent-link">
              <a href="https://www.intellibridge.us/" target="_blank">Intellibridge.us</a><br />
              <p>HEADQUARTERS:  1430 Spring Hill Road, Suite 200  McLean, VA 22102 &nbsp;&nbsp;|&nbsp;&nbsp;    Phone: 571-499-4150   &nbsp;&nbsp; |  &nbsp;&nbsp;  Fax: 855-540-1197</p>
            </Grid>
          </Grid>
        </GridContainer>
      </section>
    </>
  );
};

export default FooterIdentifier;
