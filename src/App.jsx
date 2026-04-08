import './styles/App.css'
import AddRecordField from './components/AddRecordField.jsx'
import RecordListing from './components/RecordListing.jsx'
import useRecords from './hooks/useRecords.jsx'

function App() {
  const { records, handleAdd, handleDelete } = useRecords()

  return (
    <div className="App">
      <h1>Album Collector</h1>
      <AddRecordField onAdd={handleAdd} />
      <RecordListing records={records} onDelete={handleDelete} />
    </div>
  )
}

export default App
