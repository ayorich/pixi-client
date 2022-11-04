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
import './styles.css';
import { Application, Container, Graphics } from 'pixi.js';

interface Map {
  [key: string]: string;
}

const app = new Application({
  width: 900,
  height: 990,
  backgroundColor: 0x10bb99,
  // view: document.getElementById('canvas') as HTMLCanvasElement,
});

export default function DashboardPage(): ReactElement {
  var sprite = new Graphics();
  let initPointer: any = null;

  let isMouseButtonDown = false;
  let annoRef = new Container();
  let container: HTMLElement;

  const lineStore = useRef<any>({});
  const currentLine = useRef<any>(null);

  const getMousePos = (event: any) => {
    const pos = { x: 0, y: 0 };
    if (container) {
      // Get the position and size of the component on the page.
      const holderOffset = container.getBoundingClientRect();
      pos.x = event.pageX - holderOffset.x;
      pos.y = event.pageY - holderOffset.y;
    }
    return pos;
  };

  useEffect(() => {
    app.stage.addChild(annoRef);
    container = document.getElementById('stage-container') as HTMLElement;
    container.appendChild(app.view);

    container.addEventListener('mousemove', onMouseMove);

    container.addEventListener('mousedown', onMouseDown);

    container.addEventListener('mouseup', onMouseUp);
  }, []);

  const onMouseMove = (e: any) => {
    if (!isMouseButtonDown) {
      return;
    }

    // clearSpriteRef(annoRef)
    if (initPointer == null) return;

    const mousePosRef = getMousePos(e);
    // sprite.clear();
    // sprite.lineStyle(2, 0xff0000, 1);
    // sprite.moveTo(initPointer.x, initPointer.y);
    // sprite.lineTo(mousePosRef.x, mousePosRef.y);

    const { x, y } = mousePosRef;

    Object.keys(lineStore.current).forEach((key: string) => {
      sprite.clear();
      sprite.lineStyle(2, 0xffd900, 1);
      sprite.moveTo(initPointer.x, initPointer.y);
      lineStore.current[key].forEach(({ x, y }: any) => {
        sprite.lineTo(x, y);
      });
    });

    lineStore.current[currentLine.current] = [
      ...lineStore.current[currentLine.current],
      { x, y },
    ];
  };

  const onMouseDown = (e: any) => {
    const mousePosRef = getMousePos(e);
    initPointer = mousePosRef;

    sprite = new Graphics();
    sprite.lineStyle(2, 0xff0000, 1);
    sprite.moveTo(initPointer.x, initPointer.y);
    sprite.lineTo(mousePosRef.x, mousePosRef.y);

    annoRef.addChild(sprite);

    isMouseButtonDown = true;

    //assign line name
    const identifier = Math.random() * 200000;
    currentLine.current = identifier;
    lineStore.current[identifier] = [];
  };

  const onMouseUp = (e: any) => {
    isMouseButtonDown = false;
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

      <div className="dashboard-content">
        <div
          id="stage-container"
          style={{ border: '1px solid red', display: 'table' }}
        ></div>
      </div>
    </div>
  );
}
