import RecordListingRow from "./RecordListingRow.jsx";

function RecordListing({ records = [], onDelete }) {
  return (
    <div className="records-container">
      <h2>Collection</h2>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Medium</th>
            <th>Year</th>
            <th>Favourite</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <RecordListingRow key={record.id} record={record} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecordListing
