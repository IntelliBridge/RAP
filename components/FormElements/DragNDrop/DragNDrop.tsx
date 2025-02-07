import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@trussworks/react-uswds';
import './DragNDrop.scss';
import FileType from '../FileType/FileType';

interface FileObject {
  name: string;
  size: number;
}

const fileToObject = (file: File): FileObject => ({
  name: file.name,
  size: file.size,
});

interface DropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<FileObject[]>>;
  files: FileObject[];
}

const Dropzone: React.FC<DropzoneProps> = ({ setFiles, files }) => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const newFileObjects = acceptedFiles.map(fileToObject);
      setFiles((prevFiles: FileObject[]) => [...prevFiles, ...newFileObjects]);
    }
  }, [acceptedFiles, setFiles]);

  const fileItems = files.map((file: FileObject, index: number) => {
    return (
      <li key={index}>
        <FileType fileName={file.name} size={file.size} />
      </li>
    );
  });

  return (
    <div className="dropzone-container">
      <div className="title">
        Attachments
      </div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag files here, or &nbsp;
          <Button type="button" onClick={open} unstyled>
            choose from folder
          </Button>
        </p>
      </div>
      <div className="files-log">
        {files.length === 0 ? '' : <p><strong>{files.length} file{files.length !== 1 ? 's' : ''} selected</strong></p>}
        <ul>{fileItems}</ul>
      </div>
    </div>
  );
};

export default Dropzone;
