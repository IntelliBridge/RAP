import {
  // Address,
  // Grid,
  GridContainer,
  // Logo,
  SocialLink,
  // SocialLinks,
  Footer as USWDSFooter,
} from "@trussworks/react-uswds";
// import Config from "../../src/config";
import "./Footer.scss";
import FooterIdentifier from "./FooterIdentifier";
import footerLink from "./footerLinks.json";
import { Link } from "react-router-dom";
// import logoImg from "../assets/logos/logo.svg"
import {FooterNav} from "./FooterNav/FooterNav"
// const { siteTitle } = Config();
import Disclaimer from "./Disclaimer";
interface FooterProps {
  footerFormat?: string;
}

type SocialMediaName = "Facebook" | "Twitter" | "YouTube" | "Instagram" | "RSS";

const Footer = ({ footerFormat = "big" }: FooterProps) => {
  const returnToTop = (
    <GridContainer className="usa-footer__return-to-top">
      <a href="#" id="returnToTop" role="button" tabIndex={0}>Return to top</a>
    </GridContainer>
  );

  const socialLinkItems: JSX.Element[] = [];
  for (const [socialname, href] of Object.entries(footerLink["socialmedia"])) {
    let capitalizedSocialName: SocialMediaName;
    if (socialname === "youtube") {
      capitalizedSocialName = "YouTube";
    } else if (socialname === "rss") {
      capitalizedSocialName = "RSS";
    } else {
      capitalizedSocialName = (socialname.charAt(0).toUpperCase() +
        socialname.slice(1)) as SocialMediaName;
    }
    socialLinkItems.push(
      <SocialLink key={socialname} name={capitalizedSocialName} href={href} />
    );
  }

  const footerLinkItems = [];
  if (footerFormat === "big") {
    for (const [title, child] of Object.entries(footerLink["megamenu"])) {
      let megaMenuItems = [];
      megaMenuItems.push(title);
      for (const [name, href] of Object.entries(child)) {
        megaMenuItems.push(<Link to={href}>{name}</Link>);
      }
      footerLinkItems.push(megaMenuItems);
    }
  } else {
    for (const [footerlink, href] of Object.entries(footerLink["primary"])) {
      footerLinkItems.push(
        <Link to={href} className="usa-footer__primary-link">
          {footerlink}
        </Link>
      );
    }
  }

  // const agencyAddress = (
  //   <>
  //     <div className="usa-footer__contact-heading">Agency Contact Center</div>
  //     <Address
  //       size="medium"
  //       items={[
  //         <a key="telephone" href="tel:1-800-555-5555">
  //           (800) CALL-GOVT
  //         </a>,
  //         <a key="email" href="mailto:info@agency.gov">
  //           info@agency.gov
  //         </a>,
  //       ]}
  //     />
  //   </>
  // );
  // if (footerFormat == "slim") {
  //   footerLinkItems.push(
  //     <Address
  //       size="slim"
  //       items={[
  //         <a key="telephone" href="tel:1-800-555-5555">
  //           (800) CALL-GOVT
  //         </a>,
  //         <a key="email" href="mailto:info@agency.gov">
  //           info@agency.gov
  //         </a>,
  //       ]}
  //       className="usa-slim-adress"
  //     />
  //   );
  // }
  // const footerSecondary = (
  //   <>
  //     <Grid row gap>
  //       <Logo
  //         size="medium"
  //         image={
  //           <img
  //             className="usa-footer__logo-img"
  //             src={logoImg}
  //             alt="Keystone Logo"
  //           />
  //         }
  //         heading={<div className="usa-footer__logo-heading">{siteTitle}</div>}
  //       />
  //       <Grid className="usa-footer__contact-links" mobileLg={{ col: 6 }}>
  //         {footerFormat !== "slim" && <SocialLinks links={socialLinkItems} />}
  //         {footerFormat !== "slim" && agencyAddress}
  //       </Grid>
  //     </Grid>
  //   </>
  // );
  // const footerPrimary =
  //   footerFormat === "big" ? (
  //     <>
  //       <div className="grid-container big-footer">
  //         <div className="grid-row grid-gap">
  //           <div className="tablet:grid-col-8">
  //             <FooterNav
  //               aria-label="Footer navigation"
  //               size="big"
  //               links={footerLinkItems}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   ) : footerFormat === "slim" ? (
  //     <FooterNav
  //       aria-label="Footer navigation"
  //       size="slim"
  //       links={footerLinkItems}
  //     />
  //   ) : (
  //     <FooterNav
  //       aria-label="Footer navigation"
  //       size="medium"
  //       links={footerLinkItems}
  //     />
  //   );
  return (
    <>
      <USWDSFooter
        returnToTop={returnToTop}
        primary={""}
        secondary={<FooterNav
          aria-label="Footer navigation"
          size="slim"
          links={footerLinkItems}
        />}
      />
      <FooterIdentifier />
      <Disclaimer />
    </>
  );
};

export default Footer;
