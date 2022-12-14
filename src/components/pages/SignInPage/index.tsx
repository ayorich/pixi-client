import { Formik, FormikHelpers } from 'formik';
import React, { ReactElement, useState } from 'react';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import { signinInitialValues, signinValidationSchema } from './signInSchema';
import logoSvg from '../../../assets/google.svg';
import logo from '../../../assets/logo.svg';
import { signInFormInputTypes } from './types';
import './styles.css';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../../utils/routes';
import { useAuthContext } from '../../../context/Auth';
import apiService from '../../../utils/apiServices';

export default function SignUpPage(): ReactElement {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const onFormSubmit = async (
    values: signInFormInputTypes,
    { setErrors }: FormikHelpers<signInFormInputTypes>
  ) => {
    setLoading(true);
    try {
      const data: any = await apiService('/auth/login', 'POST', values);

      const user = data?.data?.data?.user;

      sessionStorage.setItem('naya_user', JSON.stringify(user));
      setUser(user);

      setLoading(false);
    } catch (err) {
      setErrors({
        password: 'Invalid email address',
        email: 'Invalid email address',
      });
      setLoading(false);
    }
  };
  return (
    <div className="authPage">
      <img src={logo} alt="logo" className="authPage-logo" />

      <div className="authPage-content">
        <Formik
          initialValues={signinInitialValues}
          validationSchema={signinValidationSchema}
          validate={(values) => {
            const errors: any = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            return errors;
          }}
          onSubmit={onFormSubmit}
        >
          {({ handleChange, handleSubmit, touched, errors, values }) => (
            <form onSubmit={handleSubmit}>
              <Text
                text="Log in to continue"
                type="title"
                className="authPage-title"
              />

              <Input
                name="email"
                value={values.email}
                placeHolder="Enter email address"
                onChange={handleChange('email')}
                className="form-inputs"
                type="string"
                isError={!!(touched.email && errors.email)}
              />
              <Input
                name="password"
                value={values.password}
                placeHolder="Enter password"
                onChange={handleChange('password')}
                className="form-inputs"
                type="password"
                isError={!!(touched.password && errors.password)}
              />

              <Text
                text="Forgot password?"
                type="p"
                className="authPage-forgotPwd"
              />

              <Button
                text="Log in"
                type="submit"
                className="authPage-btn"
                loading={loading}
              />
            </form>
          )}
        </Formik>
        <div className="authPage-extra">
          <Text text="Don???t have an account?" type="span" />
          <Link to={SIGNUP}>Sign up</Link>
        </div>
        <Text text="or" type="p" className="authPage-or" />

        <div className="authPage-goggle">
          <img src={logoSvg} alt="google" />
          <Text
            text="Log in with Google"
            type="span"
            className="authPage-goggleText"
          />
        </div>
      </div>
    </div>
  );
}
