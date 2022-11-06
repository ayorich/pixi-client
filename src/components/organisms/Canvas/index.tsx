import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Application, Container, Graphics } from 'pixi.js';
import SketchTool from '../SketchTool';
import { v4 as uuidv4 } from 'uuid';
import { useSketchContext } from '../../../context/Sketches';

let app = new Application({
  width: 900,
  height: 450,
  backgroundColor: 0xffffff,
});

export default function Canvas(): ReactElement {
  const { activeSketch } = useSketchContext();
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

  useEffect(() => {
    if (activeSketch) {
      initPointer.current = { x: 200, y: 200 };

      sprite = new Graphics();
      sprite.lineStyle(2, 0xff0000, 1);
      annoRef.addChild(sprite);

      lineStore.current = activeSketch?.sketch;
      Object.keys(lineStore.current).forEach((key: string) => {
        sprite.clear();
        sprite.lineStyle(2, 0xffd900, 1);
        sprite.moveTo(initPointer.current.x, initPointer.current.y);
        lineStore.current[key].forEach(({ x, y }: any) => {
          sprite.lineTo(x, y);
        });
      });

      console.log(
        // 'useLayoutEffect==>activeSketch',
        // activeSketch.sketch,
        'lineStore',
        lineStore.current
      );
    }
  }, [activeSketch]);

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
    //remove all existing children if any
    app.stage.removeChildren();

    //add container to stage
    app.stage.addChild(annoRef);

    //get container
    container = document.getElementById('stage-container') as HTMLElement;
    const child = document.getElementById('stage-container')
      ?.firstChild as HTMLElement;

    if (child) {
      container.replaceChild(app.view, child);
    } else {
      //append app view to container
      container.appendChild(app.view);
    }

    //add event listeners
    container.addEventListener('mousemove', onMouseMove);

    container.addEventListener('mousedown', onMouseDown);

    container.addEventListener('mouseup', onMouseUp);
  }, [activeSketch]);

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

    //add new points
    lineStore.current[currentLine.current] = [
      ...lineStore.current[currentLine.current],
      { x, y },
    ];
  };

  const onMouseDown = (e: any) => {
    const mousePosRef = getMousePos(e);
    initPointer.current = mousePosRef;

    sprite = new Graphics();
    // sprite.lineStyle(2, 0xff0000, 1);
    sprite.moveTo(initPointer.current.x, initPointer.current.y);
    sprite.lineTo(mousePosRef.x, mousePosRef.y);

    annoRef.addChild(sprite);

    isMouseButtonDown.current = true;

    //assign line name
    const identifier = uuidv4();
    currentLine.current = identifier;
    lineStore.current[identifier] = [];
  };

  const onMouseUp = (e: any) => {
    isMouseButtonDown.current = false;
    // console.log('sketch', lineStore.current);
  };

  return (
    <React.Fragment>
      <SketchTool sketch={lineStore.current} />
      <div
        id="stage-container"
        style={{
          display: 'table',
        }}
      ></div>
    </React.Fragment>
  );
}
