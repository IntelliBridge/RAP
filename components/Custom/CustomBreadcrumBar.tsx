import "./CustomBreadcrum.scss";
import { useLocation, Link, useParams } from "react-router-dom";
import rightArrowIcon from "../../components/assets/icons/right-carrot-gray.svg";
import React from "react";

const routeNameMap = {
  dashboard: "Dashboard",
  operations: "Operations",
  vendors: "Vendors",
  add: {
    operations: "Create Operation",
    vendors: "Add Vendor",
  },
};

interface BreadcrumbBarProps {
  data: Record<string, any>;
}

const CustomBreadcrumBar: React.FC<BreadcrumbBarProps> = ({
  data = {},
}: BreadcrumbBarProps): React.ReactElement => {
  const location = useLocation();
  const { id } = useParams();

  console.log("data => ", data);

  let pathnames = location.pathname.split("/").filter((x) => x);

  const includeDashboard = pathnames[0] == "operations";

  const getName = (segment: string, parentSegment: string) => {
    if (
      segment == "add" &&
      routeNameMap[segment] &&
      routeNameMap[segment][parentSegment]
    ) {
      return routeNameMap[segment][parentSegment];
    }
    return (
      routeNameMap[segment] ||
      segment?.charAt(0)?.toUpperCase() + segment?.slice(1)
    );
  };

  const isOperationPage = pathnames[0] === "operations";
  const isVendorPage = pathnames[0] === "vendors";

  return (
    <div className="breadcrum-container">
      <div className="crums">
        {isOperationPage && (
          <>
            <p className="crum">
              <Link to="/">Dashboard</Link>
            </p>
            <div className="right-icon">
              <img src={rightArrowIcon} alt="right-arrow" />
            </div>
            <p className="crum">Operations</p>
            {data?.operation && (
              <>
                <div className="right-icon">
                  <img src={rightArrowIcon} alt="right-arrow" />
                </div>
                <p className="active-crum">{data?.operation?.operation_name}</p>
              </>
            )}
          </>
        )}

        {isVendorPage && (
          <>
            <p className="crum">
              <Link to="/vendors">Vendors</Link>
            </p>
            {data?.vendor && (
              <>
                <div className="right-icon">
                  <img src={rightArrowIcon} alt="right-arrow" />
                </div>
                <p className="active-crum">{data?.vendor?.Name}</p>
              </>
            )}
          </>
        )}

        {(!isOperationPage && !isVendorPage) &&
          pathnames?.map((value, index) => {
            const to = `/${pathnames?.slice(0, index + 1).join("/")}`;
            const isLast = index == pathnames?.length - 1;
            const parentSegment = pathnames[index - 1];
            let name = getName(value, parentSegment);
            return (
              <React.Fragment key={to}>
                {(index > 0 || includeDashboard) && (
                  <div className="right-icon">
                    <img src={rightArrowIcon} alt="right-arrow" />
                  </div>
                )}
                {value == "operations" ? (
                  <p className="crum">{name}</p>
                ) : isLast ? (
                  <p className="active-crum">{name}</p>
                ) : (
                  <p className="crum">
                    <Link to={to}>{name}</Link>
                  </p>
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default CustomBreadcrumBar;
