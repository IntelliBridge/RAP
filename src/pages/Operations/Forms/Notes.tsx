import React, { useState, useEffect } from 'react';
import { Select, Label, Button, FormGroup, Icon } from '@trussworks/react-uswds';
import { v4 as uuidv4 } from 'uuid';
import Dropzone from '../../../../components/FormElements/DragNDrop/DragNDrop';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Forms.scss';
import Config from '../../../config';
const { endpoints } = Config();

// Define a type for the file object
interface FileObject {
  name: string;
  size: number;
}

const OperationNoteForm = ({ operationID, refreshOperationNotes }: { operationID: string | null, refreshOperationNotes: () => void }) => {
  const [note, setNote] = useState<string>('');
  const [files, setFiles] = useState<FileObject[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [clearanceLevel, setClearanceLevel] = useState<string>('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = localStorage.getItem('user-role') || '0';

  const clearanceName = {
    0: { "name": "Top Secret", "class": "top-secret", "label": "TS//SI/REL TO USA, FVEY" },
    1: { "name": "Secret", "class": "secret", "label": "S//SI/REL TO USA, FVEY" },
    2: { "name": "Unclassified", "class": "unclassified", "label": "U" }
  };

  useEffect(() => {
    // Fetch existing notes when component mounts
    const fetchNotes = async () => {
      try {
        const response = await fetch(endpoints['operation-notes']);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        // const notes = await response.json();
        // You can use setExistingNotes(notes.notes || []) if you need to use the existing notes later
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [operationID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dateUpdated = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 12);

    const newNote = {
      id: uuidv4(),
      clearance_level: clearanceLevel,
      operation_id: operationID,
      date_updated: dateUpdated,
      author_name: `${user.first_name} ${user.last_name}`,
      note: note,
      files: files.map(file => ({ name: file.name, size: file.size })), // Add file data here
    };

    try {
      // Update the notes on the server
      await fetch(endpoints['operation-notes'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      alert('Note added successfully');
      // Optionally clear form inputs after successful submission
      setNote('');
      setFiles([]);
      refreshOperationNotes(); // Refresh the operation notes
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleClearanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClearanceLevel(e.target.value);
  };

  const renderClearanceSelector = () => {
    if (userRole === '0') {
      return (
        <Select required id="clearance" name="user-clearance-selector" value={clearanceLevel} onChange={handleClearanceChange}>
          <option value="">- Select -</option>
          <option value="0">Top Secret</option>
          <option value="1">Secret</option>
          <option value="2">Unclassified</option>
        </Select>
      );
    } else if (userRole === '1') {
      return (
        <Select required id="clearance" name="user-clearance-selector" value={clearanceLevel} onChange={handleClearanceChange}>
          <option value="">- Select -</option>
          <option value="1">Secret</option>
          <option value="2">Unclassified</option>
        </Select>
      );
    } else {
      return (
        <>
        <Select required id="clearance" name="user-clearance-selector" value={clearanceLevel} onChange={handleClearanceChange} disabled>
          <option value="2">Unclassified</option>
        </Select>
         <div className={`clearance_level_badge unclassified ${clearanceName[clearanceLevel]?.class || ''}`}>
            {clearanceName[2].name || 'Unclassified'}
          </div>
          <div className="security-level">
            <Icon.Security size={3} /> {clearanceName[2]?.label || 'N/A'}
          </div>
          </>
      );
    }
  };

  return (
    <>
      <Button type="button" unstyled onClick={toggleFormVisibility}>
        <strong>{showForm ? 'Hide Notes Form' : 'Add or Edit Notes'}</strong>
      </Button>
      {showForm && (
        <form id="notes-form" onSubmit={handleSubmit}>
          {renderClearanceSelector()}

          {clearanceLevel && clearanceName[clearanceLevel] && (
            <>
              <div className={`clearance_level_badge ${clearanceName[clearanceLevel]?.class || ''}`}>
                {clearanceName[clearanceLevel]?.name || 'Select Clearance Level'}
              </div>
              <div className="security-level">
                <Icon.Security size={3} /> {clearanceName[clearanceLevel]?.label || 'N/A'}
              </div>
            </>
          )}
          <FormGroup>
            <Label htmlFor="note">Note</Label>
            <CKEditor
              editor={ClassicEditor}
              data={note}
              onChange={(_event: any, editor: any) => {
                const data = editor.getData();
                setNote(data);
              }}
            />
          </FormGroup>
          <Dropzone setFiles={setFiles} files={files} />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </>
  );
};

export default OperationNoteForm;
