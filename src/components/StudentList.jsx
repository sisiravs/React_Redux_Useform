import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import axios from "../axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import CustomSnackbar from "./CustomSnackbar";


import useStyles from "../usestyles";
import { Grid } from "@mui/material";

import {
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
} from "@mui/material";
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../features/employeeSlice";
function StudentList() {
  

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const [employee,setEmployee] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.employee.employeelist);

  const [loading, setLoading] = useState(true);

  const [rows, setRows] = useState(employeeData);




  useEffect(() => {
    fetchData();
  }, []);

  console.log("employeeData>>>>", employeeData);

  const fetchData = async () => {
    await axios
      .get("/employees")
      .then((response) => {
        //  setEmployee(response.data.data)
        dispatch(addEmployee(response.data.data));
        setLoading(false);
      })
      .catch((err) => {
        alert("No network");
        setLoading(false);
      });
  };

  const handleUpdate = (id) => {
    console.log(">>>>>>>>>>>>>>>>>", id);
    dispatch(updateEmployee(id));
    navigate("./editData");
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`/delete/${id}`)
      .then((response) => {
        setSnackbarMessage("Successfully Deleted");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        console.log("Data deleted successfully");
        console.log("===>", response.data);
      })
      .catch((error) => {
        setSnackbarMessage("Failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        // Handle any errors, if needed
        console.log("error error eroor");
        throw error;
      });
    // dispatch(deleteEmployee(id));
  };

  return (
    <div>
      <CustomSnackbar
        className="custom_snackbar"
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />

      {loading ? (
        // Show a loading spinner while data is loading
        <CircularProgress />
      ) : employeeData ? (
        <Grid
          container
          className={classes.input_fields}
          justifyContent={"center"}
        >
          <Grid item>
            <h2>Employee List</h2>
          </Grid>
         

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer className={classes.table}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Salary</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeData?.length > 0 ? (
                    employeeData?.map((obj) => (
                      <TableRow key={obj.id}>
                        <TableCell align="center">{obj.id}</TableCell>
                        <TableCell align="center">
                          {obj.employee_name}
                        </TableCell>
                        <TableCell align="center">
                          {obj.employee_salary}
                        </TableCell>
                        <TableCell align="center">{obj.employee_age}</TableCell>
                        <TableCell align="center">
                          {" "}
                          <IconButton onClick={() => handleUpdate(obj?.id)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <IconButton onClick={() => handleDelete(obj?.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            <IconButton onClick={() => navigate("./studentform")}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <p>Failed to load data</p>
      )}
    </div>
  );
}

export default StudentList;
