import React, { ReactElement, useState } from 'react';
import { useAuthContext } from '../../../context/Auth';
import apiService from '../../../utils/apiServices';

import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import './styles.css';

const SketchTool = ({ sketch }: { sketch: any }): ReactElement => {
  const { user } = useAuthContext();

  const [sketchName, setSketchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSketchName(value);

    setError(false);
  };

  const saveSketch = async () => {
    setError(false);
    if (!sketchName) {
      return setError(true);
    }
    setLoading(true);
    Object.keys(sketch).forEach((key) => {
      if (sketch[key].sketch.length === 0) {
        delete sketch[key];
      }
    });

    try {
      const data: any = await apiService('/sketches', 'POST', {
        name: sketchName,
        sketch,
        user: [user._id],
      });
      setLoading(false);
      setSketchName('');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    //send to api
  };
  return (
    <div className="sketch-tool">
      <Input
        name="sketchName"
        value={sketchName}
        type="text"
        placeHolder="Type sketch name"
        onChange={onChange}
        isError={error}
      />
      <Button
        text="Save sketch"
        className="sketch-tool-btn"
        loading={loading}
        onClick={saveSketch}
      />
    </div>
  );
};

export default SketchTool;
