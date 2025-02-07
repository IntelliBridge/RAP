import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
} from "@trussworks/react-uswds";
import { Link } from 'react-router-dom';
import AirforceIcon from "./icons/airforce.svg";
import MarineIcon from "./icons/marines.svg";
import NavyIcon from "./icons/navy.svg";
import "./styles.scss";

interface OrganizationCardsProps {
  data: {
    organization_name: string;
    primary_contact: {
      first_name: string;
      last_name: string;
      telephone: string;
      email: string;
    };
  };
  label: string;
}

const OrganizationCards: React.FC<OrganizationCardsProps> = ({ data, label }) => {
  if (!data) {
    return null; // Do not render the component if data is not available
  }

  let iconURL;
  switch (label) {
    case "airforce":
      iconURL = AirforceIcon;
      break;
    case "navy":
      iconURL = NavyIcon;
      break;
    case "marines":
      iconURL = MarineIcon;
      break;
    default:
      iconURL = ""; // Provide a default icon or handle the default case appropriately
  }

  return (
    <Card containerProps={{ className: label }}>
      <CardMedia>
        <img alt={`${data.organization_name} logo`} src={iconURL} />
      </CardMedia>
      <CardHeader>
        <h3 className="usa-card__heading">{data.organization_name}</h3>
      </CardHeader>
      <CardBody>
        <p className="truncate">
          <strong>{data.primary_contact.first_name} {data.primary_contact.last_name}</strong> <br />
          {data.primary_contact.telephone} <br />
          {data.primary_contact.email}
        </p>
      </CardBody>
      <CardFooter>
        <Link to="">
          <Button type="button" outline>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default OrganizationCards;
