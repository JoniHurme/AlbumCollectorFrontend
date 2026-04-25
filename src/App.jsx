import './styles/App.css'
import AddRecordField from './components/AddRecordField.jsx'
import RecordListing from './components/RecordListing.jsx'
import useRecords from './hooks/useRecords.jsx'

function App() {
  const { records, view, setView, handleAdd, handleDelete } = useRecords()

  return (
    <div className="App">
      <h1>Album Collector</h1>
      <AddRecordField onAdd={handleAdd} />
      <RecordListing records={records} onDelete={handleDelete} view={view} onViewChange={setView} />
    </div>
  )
}

export default App
