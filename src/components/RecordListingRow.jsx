function RecordListingRow({ record, onDelete }) {
  const recordData = record.record || record;

  return (
    <tr>
      <td>{recordData.artist}</td>
      <td>{recordData.title}</td>
      <td>{recordData.genre}</td>
      <td>{recordData.medium}</td>
      <td>{recordData.year}</td>
      <td>{recordData.favourite ? '★' : ''}</td>
      <td>
        <button className="delete" onClick={() => onDelete && onDelete(recordData.id)}>Delete</button>
      </td>
    </tr>
  )
}

export default RecordListingRow