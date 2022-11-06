import React, { ReactElement, useEffect } from 'react';

import AccordionTile from '../../molecules/AccordionTile';
import Text from '../../atoms/Text';
import plus from '../../../assets/plus.svg';
import './styles.css';
import apiService from '../../../utils/apiServices';
import { useSketchContext } from '../../../context/Sketches';

const SketchesAccordion = (): ReactElement => {
  const {
    setSketches,
    sketches,
    setColloborators,
    setActiveSketch,
    activeSketch,
    setNewSketch,
  } = useSketchContext();

  useEffect(() => {
    (async () => {
      try {
        const data: any = await apiService('/sketches', 'GET');
        const sketched = data?.data?.data?.data || [];
        setSketches(sketched);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const getColloborators = async (sketchId: string) => {
    try {
      const data: any = await apiService(`/sketches/${sketchId}`, 'GET');
      const sketch = data?.data?.data?.data;
      const colloboration = sketch?.user;

      setActiveSketch(sketch);
      setColloborators(colloboration);
      setNewSketch('LIST');
      console.log('LOST');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AccordionTile title="SKETCHES">
      <div className="sketchesList">
        {sketches.map(({ name, _id }, i) => (
          <Text
            key={i}
            type="p"
            text={name}
            className={`${activeSketch?._id === _id ? 'sketched' : ''}`}
            onClick={() => getColloborators(_id)}
          />
        ))}

        <div
          className="addSketch"
          onClick={() => {
            setActiveSketch({});
            setColloborators([]);
            setNewSketch('NEW');
          }}
        >
          <img src={plus} alt="plus" />
          <Text type="span" text="Add new sketch" />
        </div>
      </div>
    </AccordionTile>
  );
};

export default SketchesAccordion;
