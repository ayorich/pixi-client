import React, { ReactElement, useState } from 'react';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';

import './styles.css';

export default function SignUpPage(): ReactElement {
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };
  return (
    <div className="authPage">
      <div className="authPage-content">
        <Text text="Log in to continue" type="title" />
        <Input
          name="firstName"
          value={formInputs.firstName}
          placeHolder="Enter first name"
          onChange={onInputChange}
          className="form-inputs"
          type="string"
        />
        <Input
          name="lastName"
          value={formInputs.lastName}
          placeHolder="Enter last name"
          onChange={onInputChange}
          className="form-inputs"
          type="string"
        />
        <Input
          name="email"
          value={formInputs.email}
          placeHolder="Enter email address"
          onChange={onInputChange}
          className="form-inputs"
          type="string"
        />
        <Input
          name="password"
          value={formInputs.password}
          placeHolder="Enter password"
          onChange={onInputChange}
          className="form-inputs"
          type="password"
        />

        <Input
          name="confirmPassword"
          value={formInputs.confirmPassword}
          placeHolder="Enter confrim password"
          onChange={onInputChange}
          className="form-inputs"
          type="password"
        />

        <Button text="Log in" />
        <Text text="Don’t have an account?" type="span" />
      </div>
    </div>
  );
}
