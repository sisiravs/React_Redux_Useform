import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import useStyles from "../usestyles";
import { Grid } from "@mui/material";
import { useForm, Controller} from "react-hook-form";
import axios from '../axios';
import {validationSchema} from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";

const StudentForm= ()=> {
  const classes = useStyles();
  const navigate = useNavigate()
  const {
    
    handleSubmit,
  control
  } = useForm({
    reValidateMode:'onBlur',
    mode: "all",
    resolver: yupResolver(validationSchema()),
  });



  const onSubmit = (e) => {
    console.log("on submit")
    postData(e);
  
    
  };
 
  const postData =(e)=>{

    axios
    .post('/create', e)
    .then(() => {
      
      
       navigate('./')
      // console.log('Post successful:', response.data);
      // You can handle the response here
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here
    });


  }
  
  
  return (
    <div className="student">
      <h2>Add Student</h2>
     
       
      <form className="student_form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          className={classes.input_fields}
          justifyContent={"center"}
          spacing={3}
        >
 
          <Grid item xs={12}>
            <Controller
            defaultValue=""
            name="Name"
            control={control}
              render={({ field:{onChange,value} ,fieldState:{error}}) => (
                <TextField
                 
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={value}
                  name="Name"
                  onChange={onChange}
                  error={error}
                  helperText={error?.message?error.message:''}
                  className={classes.textField}
                />
              )}
              
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
             name="Salary"
             control={control}
             defaultValue=""
            render={({ field:{onChange,value},fieldState:{error}  }) => (
              <TextField
                id="outlined-basic"
                label="Salary"
                variant="outlined"
                value={value}
                name="Salary"
                onChange={onChange}
                error={error}
               helperText={error?.message?error.message:''}
                className={classes.textField}
              />)}
             
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
             name="Age"
             control={control}
             defaultValue=""
            render={({ field:{onChange,value},fieldState:{error} }) => (
              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                value={value}
                name="Age"
                onChange={onChange}
                error={error}
                helperText={error?.message?error.message:''}
                className={classes.textField}
              />
              
            )}
            
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              varient="contained"
              className={classes.form_button}
            >
              Submit
            </Button>
          </Grid>
         
        </Grid>
        </form>
    </div>
  );
}

export default StudentForm;
