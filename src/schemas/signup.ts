import * as yup from 'yup';

const signUpSchema = yup.object().shape({
    username: yup.string().required("user name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("password is required"),

});

export default signUpSchema;