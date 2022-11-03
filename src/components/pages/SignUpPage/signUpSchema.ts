import * as yup from 'yup';

export const signupValidationSchema = yup.object({
  email: yup.string().required('Required'),
  password: yup.string().required('Required'),
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  confirmPassword: yup.string().required('Required'),
});

export const signupInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
