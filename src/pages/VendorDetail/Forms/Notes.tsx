import React, { useState, useEffect } from 'react';
import { Label, Button, FormGroup } from '@trussworks/react-uswds';
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

const VendorNoteForm = ({ vendorID, refreshVendorNotes }: { vendorID: string | null, refreshVendorNotes: () => void }) => {
  const [note, setNote] = useState<string>('');
  const [files, setFiles] = useState<FileObject[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    // Fetch existing notes when component mounts
    const fetchNotes = async () => {
      try {
        const response = await fetch(endpoints['vendor_overview_notes']);
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
  }, [vendorID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dateUpdated = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 12);

    const newNote = {
      id: uuidv4(),
      UEI: vendorID,
      date_updated: dateUpdated,
      author_name: 'John Doe', // Use the actual author name here
      note: note,
      files: files.map(file => ({ name: file.name, size: file.size })), // Add file data here
    };

    try {
      // Update the notes on the server
      await fetch(endpoints['vendor_overview_notes'], {
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
      refreshVendorNotes(); // Refresh the vendor notes
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <>
     <Button type="button" unstyled onClick={toggleFormVisibility}>
        <strong>{showForm ? 'Hide Notes Form' : 'Add or Edit Notes'}</strong>
      </Button>
      {showForm && (
        <form id="notes-form" onSubmit={handleSubmit}>
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

export default VendorNoteForm;
