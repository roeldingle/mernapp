import axios from 'axios'

const API_URL = '/api/users/'

//Add user
const add = async(userData,token) => {

  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.post(API_URL, userData, config);

  return response.data.data;
}

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
  add
}

export default usersService