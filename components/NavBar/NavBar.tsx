import React, { useState, useEffect } from "react";
// import { AuthContext } from "../../src/pages/signIn/AuthContext";
import {
  PrimaryNav,
  MegaMenu,
  NavDropDownButton,
  ExtendedNav,
  Menu,
  Search,
} from "@trussworks/react-uswds";
import { Link, useLocation } from "react-router-dom";
import { SignOut } from "../../src/pages/SignOut";
import navData from "./navlinkmega.json";
import { globalSearch } from "../Header/headerSearchUtils";
// import secondaryNavData from "./secondaryNav.json";
import './navBar.scss'

interface NavProps {
  megaNav?: boolean;
  searchBar?: boolean;
  extendNav?: boolean;
  onClickNav: boolean;
}
interface NavItem {
  label: string;
  url: string;
}
const onToggle = (
  index: number,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>
): void => {
  setIsOpen((prevIsOpen) => {
    const newIsOpen = [false, false];
    newIsOpen[index] = !prevIsOpen[index];
    return newIsOpen;
  });
};

export default function NavBar({
  megaNav = false,
  searchBar = true,
  extendNav = true,
  onClickNav = false,
}: NavProps) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const pathname = location?.pathname?.split("/")[1];
  const [isOpen, setIsOpen] = useState([false, false]);
  const navMenuItems = [];
  const onClick = (): void => setExpanded((prevExpanded) => !prevExpanded);
  let signOutComponent = <SignOut />;
  
  useEffect(() => {
    if (onClickNav) {
      onClick();
    }
  }, [onClickNav]);

  for (const [index, [navLabel, group]] of Object.entries(navData).entries()) {
    let menuContent = [];
    let builtLink;

    if (typeof group === "object" && group !== null) {
      for (const [_parent, child] of Object.entries(group)) {
        let megaMenuItems = [];
        if (typeof child === "object" && child !== null) {
          for (const title in child) {
            megaMenuItems.push(
              <Link key={title} to={(child as Record<string, string>)[title]} className={`${"/" + pathname?.toLowerCase() === `${(child as Record<string, string>)[title]?.toLowerCase()}` ? "active-" : ""}nav-link`}>
                {title}
              </Link>
            );
          }
        } else {
          megaMenuItems.push(
            <Link key={_parent} to={child as string} className={`${"/" + pathname?.toLowerCase() === `${(child as string)?.toLowerCase()}` ? "active-" : ""}nav-link`}>
              {_parent}
            </Link>
          );
        }
        megaMenuItems.push(signOutComponent);
        menuContent.push(megaMenuItems);
      }
      builtLink = [
        <React.Fragment key={index}>
          <NavDropDownButton
            onToggle={(): void => {
              onToggle(index, setIsOpen);
            }}
            menuId={"dropdown" + index}
            isOpen={isOpen[index]}
            label={navLabel}
          />
          <div id={"dropdown" + index}>
            {megaNav ? (
              <MegaMenu key={index} items={menuContent} isOpen={isOpen[index]} />
            ) : (
              <Menu key={"dropdown" + index} items={menuContent} isOpen={isOpen[index]} />
            )}
          </div>
        </React.Fragment>,
      ];
      navMenuItems.push(builtLink);
    } else {
      navMenuItems.push(
        <Link key={navLabel} to={group} className={`${"/" + pathname?.toLowerCase() === `${group?.toLowerCase()}` ? "active-" : ""}nav-link`}>
          {navLabel}
        </Link>
      );
    }
  }
  if (localStorage.getItem('user')) {
    navMenuItems.push(signOutComponent);
  }
  // Convert NavItem[] to ReactNode[]
  const renderSecondaryNavItems = (items: NavItem[]): React.ReactNode[] => {
    return items.map((item) => (
      <Link key={item.label} to={item.url} className={`${"/" + pathname?.toLowerCase() === `${item?.url?.toLowerCase()}` ? "active-" : ""}nav-link`}>
        {item.label}
      </Link>
    ));
  };

  const secondaryNavItems: NavItem[] = [];

  // for (const [_parent, child] of Object.entries(secondaryNavData)) {
  //   secondaryNavItems.push(
  //     <Link key={_parent} to={child} className={`${"/" + pathname?.toLowerCase() === `${child?.toLowerCase()}` ? "active-" : ""}nav-link`}>
  //       {_parent}
  //     </Link>
  //   );
  // }

  // if (!extendNav) {
  //   navMenuItems.push(
  //     <React.Fragment key="signOut">{signOutComponent}</React.Fragment>
  //   );
  // } else {
  //   secondaryNavItems.push(
  //     <React.Fragment key="signOut">{signOutComponent}</React.Fragment>
  //   );
  // }

  return (
    <>
      <div className={`usa-overlay ${expanded ? "is-visible" : ""}`}></div>
      {extendNav ? (
        <ExtendedNav
          primaryItems={navMenuItems}
          secondaryItems={renderSecondaryNavItems(secondaryNavItems)}
          mobileExpanded={expanded}
          onToggleMobileNav={onClick}
        >
          {searchBar && <Search size="small" onSubmit={globalSearch} />}
        </ExtendedNav>
      ) : (
        <>
          <PrimaryNav
            items={navMenuItems}
            mobileExpanded={expanded}
            onToggleMobileNav={onClick}
          >
            {searchBar && <Search size="small" onSubmit={globalSearch} />}
          </PrimaryNav>
        </>
      )}
    </>
  );
}
