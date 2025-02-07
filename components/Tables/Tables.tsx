import './styles.scss';
import { useState, useEffect, ChangeEvent } from 'react';
import { Table } from '@trussworks/react-uswds';
import { Link } from 'react-router-dom';

interface DataRow {
  id: string;
  submission_id: string;
  submission_date: string;
  status: string;
  operation_name: string;
  vendors: string[];
  city: string;
  state: string;
}

interface FilterableTableProps {
  data: DataRow[];
}

interface Filters {
  submission_id?: string;
  submission_date?: string;
  status?: string;
  operation_name?: string;
  vendors?: string;
  location?: string;
}

const FilterableTable: React.FC<FilterableTableProps> = ({ data }) => {
  const [filters, setFilters] = useState<Filters>({});
  const [filteredData, setFilteredData] = useState<DataRow[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters: Filters) => {
    let newData = data;
    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key as keyof Filters];
      if (filterValue) {
        newData = newData.filter((row) => 
          (row[key as keyof DataRow]?.toString().toLowerCase().includes(filterValue.toLowerCase())) || ''
        );
      }
    });
    setFilteredData(newData);
  };

  return (
    <>
      <div className="filtered-table-container">
        <div className="table-values">Showing {filteredData.length} of {data.length}</div>
        <Table bordered>
          <thead>
            <tr>
              <th>Submission ID</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Operation Name</th>
              <th>Vendors</th>
              <th>State/City</th> {/* Combined City and State */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="submission_id"
                  placeholder="Enter search term"
                  value={filters.submission_id || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="submission_date"
                  placeholder="Enter search term"
                  value={filters.submission_date || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <select
                  name="status"
                  value={filters.status || ''}
                  onChange={handleFilterChange}
                >
                  <option value="">- Select -</option>
                  <option value="In Review">In Review</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="operation_name"
                  placeholder="Enter search term"
                  value={filters.operation_name || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="vendors"
                  placeholder="Enter search term"
                  value={filters.vendors || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="location" // New filter for combined city and state
                  placeholder="Enter search term"
                  value={filters.location || ''}
                  onChange={handleFilterChange}
                />
              </td>
            </tr>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td><Link to={"/operations/" + row.id}>{row.submission_id}</Link></td>
                <td><Link to={"/operations/" + row.id}>{row.submission_date}</Link></td>
                <td><div className={"pill " + (row.status ? row.status.toLowerCase().replace(/\s+/g, '-') : '')}>{row.status}</div></td>
                <td><Link to={"/operations/" + row.id}>{row.operation_name}</Link></td>
                <td><Link to={"/operations/" + row.id}>{row.vendors.join(', ')}</Link></td>
                <td>{`${row.city}, ${row.state}`}</td> {/* Combined City and State */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default FilterableTable;
