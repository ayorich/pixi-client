import { Formik } from 'formik';
import React, { ReactElement } from 'react';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import { signupInitialValues, signupValidationSchema } from './signUpSchema';
import logo from '../../../assets/logo.svg';

import { signupFormInputTypes } from './types';
import './styles.css';

export default function SignUpPage(): ReactElement {
  const onFormSubmit = (values: signupFormInputTypes) => {
    console.log('signupFormInputTypes', values);
  };
  return (
    <div className="authPage">
      <img src={logo} alt="logo" className="authPage-logo" />

      <div className="authPage-content">
        <Formik
          initialValues={signupInitialValues}
          validationSchema={signupValidationSchema}
          validate={(values) => {
            const errors: any = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (values.password !== values.confirmPassword) {
              errors.password = 'Password not same';
              errors.confirmPassword = 'Password not same';
            }
            return errors;
          }}
          onSubmit={onFormSubmit}
        >
          {({ handleChange, handleSubmit, touched, errors, values }) => (
            <form onSubmit={handleSubmit}>
              <Text
                text="Create a new account"
                type="title"
                className="authPage-title"
              />
              <Input
                name="firstName"
                value={values.firstName}
                placeHolder="Enter first name"
                onChange={handleChange('firstName')}
                className="form-inputs"
                type="string"
                isError={!!(touched.firstName && errors.firstName)}
              />
              <Input
                name="lastName"
                value={values.lastName}
                placeHolder="Enter last name"
                onChange={handleChange('lastName')}
                className="form-inputs"
                type="string"
                isError={!!(touched.lastName && errors.lastName)}
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

              <Input
                name="confirmPassword"
                value={values.confirmPassword}
                placeHolder="Enter confrim password"
                onChange={handleChange('confirmPassword')}
                className="form-inputs"
                type="password"
                isError={!!(touched.confirmPassword && errors.confirmPassword)}
              />

              <Button
                text="Create Account"
                type="submit"
                className="authPage-btn"
              />
            </form>
          )}
        </Formik>
        <div className="authPage-extra">
          <Text text="Have an account?" type="span" />
          <a href="/">Sign in</a>
        </div>
      </div>
    </div>
  );
}