import { useEffect, useState, useRef } from 'react';
import PageTemplate from '../../../layouts/PageTemplate';
import './Vendors.scss';
import VendorSearch from './VendorList';
import FilterSideBar from './FilterSideBar';

import {
  ButtonGroup,
  Grid,
  Modal,
  ModalToggleButton,
  ModalHeading,
  ModalFooter,
  ModalRef,
} from '@trussworks/react-uswds';

type Vendor = {
  UEI: string | null;
  id: string | null;
  Name: string | null;
  Cage: string | null;
  NAICS: number | null;
  PSC: string | null;
  Last_Updated: string | null;
  Description: string | null;
  dba_name: string | null;
  physical_address: {
    line_1: string | null;
    line_2: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    country: string | null;
  };
  mailing_address: {
    line_1: string | null;
    line_2: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    country: string | null;
  };
  POC: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
};

const transformData = (data: any[]): Vendor[] => {
  return data.map(item => ({
    UEI: item.UEI || null,
    id: item.id || null,
    Name: item.Name || null,
    Cage: item.Cage || null,
    NAICS: item.Naics || null,
    PSC: item.PSC || null,
    Last_Updated: item.Last_Update || null,
    Description: item.Description || null,
    dba_name: item.dba_name || null,
    physical_address: {
      line_1: item.physical_address?.line_1 || null,
      line_2: item.physical_address?.line_2 || null,
      city: item.physical_address?.city || null,
      state: item.physical_address?.state || null,
      zip_code: item.physical_address?.zip_code || null,
      country: item.physical_address?.country || null,
    },
    mailing_address: {
      line_1: item.mailing_address?.line_1 || null,
      line_2: item.mailing_address?.line_2 || null,
      city: item.mailing_address?.city || null,
      state: item.mailing_address?.state || null,
      zip_code: item.mailing_address?.zip_code || null,
      country: item.mailing_address?.country || null,
    },
    POC: {
      name: item.POC?.name || null,
      email: item.POC?.email || null,
      phone: item.POC?.phone || null,
    }
  }));
};

const Vendors = () => {
  const [jsonData, setJsonData] = useState<Vendor[]>([]);
  const modalRef = useRef<ModalRef>(null);
  const [isTableView, setIsTableView] = useState(false);
  const [activeIcon, setActiveIcon] = useState('list');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_JSON_SERVER}/vendors`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const transformedData = transformData(data); // Transforming fetched data
        setJsonData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, []);

  const toggleView = (view: 'list' | 'card') => {
    setIsTableView(view === 'list');
    setActiveIcon(view);
  };

  useEffect(() => {
    document.title = 'Mito | Vendors';
  }, []);

  const topLevel = (
    <div className="top-level-container">
      <h1>Vendors</h1>
      <ModalToggleButton modalRef={modalRef} outline opener>
        Add a Vendor
      </ModalToggleButton>
      <Modal
        ref={modalRef}
        id="example-modal-1"
        aria-labelledby="modal-1-heading"
        aria-describedby="modal-1-description"
        placeholder="Modal Placeholder"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <ModalHeading id="modal-1-heading">
          Are you sure you need to add a vendor?
        </ModalHeading>
        <div className="usa-prose">
          <p id="modal-1-description">
            Ensure new vendor is not in the Vendor WIKI before adding.
          </p>
        </div>
        <ModalFooter>
          <ButtonGroup>
            <ModalToggleButton modalRef={modalRef} closer>
              Add a Vendor
            </ModalToggleButton>
            <ModalToggleButton
              modalRef={modalRef}
              closer
              unstyled
              className="padding-105 text-center"
            >
              Cancel
            </ModalToggleButton>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </div>
  );

  const leftContent = (
    <Grid row>
      <div className="usa-section-title">Filter By</div>
      <FilterSideBar></FilterSideBar>
    </Grid>
  );
  return (
    <PageTemplate
      topLevelContent={topLevel}
      leftSideContentSize={2}
      leftSideContent={leftContent}
      mainContent={
        <VendorSearch
          toggleView={toggleView}
          activeIcon={activeIcon}
          isTableView={isTableView}
          jsonData={jsonData}
        />
      }
    />
  );
};

export default Vendors;
