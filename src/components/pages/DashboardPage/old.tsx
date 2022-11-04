import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import logo from '../../../assets/logo.svg';
import avatar from '../../../assets/avatar.png';
import { Stage, Sprite, Graphics, useApp, Container } from '@inlet/react-pixi';
import './styles.css';
import { Application } from 'pixi.js';

interface Map {
  [key: string]: string;
}

const app = new Application({
  width: 200,
  height: 50,
  backgroundColor: 0x10bb99,
  view: document.getElementById('canvas') as HTMLCanvasElement,
});

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
  const lineStore = useRef<any>({});
  const currentLine = useRef<any>(null);
  const isMouseButtonDown = useRef(false);
  const [newD, setDraw] = useState<any>(null);
  const coords = useMouseMove();
  const [app, setApp] = React.useState<Application>();

  const onMouseStart = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as PIXI.Graphics;

    //set initial point
    initPointer.current = coords?.current;

    //assign line name
    const identifier = Math.random() * 200000;
    currentLine.current = identifier;
    lineStore.current[identifier] = [];
    //set button is clicked
    isMouseButtonDown.current = true;
  };

  const onMouseEnd = (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as PIXI.Graphics;
    //set button is clicked
    isMouseButtonDown.current = false;

    currentLine.current = null;
    // setDraw(lineStore.current);

    console.log('===============>end');
  };

  const onMouseMove = (event: PIXI.InteractionEvent) => {
    if (!isMouseButtonDown.current) {
      return;
    }

    if (initPointer.current == null) return;

    let sprite = event.currentTarget as PIXI.Graphics;

    const { x, y } = coords?.current;
    const { x: initX, y: initY } = initPointer?.current as any;

    Object.keys(lineStore.current).forEach((key: string) => {
      sprite.lineStyle(2, 0xffd900, 1);
      sprite.moveTo(initX, initY);
      lineStore.current[key].forEach(({ x, y }: any) => {
        sprite.lineTo(x, y);
      });
    });

    lineStore.current[currentLine.current] = [
      ...lineStore.current[currentLine.current],
      { x, y },
    ];

    // if (app) {
    //   app?.renderer.render(app?.stage);
    //   // sprite.destroy();
    // }
  };

  console.log('===============>called------', initPointer?.current);

  const draw = (sprite: any) => {
    sprite.clear();
    sprite.beginFill(0xffffff, 1);
    sprite.drawRect(0, 0, 1500, 1200);
    sprite.endFill();
    console.log('===============>');

    if (!!initPointer?.current) {
      const { x: initX, y: initY } = initPointer?.current as any;
      Object.keys(lineStore.current).forEach((key: string) => {
        sprite.lineStyle(2, 0xffd900, 1);
        sprite.moveTo(initX, initY);
        lineStore.current[key].forEach(({ x, y }: any) => {
          sprite.lineTo(x, y);
        });
      });
    }

    // sprite.lineStyle(4, 0xffd900, 1);
    sprite.moveTo(50, 50);
    sprite.lineTo(250, 50);
    // sprite.lineTo(100, 100);
    // sprite.lineTo(50, 50);

    // sprite.lineStyle(4, 0xffd900, 1);
    sprite.moveTo(250, 250);
    sprite.lineTo(350, 250);
    // sprite.lineTo(400, 400);
    // sprite.lineTo(250, 250);
  };

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
          height={600}
          options={{ backgroundColor: 0xffffff }}
          // raf={false}
          // renderOnComponentChange
          // onMount={setApp}
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
            // x={0}
            // y={56}
          />
        </Stage>
      </div>
    </div>
  );
}
