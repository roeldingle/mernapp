import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import usersService from './usersService'

//Get user from local storage
//const users = usersService

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Get all users
export const getall = createAsyncThunk('users/getall', 
    async(_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await usersService.getall(token)
        }catch(error){
            console.log(error)
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getall.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getall.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
        })
        .addCase(getall.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.users = null
        })
        
    }
})
export const {reset} = usersSlice.actions
export default usersSlice.reducer