import React, { useState, useEffect } from 'react';
import FileType from '../../../components/FormElements/FileType/FileType';
import DOMPurify from 'dompurify';
import './Notes.scss';
import { Icon, Select } from "@trussworks/react-uswds";

// Helper function to format date and time
function formatDateTime(input: string): string {
  const datePart = input.slice(0, 8);
  const timePart = input.slice(9);
  const year = datePart.slice(0, 4);
  const month = datePart.slice(4, 6);
  const day = datePart.slice(6, 8);
  const hour = timePart.padStart(4, '0').slice(0, 2);
  const minute = timePart.padStart(4, '0').slice(2);
  const formattedDateTime = `${month}/${day}/${year} ${hour}:${minute}`;
  return formattedDateTime;
}

// Define the prop types for the OperationNotes component
interface OperationNotesProps {
  operationID: string;
  operationNotes: any[];
}

const userRoles: { [key: string]: string } = {
  '0': "Top Secret",
  '1': "Secret",
  '2': "Unclassified",
  '3': "User",
  '4': "Guest"
};

const OperationNotes: React.FC<OperationNotesProps> = ({ operationNotes }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('user-role') || '0');

  // Effect to sync userRole state with localStorage
  useEffect(() => {
    localStorage.setItem('user-role', userRole);
  }, [userRole]);

  // Handle select change
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(event.target.value);
  };

  const clearanceName = {
    0: { "name": "Top Secret", "class": "top-secret", "label": "TS//SI/REL TO USA, FVEY" },
    1: { "name": "Secret", "class": "secret", "label": "S//SI/REL TO USA, FVEY" },
    2: { "name": "Unclassified", "class": "unclassified", "label": "U" }
  };

  return (
    <>
    <div className="operation-overview-notes-container">
      <div className="role-selector">
        <Select id="user-role" name="user-role-selector" value={userRole} onChange={handleRoleChange}>
          <option value="">- Select -</option>
          <option value="0">Top Secret</option>
          <option value="1">Secret</option>
          <option value="2">Unclassified</option>
        </Select>
      </div>
      <div className="notes-section-title">Notes</div>

      {operationNotes.map((note: any, index: number) => {
        const noteClearanceLevel = parseInt(note.clearance_level, 10);
        // Determine if the note should be displayed based on user role and note's clearance level
        const shouldDisplayNote = userRole === '0' || // Top Secret user sees all notes
          (userRole === '1' && noteClearanceLevel >= 1) || // Secret user sees only Secret and Unclassified
          (userRole === '2' && noteClearanceLevel === 2); // Unclassified user sees only Unclassified

        return shouldDisplayNote ? (
          <div className="notes" key={index}>
            <div className={`clearance_level_badge ${clearanceName[noteClearanceLevel]["class"]}`}>
              {clearanceName[noteClearanceLevel]["name"]}
            </div>
            <div className="security-level">
              <Icon.Security size={3} /> {clearanceName[noteClearanceLevel]["label"]}
            </div>
            <div className="by-line">
              <p>
                <strong>Last updated:</strong> <span>{formatDateTime(note.date_updated)}</span> |{' '}
                <a href="" className="usa-button--unstyled">{note.author_name}</a>
              </p>
            </div>
            <div
              className="note-content"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.note) }}
            />
            {note.files.length > 0 && (
              <div className="note-files">
                {note.files.map((fileInfo: any, index: number) => (
                  <div className="note-file" key={index}>
                    <FileType fileName={fileInfo.name} size={fileInfo.size} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null;
      })}
      </div>
    </>
  );
};

export default OperationNotes;
