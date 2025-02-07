import { render } from "@testing-library/react";
import PageTemplate from "./PageTemplate";
import { BreadcrumbBar } from "../components/BreadcrumbBar/BreadcrumbBar";

describe("PageTemplate", () => {
  it("renders w/o crash", () => {
    const comp = render(<PageTemplate />);

    expect(comp).toBeDefined();
  });

  it("renders with mainContent and breadcrumbPath defined", () => {
    const mainContent = <div>Main Content</div>;
    const breadcrumbPath = [
      { label: "Home", to: "/" },
      { label: "Users", to: "/users" },
      { label: `Detail Page` },
    ];
    const comp = render(
      <PageTemplate mainContent={mainContent} breadcrumbPath={breadcrumbPath} />
    );

    expect(comp).toBeDefined();
  });

  it("renders with mainContent, breadcrumbPath, and breadcrumb defined", () => {
    const mainContent = <div>Main Content</div>;
    const breadcrumbPath = [
      { label: "Home", to: "/" },
      { label: "Users", to: "/users" },
      { label: `Detail Page` },
    ];
    const breadcrumb = <BreadcrumbBar path={breadcrumbPath} />;
    const leftSideContent = ["test 1", "test 2"];
    const rightSideContent = ["test 3", "test 4"];

    const comp = render(
      <PageTemplate
        mainContent={mainContent}
        breadcrumbPath={breadcrumbPath}
        breadcrumb={breadcrumb}
        leftSideContent={leftSideContent}
        rightSideContent={rightSideContent}
      />
    );

    expect(comp).toBeDefined();
  });
});
