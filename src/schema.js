
import * as yup from 'yup';
export const validationSchema =()=> yup.object().shape({
    Name: yup.string()
        .required('Name is required'),
    Salary: yup.string()
        .required(' Salary is required'),
    Age: yup.string()
        .required('Age is required')
        ,
   
});

 