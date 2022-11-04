import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import logo from '../../../assets/logo.svg';
import avatar from '../../../assets/avatar.png';
import { Stage, Sprite, Graphics } from '@inlet/react-pixi';
import './styles.css';

interface Draggable extends PIXI.DisplayObject {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

export const useMouseMove = () => {
  function getCoords(clientX: any, clientY: any) {
    return {
      x: clientX || 0,
      y: clientY || 0,
    };
  }

  const coords: any = useRef(getCoords); // ref not state!

  useEffect(() => {
    function handleMove(e: any) {
      coords.current = getCoords(e.clientX, e.clientY);
    }
    global.addEventListener('mousemove', handleMove);
    return () => {
      global.removeEventListener('mousemove', handleMove);
    };
  });
  return coords;
};

export default function DashboardPage(): ReactElement {
  const drawRef = useRef(null);
  const initPointer = useRef(null);
  const isMouseButtonDown = useRef(false);

  const coords = useMouseMove();

  const onMouseStart = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as any;

    //set initial point
    initPointer.current = coords?.current;

    //set button is clicked
    isMouseButtonDown.current = true;
  };

  const onMouseEnd = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    //set button is clicked
    isMouseButtonDown.current = false;
  };

  const onMouseMove = (event: PIXI.InteractionEvent) => {
    // if (!isMouseButtonDown.current) {
    //   return;
    // }

    if (initPointer.current == null) return;
    // // console.log('onMouseMove', coords, isMouseButtonDown.current);

    const sprite = event.currentTarget as any;

    const { x, y } = coords?.current;
    console.log('initPointer?.current', initPointer?.current);
    const { x: initX, y: initY } = initPointer?.current as any;
    sprite.clear();
    sprite.beginFill(0xff3300);
    sprite.lineStyle(4, 0xffd900, 1);
    sprite.moveTo(initX, initY);
    sprite.lineTo(x, y);
  };
  const draw = React.useCallback((g: any) => {
    // g.clear();
    g.beginFill(0xff3300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(50, 50);
    g.lineTo(250, 50);
    g.lineTo(10, 340);
    g.lineTo(50, 50);
    // g.endFill();
    // g.lineStyle(2, 0x0000ff, 1);
    // g.beginFill(0xff700b, 1);
    // g.drawRect(50, 150, 120, 120);
    // g.lineStyle(2, 0xff00ff, 1);
    // g.beginFill(0xff00bb, 0.25);
    // g.drawRoundedRect(150, 100, 300, 100, 15);
    // g.endFill();
    // g.lineStyle(0);
    // g.beginFill(0xffff0b, 0.5);
    // g.drawCircle(470, 90, 60);
    // g.endFill();
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <img src={logo} alt="logo" className="dashboard-logo" />
        <div className="dashboard-profile">
          <Text type="span" text="John Doe" />
          <img src={avatar} alt="avatar" className="dashboard-profile-img" />
        </div>
      </div>

      <div className="dashboard-content" ref={drawRef}>
        <Stage
          width={600}
          height={300}
          options={{ backgroundColor: 0xffffff }}
          //   onMouseMove={handleMouseMove}
        >
          <Graphics
            draw={draw}
            interactive
            buttonMode
            pointerdown={onMouseStart}
            pointerup={onMouseEnd}
            pointerupoutside={onMouseEnd}
            pointermove={onMouseMove}
            // mousemove={onMouseMove}
            // mousedown={onMouseStart}
          />
        </Stage>

        {/* <Stage width={200} height={200} options={{ backgroundColor: 0x1099bb }}>
          <Sprite
            image={avatar}
            x={100}
            y={100}
            anchor={0.5}
            interactive
            buttonMode
            pointerdown={onMouseStart}
            pointerup={onMouseEnd}
            pointerupoutside={onMouseEnd}
            pointermove={onMouseMove}
          />
        </Stage> */}
      </div>
    </div>
  );
}
