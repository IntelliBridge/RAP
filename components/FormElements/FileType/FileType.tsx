import React from 'react';
import './FileType.scss';
import PDF from './assets/pdfType-icon.svg';
import DOC from './assets/docType-icon.svg';
import XLS from './assets/xlsType-icon.svg';

const getFileIcon = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'doc':
    case 'docx':
      return DOC;
    case 'pdf':
      return PDF;
    case 'xls':
    case 'xlsx':
      return XLS;
    default:
      return '';
  }
};

const formatFileSize = (size: number): string => {
  const units: string[] = ['bytes', 'KB', 'MB', 'GB'];
  const mult: number = 1024;
  let index: number = 0;

  while (size >= mult && index < units.length - 1) {
    size /= mult;
    index++;
  }

  return `${size.toFixed(1)} ${units[index]}`;
};

interface FileTypeProps {
  fileName: string;
  size: number;
}

const FileType: React.FC<FileTypeProps> = ({ fileName, size }) => {
  const icon = getFileIcon(fileName);
  return (
    <>
      {icon && <img src={icon} alt={`${fileName} icon`} />} {fileName} &nbsp;&nbsp; ({formatFileSize(size)})
    </>
  );
};

export default FileType;
