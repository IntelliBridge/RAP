import React from "react";
import { Button, ButtonGroup } from "@trussworks/react-uswds";
import { useLocation } from "react-router-dom";
import "./PageTab.scss";

export default function PageTab() {
  const location = useLocation();

  const isOperation = location.pathname.includes("/operation");

  return (
    <>
        {isOperation ? (

        <div className="page-tab operation-page">
          <ButtonGroup type="segmented">
            <Button type="button">Overview</Button>
            <Button type="button" className="no-outline" outline>Communication</Button>
          </ButtonGroup>
        </div>
        ) : (
        <div className="page-tab">
          <ButtonGroup type="segmented">
            <Button type="button" outline className="no-outline">My Vendors</Button>
            <Button type="button">All Vendors</Button>
          </ButtonGroup>
          </div>
        )}
    </>
  );
}
