import React, { useState, useEffect } from 'react';
import { Grid } from "@trussworks/react-uswds";
import '../../../components/styles/index.scss';
import DOMPurify from 'dompurify';
import FileType from '../../../components/FormElements/FileType/FileType';
import OperationNoteForm from './Forms/Notes';
import OperationNotes from './OperationNotes';
import {Operation} from "./types";

import Config from '../../config';
const { endpoints } = Config();

// Helper function to format dates
const formatDate = (dateString: string | null): string => {
  if (!dateString) {
    return 'N/A'; // or any default value you prefer
  }
  if (dateString.length === 4) {
    // Handle 4-digit date strings (MMDD)
    const month = parseInt(dateString.substring(0, 2), 10) - 1;
    const day = parseInt(dateString.substring(2, 4), 10);
    const date = new Date();
    date.setMonth(month, day);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } else {
    // Handle other date strings (assuming they are in the format YYYYMMDD)
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1;
    const day = parseInt(dateString.substring(6, 8), 10);
    const date = new Date(year, month, day);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};


// Main Operation Detail component
const OperationDetailMain: React.FC<{ operationData: Operation }> = ({ operationData }) => {
  const [operationNotes, setOperationNotes] = useState<any[]>([]);
  const refreshOperationNotes = async () => {
    try {
      const response = await fetch(`${endpoints["operation-notes"]}?submission_id=${operationData.submission_id}`);
      const data = await response.json();
      setOperationNotes(data);
    } catch (error) {
      console.error('Error fetching vendor notes:', error);
    }
  };

  useEffect(() => {
    refreshOperationNotes();
  }, [operationData.submission_id]);

  
  return (
    <div className="overview-content">
      <h2>Operation Details</h2>

      <Grid row gap>
        <Grid col={5}>
          <div className="label">POP (Period of Performance)</div>
          <Grid row gap>
            <Grid col={5}>
              <div className="sub-label">Start Date</div>
              <div className="value">
                {formatDate(operationData.pop.start)}
              </div>
            </Grid>
            <Grid col={5}>
              <div className="sub-label">End Date</div>
              <div className="value">
                {formatDate(operationData.pop.end)}
              </div>
            </Grid>
        </Grid>

        </Grid>
        <Grid col={4}>
          <div className="label">Location of Operation</div>
          <div className="sub-label">City/State/Country</div>
          <div className="value">
            {operationData.operation_location.city}, {operationData.operation_location.state} {operationData.operation_location.zip} {operationData.operation_location.country}
          </div>
        </Grid>
      </Grid>
      <div className="usa-section-label">Addtional Information</div>
      <div
        className="additional-info-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(operationData.additional_information.content) }}
      />
      <div className="usa-section-label">Attachments</div>
      {operationData.files.length > 0 ? (
        <div className="files">
          {operationData.files.map((fileInfo: any, index: number) => (
            <div className="file" key={index}>
              <FileType fileName={fileInfo.name} size={fileInfo.size} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    <OperationNotes operationID={operationData.submission_id ?? ''} operationNotes={operationNotes} />
    <OperationNoteForm operationID={operationData.submission_id ?? ''} refreshOperationNotes={refreshOperationNotes}/>
    </div>

  );
};

export default OperationDetailMain;
