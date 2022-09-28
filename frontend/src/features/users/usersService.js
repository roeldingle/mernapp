import axios from 'axios'

const API_URL = '/api/users/'

//Get all users
const getall = async(token) => {

  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL, config);

  return response.data.data;
}


const usersService = {
  getall,
}

export default usersService