import React from 'react';
import FileType from '../../../components/FormElements/FileType/FileType';
import DOMPurify from 'dompurify';
import './VendorNotes.scss';

// Helper function to format date and time
function formatDateTime(input: string): string {
  const datePart = input.slice(0, 8);
  const timePart = input.slice(9);
  const year = datePart.slice(0, 4);
  const month = datePart.slice(4, 6);
  const day = datePart.slice(6, 8);
  const hour = timePart.padStart(4, '0').slice(0, 2);
  const minute = timePart.padStart(4, '0').slice(2);
  const formattedDateTime = `${month}:${day}:${year} ${hour}:${minute}`;
  return formattedDateTime;
}

// Define the prop types for the VendorNotes component
interface VendorNotesProps {
  vendorID: string;
  vendorNotes: any[];
}

const VendorNotes: React.FC<VendorNotesProps> = ({ vendorNotes }) => {
  return (
    <>
      <div className="notes-section-title">Notes</div>
      {vendorNotes.length > 0 ? (
        vendorNotes.map((note: any, index: number) => (
          <div className="notes" key={index}>
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
            {note.files.length > 0 ? (
              <div className="note-files">
                {note.files.map((fileInfo: any, index: number) => (
                  <div className="note-file" key={index}>
                    <FileType fileName={fileInfo.name} size={fileInfo.size} />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        ""
      )}
    </>
  );
};

export default VendorNotes;
