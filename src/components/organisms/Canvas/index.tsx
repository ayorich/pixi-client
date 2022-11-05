import React, { ReactElement, useEffect, useRef } from 'react';
import { Application, Container, Graphics } from 'pixi.js';

const app = new Application({
  width: 900,
  height: 450,
  backgroundColor: 0xffffff,
});

export default function Canvas(): ReactElement {
  let sprite = new Graphics();
  let annoRef = new Container();

  const canvas = useRef<HTMLElement>();
  let container = canvas.current;
  const isMouseButtonDown = useRef(false);
  const initPointer = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
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
    if (!isMouseButtonDown.current) {
      return;
    }

    if (initPointer.current == null) return;

    const mousePosRef = getMousePos(e);

    const { x, y } = mousePosRef;

    Object.keys(lineStore.current).forEach((key: string) => {
      sprite.clear();
      sprite.lineStyle(2, 0xffd900, 1);
      sprite.moveTo(initPointer.current.x, initPointer.current.y);
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
    initPointer.current = mousePosRef;

    sprite = new Graphics();
    sprite.lineStyle(2, 0xff0000, 1);
    sprite.moveTo(initPointer.current.x, initPointer.current.y);
    sprite.lineTo(mousePosRef.x, mousePosRef.y);

    annoRef.addChild(sprite);

    isMouseButtonDown.current = true;

    //assign line name
    const identifier = Math.random() * 200000;
    currentLine.current = identifier;
    lineStore.current[identifier] = [];
  };

  const onMouseUp = (e: any) => {
    isMouseButtonDown.current = false;
  };

  return (
    <div
      id="stage-container"
      style={{
        display: 'table',
      }}
    ></div>
  );
}
