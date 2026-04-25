import useForm from '../hooks/useForm.jsx'

function AddRecordField({ onAdd }) {
  const initialValues = {
    artist: '',
    title: '',
    genre: '',
    medium: '',
    year: '',
    favourite: false,
    wishlist: false,
    collectionId: 1,
    wishlistId: 1
  }

  const { values: newRecord, handleChange, reset } = useForm(initialValues)


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { wishlist, ...rest } = newRecord
      const recordToSubmit = {
        ...rest,
        year: parseInt(newRecord.year) || 0,
      }

      if (wishlist) {
        recordToSubmit.wishlistId = parseInt(newRecord.wishlistId) || 1
        delete recordToSubmit.collectionId
      } else {
        recordToSubmit.collectionId = parseInt(newRecord.collectionId) || 1
        delete recordToSubmit.wishlistId
      }

      if (onAdd) {
        await onAdd(recordToSubmit)
      }
      reset()
    } catch (error) {
      console.error('Error adding record:', error)
    }
  }

  const handleExportWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist/export/1');
      if (!response.ok) throw new Error('Failed to download');

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'wishlist.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading wishlist:', error);
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
          <label>
            Wishlist
            <input
              name="wishlist"
              type="checkbox"
              checked={newRecord.wishlist}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Record</button>
        </div>
        <div>
          <button type="button" onClick={handleExportWishlist}>
            Export Wishlist
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRecordField
