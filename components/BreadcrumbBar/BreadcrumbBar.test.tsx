import { render } from "@testing-library/react";
import { Breadcrumb, BreadcrumbBar } from "./BreadcrumbBar";

describe("BreadcrumbBar", () => {
  it("renders w/o crash", () => {
    const path: Breadcrumb[] = [
      {
        label: "Home",
        to: "/",
      },
    ];

    const comp = render(<BreadcrumbBar path={path} />);

    expect(comp).toBeDefined();
  });
});
