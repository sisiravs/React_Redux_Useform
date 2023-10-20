import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import useStyles from "../usestyles";
import { Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "../axios";
import { validationSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import CustomSnackbar from "./CustomSnackbar";

const EditData = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const editEmployee = useSelector((state) => state.employee.editEmployeeData);
  console.log("editEmployee", editEmployee);

  const classes = useStyles();

  const navigate = useNavigate();
  const { setValue, handleSubmit, control } = useForm({
    reValidateMode: "onBlur",
    mode: "all",
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit = async (e) => {
    try {
      const response = await axios.put(`/update/${editEmployee.id}`, e);
      setSnackbarMessage("Successfully Updated");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      console.log("Response data:", response.data);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/");
    } catch (error) {
      console.log("error=====>", error);
      setSnackbarMessage("Failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    setValue("Name", editEmployee.employee_name);
    setValue("Salary", editEmployee.employee_salary);
    setValue("Age", editEmployee.employee_age);
  }, []);

  return (
    <div className="student">
      <CustomSnackbar
        className="custom_snackbar"
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />

      <h2>Edit Data</h2>

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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={value}
                  name="Name"
                  onChange={onChange}
                  error={error}
                  helperText={error?.message ? error.message : ""}
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="outlined-basic"
                  label="Salary"
                  variant="outlined"
                  value={value}
                  name="Salary"
                  onChange={onChange}
                  error={error}
                  helperText={error?.message ? error.message : ""}
                  className={classes.textField}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="Age"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  value={value}
                  name="Age"
                  onChange={onChange}
                  error={error}
                  helperText={error?.message ? error.message : ""}
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
};

export default EditData;
