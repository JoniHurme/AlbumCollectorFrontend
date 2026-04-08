import { useCallback, useEffect, useState } from 'react'
import { getAllRecords, addRecord, deleteRecord } from '../api'

function useRecords() {
  const [records, setRecords] = useState([])

  const fetchRecords = useCallback(async () => {
    try {
      const response = await getAllRecords()
      setRecords(response.data)
    } catch (error) {
      console.error('Error fetching records:', error)
    }
  }, [])

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const handleAdd = useCallback(async (record) => {
    try {
      await addRecord(record)
      await fetchRecords()
    } catch (error) {
      console.error('Error adding record:', error)
    }
  }, [fetchRecords])

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteRecord(id)
      await fetchRecords()
    } catch (error) {
      console.error('Error deleting record:', error)
    }
  }, [fetchRecords])

  return { records, fetchRecords, handleAdd, handleDelete }
}

export default useRecords
