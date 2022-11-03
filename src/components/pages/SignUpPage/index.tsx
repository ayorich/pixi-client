import React from 'react';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';

import './styles.css';

export default function SignUpPage() {
  return (
    <div
      style={{
        width: '600px',
      }}
    >
      <Text text="Log in to continue" type="title" />
      <Input
        name="firstName"
        value={'j'}
        placeHolder="Enter first name"
        onChange={(e) => console.log(e)}
      />
      <Button text="Log in" />
      <Text text="Don’t have an account?" type="span" />
    </div>
  );
}
