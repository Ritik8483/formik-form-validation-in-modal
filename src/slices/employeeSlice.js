import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../global/api";

export const getAllEmployee = createAsyncThunk(
  "employeeReducer/getAllEmployee",
  async () => {
   return axios.get(api).then((response) => {return(response.data)});
  }
);

const initialState = {
  employees: [],
  status: {},
};

export const employeeSlice = createSlice({
  name: "employeeReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    console.log('b',builder);
    builder.addCase(getAllEmployee.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllEmployee.fulfilled, (state,action) => {
      state.status = "fulfilled";
      state.employees = action.payload;
    //   state.employees=action.payload;
    });
    builder.addCase(getAllEmployee.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default employeeSlice.reducer;
