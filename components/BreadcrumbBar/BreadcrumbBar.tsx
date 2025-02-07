import { Breadcrumb, BreadcrumbLink, BreadcrumbBar as USWDSBreadcrumbBar } from "@trussworks/react-uswds";
import './Breadcrumb.scss';

export interface Breadcrumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  path: Breadcrumb[];
}

export function BreadcrumbBar({ path }: BreadcrumbsProps) {
  const rdfaMetadata = {
    ol: {
      vocab: "http://schema.org/",
      typeof: "BreadcrumbList",
    },
    li: {
      property: "itemListElement",
      typeof: "ListItem",
    },
    a: {
      property: "item",
      typeof: "WebPage",
    },
  };

  const breadcrumbs = path.map(({ to, label }, index) => {
    const current = index === path.length - 1;
    const position = String(index + 1);
    const key = `${label}-${position}`;
    if (to) {
      return (
        <Breadcrumb key={key} {...rdfaMetadata.li}>
          <BreadcrumbLink href={to} {...rdfaMetadata.a}>
            {}
            <span property="name">{label}</span>
          </BreadcrumbLink>
          <meta property="position" content={position} />
        </Breadcrumb>
      );
    } else {
      return (
        <Breadcrumb key={key} current={current} {...rdfaMetadata.li}>
          {}
          <span property="name">{label}</span>
          <meta property="position" content={position} />
        </Breadcrumb>
      );
    }
  });

  return (
    <div className="breadcrumb-bar-component">
      <div className="grid-container">
      <USWDSBreadcrumbBar listProps={{ ...rdfaMetadata.ol }} children={breadcrumbs} />
      </div>
    </div>
  );
}
