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

//Delete
export const deleteUser = createAsyncThunk('users/deleteUser', 
    async(userId, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await usersService.deleteUser(userId,token)
        }catch(error){
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

//Add
export const addUser = createAsyncThunk('users/addUser', 
    async(userData, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await usersService.addUser(userData,token)
        }catch(error){
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()

                return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get all users
export const getAll = createAsyncThunk('users/getall', 
    async(_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await usersService.getAll(token)
        }catch(error){
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
        .addCase(getAll.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getAll.fulfilled, (state, action)=> {
            state.isLoading = false
            state.users = action.payload
        })
        .addCase(getAll.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.users = null
        })
        .addCase(addUser.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(addUser.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = "User created succesfully!"
            state.users.push(action.payload)
        })
        .addCase(addUser.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.users = null
        })

        .addCase(deleteUser.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(deleteUser.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            //return goals without the deleted goal
            state.users = state.users.filter((user) => user._id !== action.payload.id)
        })
        .addCase(deleteUser.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.users = null
        })
        
    }
})
export const {reset} = usersSlice.actions
export default usersSlice.reducer