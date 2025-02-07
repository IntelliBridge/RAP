// Header.tsx
import {
  Grid,
  NavMenuButton,
  Title,
  Header as USWDSHeader,
} from "@trussworks/react-uswds";
import { useState } from "react";
// import Config from "../../src/config";
import NavBar from "../NavBar/NavBar";
import "./Header.scss";
import { Link } from "react-router-dom";
import logoImg from "../assets/logos/logo.svg"

// const { siteTitle } = Config();

interface HeaderProps {
  extendHeader?: boolean;
  search?: boolean;
  megaNavBar?: boolean;
}

export default function Header({
  extendHeader = false,
  search = true,
  megaNavBar = false,
}: HeaderProps) {
  const [expanded, setExpanded] = useState(false);

  const onClick = (): void => setExpanded((prevExpanded) => !prevExpanded);

  return (
    <div className="header-component">
      <USWDSHeader extended={extendHeader} basic={!extendHeader}>
        <Grid>
          {extendHeader ? (
            // If extendHeader is true, render without usa-nav-container wrapper
            <>
              <div className="usa-navbar">
                <Title>
                  <Link to="/">
                    <img className="usa-logo-img" src={logoImg} alt="Company Logo"/>
                  </Link>
                </Title>
                <NavMenuButton onClick={onClick} label="Menu" />
              </div>
              <NavBar
                megaNav={megaNavBar}
                extendNav={extendHeader}
                searchBar={search}
                onClickNav={expanded} // Pass the onClick function as a prop
              />
            </>
          ) : (
            // If extendHeader is false, render with usa-nav-container wrapper
            <div className="usa-nav-container">
              <div className="usa-navbar">
                <Title>
                  <Link to="/">
                    <img className="usa-logo-img" src={logoImg} alt="Mito Logo"/>
                  </Link>
                </Title>
                <NavMenuButton onClick={onClick} label="Menu" />
              </div>
              <NavBar
                megaNav={megaNavBar}
                extendNav={extendHeader}
                searchBar={search}
                onClickNav={expanded} // Pass the onClick function as a prop
              />
            </div>
          )}
        </Grid>
      </USWDSHeader>
    </div>
  );
}
