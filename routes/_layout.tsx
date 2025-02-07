import { GovBanner } from "@trussworks/react-uswds";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import "../components/styles/index.scss";
// import Settings from "../components/assets/icons/settings.svg";

interface HeaderOptions {
  [key: string]: boolean;
}

export default function Layout() {
  // const [showHeaderControls, setShowHeaderControls] = useState(false);
  const [headerOptions] = useState<HeaderOptions>({
    extendHeader: false,
    search: true,
    megaNavBar: false,
  });

  const [footerSize] = useState("slim");

  // const handleOptionChange = (option: string) => {
  //   setHeaderOptions((prevOptions) => ({
  //     ...prevOptions,
  //     [option]: !prevOptions[option],
  //   }));
  // };

  // const handleFooterSizeChange = (size: string) => {
  //   setFooterSize(size);
  // };

  return (
    <div id="app">
      <Loading />
      
      <GovBanner />
      <Header
        extendHeader={headerOptions.extendHeader}
        search={headerOptions.search}
        megaNavBar={headerOptions.megaNavBar}
      />
        <Outlet />
      <Footer footerFormat={footerSize} />
    </div>
  );
}
