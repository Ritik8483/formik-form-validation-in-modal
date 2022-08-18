import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../global/api";

export const getAllEmployee = createAsyncThunk(
  "employeeReducer/getAllEmployee",
  async () => {
   return axios.get(api).then((response) => {return(response.data)});
  }
);
export const addNewEmployee = createAsyncThunk(
  "employeeReducer/addNewEmployee",
  async (newEmployeeData) => {
   return axios.post(api,newEmployeeData).then((response) => {return(response.data)});
  }
);
export const deleteEmployee = createAsyncThunk(
  "employeeReducer/deleteEmployee",
  async (id) => { 
   return axios.delete(`${api}/${id}`).then((resp) => {return({id:id})});
  }
);
export const singleEmployeeData = createAsyncThunk(
  "employeeReducer/singleEmployeeData",
  async (id) => { 
   return axios.get(`${api}/${id}`).then((resp) => {return(resp.data)});
  }
);
export const updateEmployeeData = createAsyncThunk(
  "employeeReducer/updateEmployeeData",
  async (userDetail) => { 
   return axios.put(`${api}/${userDetail.id}`,userDetail).then((resp) => {return(resp.data)});
  }
);
// export const viewEmployeeData = createAsyncThunk(
//   "employeeReducer/viewEmployeeData",
//   async (id) => { 
//    return axios.get(`${api}/${id}`).then((resp) => {return(resp.data)});
//   }
// );

const initialState = {
  employees: [],
  singleEmployee:{},
  status: {},
  view:{},
};

export const employeeSlice = createSlice({
  name: "employeeReducer",
  initialState: initialState,
  reducers: {
    resetDetails:(state,action)=>{
      state.singleEmployee={}
    }
  },
  extraReducers: (builder) => {
    console.log('b',builder);
    builder.addCase(getAllEmployee.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllEmployee.fulfilled, (state,action) => {
      state.status = "fulfilled";
      state.employees = action.payload;
    });
    builder.addCase(getAllEmployee.rejected, (state, action) => {
      state.status = "rejected";
    });

    builder.addCase(addNewEmployee.fulfilled, (state,action) => {
      state.status = "fulfilled";
      state.employees = [action.payload,...state.employees];
    });
    builder.addCase(deleteEmployee.fulfilled, (state,action) => {
      console.log('action',action);
      state.status = "fulfilled";
      state.employees = state.employees.filter((item)=>item.id!==action.payload);
    });
    builder.addCase(singleEmployeeData.fulfilled, (state,{payload}) => {
      state.status = "fulfilled";
      state.singleEmployee = payload;
    });
    builder.addCase(updateEmployeeData.fulfilled, (state,{payload}) => {
      state.status = "fulfilled";
      state.employees = state.employees.map((user)=>(user.id===payload.id ? payload : user));
    });
    // builder.addCase(viewEmployeeData.fulfilled, (state,{payload}) => {
    //   state.status = "fulfilled";
    //   state.view = payload;
    // });
  },
});

const {actions}=employeeSlice;
export const {resetDetails}=actions;
export default employeeSlice.reducer;
