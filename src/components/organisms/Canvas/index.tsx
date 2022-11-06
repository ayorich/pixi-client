import React, { ReactElement, useEffect, useRef } from 'react';
import { Application, Container, Graphics } from 'pixi.js';
import SketchTool from '../SketchTool';
import { v4 as uuidv4 } from 'uuid';
import { useSketchContext } from '../../../context/Sketches';
import { useAuthContext } from '../../../context/Auth';
import apiService from '../../../utils/apiServices';

let app = new Application({
  width: 900,
  height: 450,
  backgroundColor: 0xffffff,
});

export default function Canvas(): ReactElement {
  const { user } = useAuthContext();

  const { activeSketch, lineStore, currentLine } = useSketchContext();
  let sprite = new Graphics();
  let annoRef = new Container();

  const canvas = useRef<HTMLElement>();
  let container = canvas.current;
  const isMouseButtonDown = useRef(false);
  const initPointer = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (activeSketch) {
      lineStore.current = {};
      currentLine.current = null;

      sprite = new Graphics();
      // sprite.lineStyle(2, 0xff0000, 1);
      annoRef.addChild(sprite);

      //save sketch to store
      lineStore.current = activeSketch?.sketch || {};

      Object.keys(lineStore.current).forEach((key: string) => {
        sprite.lineStyle(2, lineStore.current[key].color, 1);

        sprite.moveTo(
          lineStore.current[key].sketch[0].x,
          lineStore.current[key].sketch[0].y
        );

        lineStore.current[key].sketch.forEach(({ x, y }: any, i: number) => {
          if (i !== 0) {
            sprite.lineTo(x, y);
          }
        });
      });
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

    return () => {
      container?.removeEventListener('mousemove', onMouseMove);
      container?.removeEventListener('mousedown', onMouseDown);
      container?.removeEventListener('mouseup', onMouseUp);
    };
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
      sprite.lineStyle(2, lineStore.current[key].color, 1);

      sprite.moveTo(initPointer.current.x, initPointer.current.y);
      lineStore.current[key].sketch.forEach(({ x, y }: any) => {
        sprite.lineTo(x, y);
      });
    });

    //add new points
    lineStore.current[currentLine.current].sketch = [
      ...lineStore.current[currentLine.current].sketch,
      { x, y },
    ];
  };

  const onMouseDown = (e: any) => {
    const mousePosRef = getMousePos(e);
    initPointer.current = mousePosRef;

    sprite = new Graphics();

    annoRef.addChild(sprite);

    isMouseButtonDown.current = true;

    //assign line name
    const identifier = uuidv4();
    currentLine.current = identifier;

    lineStore.current[identifier] = {
      color: user.color.replace('#', '0x'),
      sketch: [],
    };
  };

  const onMouseUp = async (e: any) => {
    isMouseButtonDown.current = false;

    Object.keys(lineStore.current).forEach((key) => {
      if (lineStore.current[key].sketch.length === 0) {
        delete lineStore.current[key];
      }
    });

    if (activeSketch) {
      console.log('active', activeSketch);
      //autosave for users
      await apiService(`/sketches/${activeSketch._id}`, 'PATCH', {
        sketch: lineStore.current,
        user: [...activeSketch.user, user._id],
      });
    }
  };

  return (
    <React.Fragment>
      {!activeSketch && <SketchTool />}
      <div
        id="stage-container"
        style={{
          display: 'table',
        }}
      ></div>
    </React.Fragment>
  );
}
