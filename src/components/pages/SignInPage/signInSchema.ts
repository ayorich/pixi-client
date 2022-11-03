import * as yup from 'yup';

export const signinValidationSchema = yup.object({
  email: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

export const signinInitialValues = {
  email: '',
  password: '',
};
