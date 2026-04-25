import axios from 'axios'

const API_BASE_URL = '/api/wishlist';


export const getWishlist = () => axios.get(API_BASE_URL);

