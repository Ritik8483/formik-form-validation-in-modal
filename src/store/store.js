import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../slices/employeeSlice'
// import { employeeSlice } from '../slices/employeeSlice'

export const store=configureStore({
    reducer:{
        employeeReducer:employeeSlice
    }
})

export default store;