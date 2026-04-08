function RecordListingRow({ record, onDelete }) {
  return (
    <tr>
      <td>{record.artist}</td>
      <td>{record.title}</td>
      <td>{record.genre}</td>
      <td>{record.medium}</td>
      <td>{record.year}</td>
      <td>{record.favourite ? '★' : ''}</td>
      <td>
        <button className="delete" onClick={() => onDelete && onDelete(record.id)}>Delete</button>
      </td>
    </tr>
  )
}

export default RecordListingRow