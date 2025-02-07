import { useState, useEffect } from 'react';
import { Grid, Table } from "@trussworks/react-uswds";
import '../../../components/styles/index.scss';
import MixedChart from '../../../components/MixGraph/MixGraph';
import VendorNotes from './VendorNotes';
import VendorNoteForm from './Forms/Notes';
import Config from '../../config.js';

const { endpoints } = Config();

type Vendor = {
  UEI: string;
  registration_dates: {
    activation_date: number | null;
    submission_date: number | null;
    initial_registration_date: number | null;
  };
  entity_dates: {
    entity_start_date: number | null;
    fiscal_year_end_close_date: number | null;
  };
};

type TransactionsData = {
  year: string;
  all_transactions: number;
  new_awards: number;
};

type FundsByState = {
  UEI: string;
  us_state: string;
  funding_for_year: number;
  percent_of_total: number;
};

type VendorClassification = {
  UEI: string;
  us_state: string;
  is_primary_naics: boolean;
  naics_code: string;
};

const formatInMillions = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat().format(value);
};

const formatToPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

const timestamp2String = (timestamp: number | null): string => {
  if (!timestamp) {
    return '';
  }
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const formatDate = timestamp2String;

const VendorOverview = ({ vendor }: { vendor: Vendor }) => {
  const [vendorNotes, setVendorNotes] = useState<any[]>([]);
  const [vendorTransactions, setVendorTransactions] = useState<TransactionsData[]>([]);
  const [vendorFundsbyState, setVendorFundsbyState] = useState<FundsByState[]>([]);
  const [vendorClassification, setVendorClassification] = useState<VendorClassification[]>([]);

  const header = ['Fiscal Year', 'All Transactions', 'New Awards'];
  const data = vendorTransactions.map(
    ({ year, new_awards, all_transactions }) => [String(year), all_transactions, new_awards]
  );

  const graphData: any[][] = [header, ...data];

  const refreshVendorNotes = async () => {
    try {
      const response = await fetch(`${endpoints['vendor_overview_notes']}/?UEI=${vendor.UEI}`);
      const data = await response.json();
      setVendorNotes(data);
    } catch (error) {
      console.error('Error fetching vendor notes:', error);
    }
  };

  const fetchVendorTransactions = async () => {
    try {
      const response = await fetch(`${endpoints.transactions}/?UEI=${vendor.UEI}`);
      const data = await response.json();
      setVendorTransactions(data);
    } catch (error) {
      console.error('Error fetching vendor notes:', error);
    }
  };

  const fetchVendorFundsbyState = async () => {
    try {
      const response = await fetch(`${endpoints['vendor-funds-by-state']}`);
      const data = await response.json();
      const filteredData = data.filter((item: FundsByState) => item.UEI === vendor.UEI);
      setVendorFundsbyState(filteredData);
    } catch (error) {
      console.error('Error fetching vendor funds by state:', error);
    }
  };

  const fetchVendorClassification = async () => {
    try {
      const response = await fetch(`${endpoints['vendor_classifications']}`);
      const data = await response.json();
      const filteredData = data.filter((item: VendorClassification) => item.UEI === vendor.UEI);
      setVendorClassification(filteredData);
    } catch (error) {
      console.error('Error fetching vendor classifications:', error);
    }
  };

  useEffect(() => {
    refreshVendorNotes();
    fetchVendorTransactions();
    fetchVendorFundsbyState();
    fetchVendorClassification();
  }, [vendor.UEI]);

  return (
    <div className="overview-content">
      <h2>Overview</h2>

      {/* Registration Dates Section */}
      <div className="usa-section-label">Registration Dates</div>
      <Grid row gap>
        <Grid col={4}>
          <div className="label">Activation Date</div>
          <div className="value">
            {formatDate(vendor.registration_dates.activation_date)}
          </div>
        </Grid>
        <Grid col={4}>
          <div className="label">Submission Date</div>
          <div className="value">
            {formatDate(vendor.registration_dates.submission_date)}
          </div>
        </Grid>
        <Grid col={4}>
          <div className="label">Initial Registration Date</div>
          <div className="value">
            {formatDate(vendor.registration_dates.initial_registration_date)}
          </div>
        </Grid>
      </Grid>

      {/* Entity Dates Section */}
      <div className="usa-section-label">Entity Dates</div>
      <Grid row gap>
        <Grid col={4}>
          <div className="label">Entity Start Date</div>
          <div className="value">
            {formatDate(vendor.entity_dates.entity_start_date)}
          </div>
        </Grid>
        <Grid col={4}>
          <div className="label">Fiscal Year End Close Date</div>
          <div className="value">
            {formatDate(vendor.entity_dates.fiscal_year_end_close_date)}
          </div>
        </Grid>
      </Grid>

      {/* Transactions Over Time Section */}
      {graphData.length > 1 && (
        <>
        <Grid>
          <div className="usa-section-label">Transactions Over Time</div>
          <div className="usa-section-description">
            This graph shows trends by fiscal years over time for all transactions in dollars to this recipient (blue bars) and the number of new awards (orange line).
          </div>
          <MixedChart graphData={graphData} />
        </Grid>

        <div className="usa-section-label">U.S. States or Territories</div>
        <Table bordered fullWidth>
          <thead>
            <tr>
              <td><strong>Name</strong></td>
              <td><strong>Award</strong></td>
              <td><strong>% of Total</strong></td>
            </tr>
          </thead>
          <tbody>
            {vendorFundsbyState.map((row, index) => (
              <tr key={index}>
                <td>{row.us_state}</td>
                <td>${formatInMillions(row.funding_for_year)}</td>
                <td>{formatToPercentage(row.percent_of_total)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
      )}
      

      <div className="usa-section-label">Service Classifications</div>
      <Table bordered fullWidth>
        <thead>
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>Primary</strong></td>
            <td><strong>NAICS Codes</strong></td>
          </tr>
        </thead>
        <tbody>
          {vendorClassification.map((row, index) => (
            <tr key={index}>
              <td>{row.us_state}</td>
              <td>{row.is_primary_naics ? 'Yes' : 'No'}</td>
              <td>{row.naics_code}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <VendorNotes vendorID={vendor.UEI ?? ''} vendorNotes={vendorNotes} />
      <VendorNoteForm vendorID={vendor.UEI ?? ''} refreshVendorNotes={refreshVendorNotes} />
    </div>
  );
};

export default VendorOverview;
