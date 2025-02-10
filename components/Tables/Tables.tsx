import './styles.scss';
import { useState, useEffect, ChangeEvent } from 'react';
import { Table } from '@trussworks/react-uswds';
import { Link } from 'react-router-dom';

interface DataRow {
  id: string;
  first_name: string;
  middle_initial: string;
  last_name: string;
  rank: string;
  operation_name: string;
  vendors: string[]; // Vendors should be an array
  city: string;
  state: string;
}

interface FilterableTableProps {
  data: DataRow[];
}

interface Filters {
  first_name?: string;
  last_name?: string;
  rank?: string;
  operation_name?: string;
  vendors?: string;
  location?: string;
}

const FilterableTable: React.FC<FilterableTableProps> = ({ data }) => {
  console.log(data)
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
              <th>First Name</th>
              <th>Middle Initial</th>
              <th>Last Name</th>
              <th>Rank</th>
              <th>State/City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter search term"
                  value={filters.first_name || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="middle_initial"
                  placeholder="Enter search term"
                  value={filters.middle_initial || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter search term"
                  value={filters.last_name || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="rank"
                  placeholder="Enter search term"
                  value={filters.rank || ''}
                  onChange={handleFilterChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="location" // Filter for combined city and state
                  placeholder="Enter search term"
                  value={filters.location || ''}
                  onChange={handleFilterChange}
                />
              </td>
            </tr>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td><Link to={"/recruits/" + row.id}>{row.first_name}</Link></td>
                <td><Link to={"/recruits/" + row.id}>{row.middle_initial}</Link></td>
                <td><Link to={"/recruits/" + row.id}>{row.last_name}</Link></td>
                <td><div className={"" + (row.rank ? row.rank.toLowerCase().replace(/\s+/g, '-') : '')}>{row.rank}</div></td>
                <td>{`${row.city}, ${row.state}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default FilterableTable;
