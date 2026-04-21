import axios from 'axios'

const API_BASE_URL = '/api/collection';


export const getCollection = () => axios.get(API_BASE_URL);

