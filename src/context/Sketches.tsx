import { useState, ReactNode } from 'react';

import { createContext, useContext } from 'react';

type sketchTypes = {
  sketches: [];
  colloborators: [];
  activeSketch: null;
  setSketches: React.Dispatch<any>;
  setColloborators: React.Dispatch<any>;
  setActiveSketch: React.Dispatch<any>;
};

const SketchContext = createContext<sketchTypes>({
  sketches: [],
  setSketches: () => {},
  colloborators: [],
  setColloborators: () => {},
  activeSketch: null,
  setActiveSketch: () => {},
});

export const useSketchContext = () => useContext(SketchContext);

export default function SketchProvider({ children }: { children: ReactNode }) {
  const [sketches, setSketches] = useState<any>([]);
  const [activeSketch, setActiveSketch] = useState<any>(null);
  const [colloborators, setColloborators] = useState<any>([]);

  return (
    <SketchContext.Provider
      value={{
        sketches,
        setSketches,
        colloborators,
        setColloborators,
        activeSketch,
        setActiveSketch,
      }}
    >
      {children}
    </SketchContext.Provider>
  );
}
