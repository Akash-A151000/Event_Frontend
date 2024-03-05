import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  firstname: yup.string().required('required'),
  lastname: yup.string().required('required'),
  email: yup.string().required('required'),
  password: yup.string().required('required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required('required'),
  password: yup.string().required('required'),
});
