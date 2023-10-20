import { createSlice } from "@reduxjs/toolkit";
const employeeSlice = createSlice({
    name:'employee',
    initialState:{
        employeelist:[],
        editEmployeeData:{}
    },
    reducers:{
        addEmployee:(state,action)=>{         
             state.employeelist = action.payload;
        },
        updateEmployee:(state,action)=>{
            console.log("first",state.employeelist.filter((employee) => employee.id === action.payload))
            state.editEmployeeData = state.employeelist.filter((employee) => employee.id === action.payload)?.[0];
            },   
            
            deleteEmployee:(state,action)=>{
                return state.employeelist.filter((employee) => employee.id !== action.payload);
                },
        }
    }
    
);
export const{addEmployee,updateEmployee,deleteEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;