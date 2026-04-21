import useForm from '../hooks/useForm.jsx'

function AddRecordField({ onAdd }) {
  const initialValues = {
    artist: '',
    title: '',
    genre: '',
    medium: '',
    year: '',
    favourite: false,
    collectionId: 1
  }

  const { values: newRecord, handleChange, reset } = useForm(initialValues)


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const recordToSubmit = {
        ...newRecord,
        year: parseInt(newRecord.year) || 0,
        collectionId: parseInt(newRecord.collectionId) || 1
      }
      if (onAdd) {
        await onAdd(recordToSubmit)
      }
      reset()
    } catch (error) {
      console.error('Error adding record:', error)
    }
  }

  return (
    <div className="form-container">
      <h2>Add New Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="artist"
            value={newRecord.artist}
            onChange={handleChange}
            placeholder="Artist"
            required
          />
          <input
            name="title"
            value={newRecord.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="genre"
            value={newRecord.genre}
            onChange={handleChange}
            placeholder="Genre"
          />
          <input
            name="medium"
            value={newRecord.medium}
            onChange={handleChange}
            placeholder="Medium"
          />
          <input
            name="year"
            type="number"
            value={newRecord.year}
            onChange={handleChange}
            placeholder="Year"
          />
        </div>
        <div className="form-group checkbox-group">
          <label>
            Favourite
            <input
              name="favourite"
              type="checkbox"
              checked={newRecord.favourite}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Record</button>
        </div>
      </form>
    </div>
  )
}

export default AddRecordField
