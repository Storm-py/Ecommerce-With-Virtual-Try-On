import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userStatusTrue:(state)=>{
            state.isLoggedIn =true
        },
        userStatusFalse:(state)=>{
            state.isLoggedIn=false
        }
    }
})

export default userSlice.reducer
export const {
    userStatusFalse,
    userStatusTrue
}=userSlice.actions