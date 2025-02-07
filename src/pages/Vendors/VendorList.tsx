import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardIcon from "../../assets/icons/cardview.svg";
import ListIcon from "../../assets/icons/listviewsolid.svg";
import FavoriteOutline from "../../assets/icons/favorite_outline.svg";
import RightArrowIcon from "../../assets/icons/rightarrow.svg";
import { Link } from 'react-router-dom';
import {
  Button,
  Card, CardBody, CardFooter, CardGroup, CardHeader, CardMedia,
  Form, Label, TextInput, Select,
  Grid,
  Pagination,
} from "@trussworks/react-uswds";

type Vendor = {
  unique_id?: string | null;
  UEI: string | null;
  id: string | null;
  Name: string | null;
  Cage: string | null;
  NAICS: number | null;
  PSC: string | null;
  Last_Updated: string | null;
  Description: string | null;
  dba_name: string | null;
};

type VendorSearchProps = {
  toggleView: (view: 'list' | 'card') => void;
  activeIcon: string;
  isTableView: boolean;
  jsonData: Vendor[];
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VendorSearch: React.FC<VendorSearchProps> = ({ toggleView, activeIcon, isTableView, jsonData }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const initialPage = parseInt(query.get('page') || '1', 10);
  const initialItemsPerPage = parseInt(query.get('itemsPerPage') || '12', 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [paginatedData, setPaginatedData] = useState<Vendor[]>([]);

  const totalPages = Math.ceil(jsonData.length / itemsPerPage);

  const fetchPageData = (page: number, itemsPerPage: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setPaginatedData(jsonData.slice(start, end));
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> & { target: { dataset: { page: string }}}) => {
    const newPage = Number(event.target.dataset.page);
    if (!isNaN(newPage)) {
      setCurrentPage(newPage);
      navigate(`?page=${newPage}&itemsPerPage=${itemsPerPage}`);
    }
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page whenever items per page changes
    navigate(`?page=1&itemsPerPage=${newItemsPerPage}`);
  };

  useEffect(() => {
    fetchPageData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, jsonData]);

  useEffect(() => {
    const page = parseInt(query.get('page') || '1', 10);
    const itemsPerPage = parseInt(query.get('itemsPerPage') || '12', 10);
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  }, [query]);

  const getDisplayText = (name: string | null) => {
    if (!name) return 'N/A';
    const lowerName = name.toLowerCase().replace(/\s+/g, '');
    return lowerName.startsWith('the') ? lowerName.substring(3, 6) : lowerName.substring(0, 3);
  };

  return (
    <div className="vendors-content">
      <Form className="vendor-search" onSubmit={() => { console.log('search') }}>
        <Grid row gap>
          <Grid col={9}>
            <Label htmlFor="search">
              Search
            </Label>
            <TextInput id="search" name="search" type="text" />
          </Grid>
          <Grid col={2}>
            <Select id="filter-search" name="search-vendor">
              <option>- Select -</option>
              <option value="AZ">A - Z</option>
              <option value="ZA">Z - A</option>
              <option value="">Recently Added</option>
              <option value="AR">Last Accessed</option>
            </Select>
          </Grid>
          <Grid col={1}>
            <Button type="button">Search</Button>
          </Grid>
        </Grid>
      </Form>
      <Grid row gap>
        <Grid col={10}>
          <p><strong>Showing: {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, jsonData.length)} of {jsonData.length} results</strong> for "Vendors"</p>
        </Grid>
        <Grid col={2} className="search-filters">
          <Label htmlFor="view">
            View:
          </Label>
          <Select id="view-select" name="view-select" onChange={handleItemsPerPageChange} value={itemsPerPage}>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </Select>
          <img
            src={CardIcon} alt="Change to Card View"
            onClick={() => toggleView('card')}
            style={{ cursor: activeIcon === 'card' ? 'not-allowed' : 'pointer', opacity: activeIcon === 'card' ? 1 : 0.5 }}
            aria-label="Card View"
          />
          <img
            src={ListIcon} alt="Change to List View"
            onClick={() => toggleView('list')}
            style={{ cursor: activeIcon === 'list' ? 'not-allowed' : 'pointer', opacity: activeIcon === 'list' ? 1 : 0.5 }}
            aria-label="List View"
          />
        </Grid>
      </Grid>
      {isTableView ? (
        <>
          {paginatedData.map((item, index) => (
            <Grid row gap key={index} className="list-view">
              <Grid col={11} className="vendor-info">
                <strong>{item.Name}</strong>
                <p className="truncate">
                  {item.Description}
                </p>
              </Grid>
              <Grid col={1} className="list-icons">
                <div className="usa-list-favorite"><img src={FavoriteOutline} alt="favorite button" /></div>
                <Link to={`/vendors/${item.id}`}>
                  <Button type="button" outline>
                    <img src={RightArrowIcon} alt="Right Arrow to go to page" />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          ))}
        </>
      ) : (
        <CardGroup>
          {paginatedData.map((item, index) => (
            <Card key={index} gridLayout={{ tablet: { col: 3 } }} containerProps={{ className: "" }}>
              <CardMedia>
                <div className="usa-card-favorite"><img src={FavoriteOutline} alt="favorite button" /></div>
                <div className="usa-img_text">{getDisplayText(item.Name)}</div>
              </CardMedia>
              <CardHeader>
                <h3 className="usa-card__heading">{item.Name}</h3>
              </CardHeader>
              <CardBody>
                <p className="truncate">
                  {item.Description}
                </p>
              </CardBody>
              <CardFooter>
                <Link to={`/vendors/${item.id}`}>
                  <Button type="button" outline>
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </CardGroup>
      )}
      <Pagination
        pathname={""}
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={(e) => handlePageChange(e as any)}
      />
    </div>
  );
};

export default VendorSearch;
