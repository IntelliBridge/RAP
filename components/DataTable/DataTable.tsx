import { Table } from "@trussworks/react-uswds";
import { startCase } from "lodash";
import { ReactElement } from "react";
import { SearchResult, SearchResults } from "../../utils/ApiUtils";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import "./DataTable.scss";

export interface Column {
  key: string;
  label?: string | ReactElement;
  render?: (row: SearchResult) => string | React.ReactElement;
}

export interface DataTableProps extends TableProps {
  data: SearchResults | undefined;
  columns: Column[];
  bordered?: boolean;
}

interface TableProps {
  dataTableURL?: string;
  bordered?: boolean;
  fullWidth?: boolean;
  caption?: string;
  striped?: boolean;
  hover?: boolean;
  className?: string;
  fixed?: boolean;
  stackedStyle?: "none" | "default" | "headers" | undefined;
  scrollable?: boolean;
  pagination?: boolean;
  sortable?: boolean;
  entryPoint?: string;
  totalPages?: number;
  dataFile?: string;
  goToPageNumber?: (page: number) => void;
}

export default function DataTable({ data, columns: passedColumns, goToPageNumber, pagination, ...tableProps }: DataTableProps) {
  if (!data) {
    return <Loading />;
  }
  const columns = passedColumns.map((column) => {
    const label = column.label ?? startCase(column.key);
    return { ...column, label };
  });
  tableProps = tableProps || {};
  if (data?.numberOfElements === 0) {
    return (
      <div className="data-table-component">
        <div className="no-results">No results</div>
      </div>
    );
  }

  return (
    <div className="data-table-component">
      <Table {...tableProps}>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.key} scope="col">
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.content?.map((row: SearchResult, index) => {
            return (
              <tr key={String(row.id ?? index)}>
                {columns.map((column: Column, index) => {
                  const label = typeof column.label === "string" ? column.label : index;
                  if (column.render) {
                    return (
                      <td data-label={label} key={label}>
                        {column.render(row)}
                      </td>
                    );
                  } else {
                    return (
                      <td data-label={label} key={label}>
                        {row[column.key]}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pagination && <Pagination data={data} goToPageNumber={goToPageNumber} />}
    </div>
  );
}
