import { useEffect } from "react";
import PageTemplate from "../../../layouts/PageTemplate";
import "./Home.scss";

import { Grid, GridContainer } from "@trussworks/react-uswds";

// type User
// Type = number;

export default function Home() {
  useEffect(() => {
    document.title = "Mito | Home";
  }, []);

  const defaultContent = (
    <div className="homepage-content">
      <GridContainer containerSize="widescreen">
        <Grid gap={2} row>
          <Grid col={6}>
            <h1 className="usa-prose-h1">Page Title</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <ul>
              <li>Nulla risus vulputate ullamcorper sagittis condimentum vitae.</li>
              <li>Ultrices ornare ac quam non tempor. Turpis purus quis non pellentesque.</li>
              <li>Amet varius et sit mauris vitae feugiat.</li>
            </ul>
          </Grid>
          <Grid col={6}>
            <img src="/img/homepage/usa-media-block__img.png" alt="Man with a smile that makes his eyes squint with a background of a tile wall"></img>
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  );
  const leftContent = (
        <Grid gap={2} row>
          <Grid col={6}>
            <h1 className="usa-prose-h1">Page Title</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <ul>
              <li>Nulla risus vulputate ullamcorper sagittis condimentum vitae.</li>
              <li>Ultrices ornare ac quam non tempor. Turpis purus quis non pellentesque.</li>
              <li>Amet varius et sit mauris vitae feugiat.</li>
            </ul>
          </Grid>
          <Grid col={6}>
            <img src="/img/homepage/usa-media-block__img.png" alt="Man with a smile that makes his eyes squint with a background of a tile wall"></img>
          </Grid>
        </Grid>

  );
  return <PageTemplate leftSideContentSize={3} topLevelContent={'top level'} leftSideContent={leftContent} mainContent={defaultContent} />;
}
