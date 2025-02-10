import { Grid, GridContainer } from "@trussworks/react-uswds";
import React, { ReactElement } from "react";
import { Breadcrumb, BreadcrumbBar } from "../components/BreadcrumbBar/BreadcrumbBar";
import CustomBreadcrumBar from '../components/Custom/CustomBreadcrumBar';

interface PageTemplateProps {
  topLevelContent?: React.ReactNode;
  leftSideContent?: React.ReactNode;
  mainContent?: React.ReactNode;
  rightSideContent?: React.ReactNode[]; // Specify that rightSideContent is an array of React nodes
  breadcrumb?: React.ReactNode | ReactElement;
  breadcrumbPath?: Breadcrumb[];
  leftSideContentSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Adjust the type to be within the range
  isDashboard?: boolean; // Add this prop to indicate if the page is the dashboard
  data?: Record<string, any>
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  topLevelContent,
  leftSideContent,
  mainContent,
  rightSideContent,
  breadcrumb,
  breadcrumbPath,
  leftSideContentSize = 2,
  isDashboard = false, // Set a default value for the new prop
  data = {},
}: PageTemplateProps): React.ReactElement => {
  type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Adjust the type to be within the range

  if (!breadcrumb && breadcrumbPath) {
    breadcrumb = <BreadcrumbBar path={breadcrumbPath} />;
  }

  const getMainContentColSize = (): ColumnSizes => {
    if (leftSideContent && rightSideContent) {
      return 6 as ColumnSizes;
    } else if (leftSideContent) {
      return (12 - leftSideContentSize) as ColumnSizes;
    } else if (rightSideContent) {
      return 10 as ColumnSizes;
    } else {
      return 12 as ColumnSizes;
    }
  };
  let pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
    {/* {pathnames.length > 1 && (<CustomBreadcrumBar data={data} />)} */}
      <main className="usa-section">
        {topLevelContent && (
          <GridContainer containerSize="widescreen" className="usa-top-level">
            <Grid>{topLevelContent}</Grid>
          </GridContainer>
        )}
        <GridContainer containerSize="widescreen">
          <Grid row gap>
            {leftSideContent && (
              <Grid className="usa-layout-docs__sidenav" desktop={{ col: leftSideContentSize }}>
                {leftSideContent}
              </Grid>
            )}

            <Grid
              className="usa-layout-docs__main usa-prose usa-layout-docs"
              id="main-content"
              desktop={{ col: getMainContentColSize() }}
            >
              {mainContent}
            </Grid>
            {rightSideContent && (
              <Grid className="usa-layout-docs__sidenav" desktop={{ col: 2 }}>
                {rightSideContent.map((element, index) => (
                  <React.Fragment key={index}>{element}</React.Fragment>
                ))}
              </Grid>
            )}
          </Grid>
        </GridContainer>
      </main>
    </>
  );
};

export default PageTemplate;
