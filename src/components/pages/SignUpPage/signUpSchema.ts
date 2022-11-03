import * as yup from 'yup';

export const signupValidationSchema = yup.object({
  email: yup.string().required('Required'),
  password: yup.string().required('Required'),
  company: yup.string().required('Required'),
});

export const signupInitialValues = {
  email: '',
  password: '',
  company: '',
};
