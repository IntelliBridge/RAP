import React, { useState } from 'react';
import {
  Accordion, Button, Form, Label, TextInput, Grid,
} from "@trussworks/react-uswds";
import FilterChip from "./FilterChip";

interface AccordionItemProps {
  id: string;
  title: string;
  content: JSX.Element;
  expanded: boolean;
  headingLevel: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const FilterSideBar = () => {
  const [vendorName, setVendorName] = useState('');
  const [vendorChips, setVendorChips] = useState<string[]>([]);
  const [cageNumber, setCageNumber] = useState('');
  const [cageChips, setCageChips] = useState<string[]>([]);
  const [cityName, setCityName] = useState('');
  const [cityChips, setCityChips] = useState<string[]>([]);

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (vendorName && !vendorChips.includes(vendorName)) {
      setVendorChips([...vendorChips, vendorName]);
      setVendorName('');
    }
  };

  const handleAddCage = (e: React.FormEvent) => {
    e.preventDefault();
    if (cageNumber && !cageChips.includes(cageNumber)) {
      setCageChips([...cageChips, cageNumber]);
      setCageNumber('');
    }
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName && !cityChips.includes(cityName)) {
      setCityChips([...cityChips, cityName]);
      setCityName('');
    }
  };

  const handleClearAllVendors = () => {
    setVendorChips([]);
  };

  const handleClearAllCages = () => {
    setCageChips([]);
  };

  const handleClearAllLocations = () => {
    setCityChips([]);
  };

  const handleRemoveVendorChip = (chipName: string) => {
    setVendorChips(vendorChips.filter(chip => chip !== chipName));
  };

  const handleRemoveCageChip = (chipName: string) => {
    setCageChips(cageChips.filter(chip => chip !== chipName));
  };

  const handleRemoveLocationChip = (chipName: string) => {
    setCityChips(cityChips.filter(chip => chip !== chipName));
  };

  const accordionItems: AccordionItemProps[] = [
    {
      id: 'section1',
      title: 'Vendor Name',
      content: (
        <Form className="vendor-search" onSubmit={handleAddVendor}>
          <Label htmlFor="search">
            Add Vendor Name
          </Label>
          <TextInput
            id="search"
            name="search"
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />
          <Grid gap={2} row>
            {vendorChips.map((chip, index) => (
              <FilterChip 
                key={index} 
                name={chip} 
                onRemove={() => handleRemoveVendorChip(chip)} 
              />
            ))}
            {vendorChips.length > 0 && (
              <FilterChip 
                name="Clear all" 
                unstyled 
                onRemove={handleClearAllVendors} 
              />
            )}
          </Grid>

          <Button className="full-width" type="submit">Apply</Button>
        </Form>
      ),
      expanded: true,
      headingLevel: 'h3'
    },
    {
      id: 'section2',
      title: 'CAGE / NCAGE',
      content: (
        <Form className="vendor-search" onSubmit={handleAddCage}>
          <Label htmlFor="cage">
            2, 4, 5, or 6 digit code
          </Label>
          <TextInput
            id="cage-search"
            name="cage search"
            type="text"
            value={cageNumber}
            onChange={(e) => setCageNumber(e.target.value)}
          />
          <Grid gap={2} row>
            {cageChips.map((chip, index) => (
              <FilterChip 
                key={index} 
                name={chip} 
                onRemove={() => handleRemoveCageChip(chip)} 
              />
            ))}
            {cageChips.length > 0 && (
              <FilterChip 
                name="Clear all" 
                unstyled 
                onRemove={handleClearAllCages} 
              />
            )}
          </Grid>
          <Button className="full-width" type="submit">Apply</Button>
        </Form>
      ),
      expanded: false,
      headingLevel: 'h3'
    },
    {
      id: 'section3',
      title: 'Location',
      content: (
        <Form className="vendor-search" onSubmit={handleAddLocation}>
          <Label htmlFor="search">
            City
          </Label>
          <TextInput
            id="search"
            name="search"
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <Grid gap={2} row>
            {cityChips.map((chip, index) => (
              <FilterChip 
                key={index} 
                name={chip} 
                onRemove={() => handleRemoveLocationChip(chip)} 
              />
            ))}
            {cityChips.length > 0 && (
              <FilterChip 
                name="Clear all" 
                unstyled 
                onRemove={handleClearAllLocations} 
              />
            )}
          </Grid>
          <Button className="full-width" type="submit">Apply</Button>
        </Form>
      ),
      expanded: false,
      headingLevel: 'h3'
    }
  ];

  return (
    <Accordion multiselectable bordered items={accordionItems} className='vendor-filters' />
  );
};

export default FilterSideBar;
