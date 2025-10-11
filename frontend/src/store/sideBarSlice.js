import {createSlice} from '@reduxjs/toolkit'

const initialState={
    toggle:false
}

const sideBarSlice=createSlice({
    name:"sideBar",
    initialState,
    reducers:{
        toggleSwitch: (state) => {
            state.toggle = !state.toggle;
          }
    }
})

export const{
    toggleOn,
    toggleOf,
    toggleSwitch
}= sideBarSlice.actions

export default sideBarSlice.reducer