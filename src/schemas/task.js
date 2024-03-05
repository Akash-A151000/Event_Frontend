import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  title: yup.string().required('required'),
  description: yup.string().required('required'),
  end: yup.string().required('required'),
  completed: yup.boolean().optional(),
});
