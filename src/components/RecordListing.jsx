import RecordListingRow from "./RecordListingRow.jsx";
import {useState, useMemo} from "react";

function RecordListing({ records = [], onDelete }) {
  
  const [sortColumn, setSortColumn] = useState('artist');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }

  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      const aData = a.record || a;
      const bData = b.record || b;

      let aValue = aData[sortColumn];
      let bValue = bData[sortColumn];

      if (aValue === undefined || aValue === null) aValue = '';
      if (bValue === undefined || bValue === null) bValue = '';

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [records, sortColumn, sortDirection]);

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  }

  return (
    <div className="records-container">
      <h2>Collection</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('artist')} style={{ cursor: 'pointer' }}>
              Artist{getSortIndicator('artist')}
            </th>
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
              Title{getSortIndicator('title')}
            </th>
            <th onClick={() => handleSort('genre')} style={{ cursor: 'pointer' }}>
              Genre{getSortIndicator('genre')}
            </th>
            <th onClick={() => handleSort('medium')} style={{ cursor: 'pointer' }}>
              Medium{getSortIndicator('medium')}
            </th>
            <th onClick={() => handleSort('year')} style={{ cursor: 'pointer' }}>
              Year{getSortIndicator('year')}
            </th>
            <th onClick={() => handleSort('favourite')} style={{ cursor: 'pointer' }}>
              Favourite{getSortIndicator('favourite')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedRecords.map(record => {
            const recordData = record.record || record;
            return <RecordListingRow key={recordData.id} record={record} onDelete={onDelete} />;
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecordListing
