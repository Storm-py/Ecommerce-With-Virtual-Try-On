import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice.js'
import sideBarSlice from "./sideBarSlice.js";
import userSlice from './userSlice.js'

const store=configureStore({
    reducer:{
        cart:cartSlice,
        sideBar:sideBarSlice,
        user:userSlice
    }
})

export default store