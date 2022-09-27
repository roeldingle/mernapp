import axios from 'axios'

const API_URL = '/api/auth/'

//Register user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)
    // if(response.data){
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    return response.data
}

const authService = {
    register,
    login,
}

export default authService