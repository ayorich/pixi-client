import { useState, ReactNode, useRef } from 'react';

import { createContext, useContext } from 'react';

type sketchTypes = {
  sketches: [];
  colloborators: [];
  activeSketch: any;
  setSketches: React.Dispatch<any>;
  setColloborators: React.Dispatch<any>;
  setActiveSketch: React.Dispatch<any>;
  lineStore: any;
  currentLine: any;
};

const SketchContext = createContext<sketchTypes>({
  sketches: [],
  setSketches: () => {},
  colloborators: [],
  setColloborators: () => {},
  activeSketch: null,
  setActiveSketch: () => {},
  lineStore: {},
  currentLine: null,
});

export const useSketchContext = () => useContext(SketchContext);

export default function SketchProvider({ children }: { children: ReactNode }) {
  const [sketches, setSketches] = useState<any>([]);
  const [activeSketch, setActiveSketch] = useState<any>(null);
  const [colloborators, setColloborators] = useState<any>([]);

  const lineStore = useRef<any>({});
  const currentLine = useRef<any>(null);

  return (
    <SketchContext.Provider
      value={{
        sketches,
        setSketches,
        colloborators,
        setColloborators,
        activeSketch,
        setActiveSketch,

        lineStore,
        currentLine,
      }}
    >
      {children}
    </SketchContext.Provider>
  );
}
