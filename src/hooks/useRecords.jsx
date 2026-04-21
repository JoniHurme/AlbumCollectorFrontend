import { useCallback, useEffect, useState } from 'react'
import { addRecord, deleteRecord } from '../api/RecordsApi.js'
import { getCollection} from "../api/CollectionApi.js";

function useRecords() {
  const [records, setRecords] = useState([])

  const fetchRecords = useCallback(async () => {
    try {

      // Try the api with getCollection
      const response = await getCollection()
      const data = response.data;
      const recordsArray = Array.isArray(data)
      ? data.flatMap(item => item.records || [])
          : (data.records || data.collection || []);
      setRecords(recordsArray)
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
