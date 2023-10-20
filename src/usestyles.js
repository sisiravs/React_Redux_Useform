import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  input_fields: {
    display: "flex",
  },
  textField: {
    width: "30%",
  },
  form_button: {
    width: "30%",
    backgroundColor: "red",

    color: "white",
    "&:hover": {
      backgroundColor: "green",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  table: {
    maxWidth: "70%",
    border: "1px solid black",
  },
  custom_snackbar: {
    top: "1rem",/* Adjust the top value to change the vertical position */
    right:"1rem" , /* Adjust the right value to change the horizontal position */
    zIndex: "1302" ,/* Ensure it's above other components */
  },
}));
export default useStyles;
