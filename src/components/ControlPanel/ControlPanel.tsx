import React, {useRef, useState, useCallback, useEffect, useMemo} from 'react';
import TriangulationBox from '../TriangulationBox/TriangulationBox';
import './styles.sass';

const ControlPanel = () => {
  const initBox: TBoxGeometry = useMemo(() => {
    return {
      x: 0,
      y: 0,
      z: 0,
      vertices: [],
      triangles: [],
    }
  }, [])

  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const deptRef = useRef<HTMLInputElement>(null);
  const [boxGeometryState, setBoxGeometryState] = useState(initBox);

  const getBoxValues = useCallback(() => {
    const url = 'https://apishare.herokuapp.com/';
    const width = Number(widthRef.current?.value);
    const height = Number(heightRef.current?.value);
    const dept = Number(deptRef.current?.value);

    if (width > 0 && height > 0 && dept > 0) {
      const get = `triangulation_box?width=${width}&height=${height}&dept=${dept}`;
      fetch(url + get)
        .then(res => res.json())
        .then(data => setBoxGeometryState(data), error => console.error(error));
    }
  }, []);

  useEffect(() => getBoxValues(), [getBoxValues])

  return (
    <form className="control">
      <div className="control__element">
        <TriangulationBox {...boxGeometryState}/>
      </div>
      <fieldset className="control__panel">
        <legend>
          Control Panel
        </legend>
        <label className="control__panel-item">
          <input
            className="control__min-value"
            type="number"
            ref={widthRef}
            defaultValue={200}
          />
          Width
        </label>
        <label className="control__panel-item">
          <input
            className="control__max-value"
            type="number"
            ref={heightRef}
            defaultValue={200}
          />
          Height
        </label>
        <label className="control__panel-item">
          <input
            className="control__value-from"
            type="number"
            ref={deptRef}
            defaultValue={200}
          />
          Dept
        </label>
        <button
          className="control__panel-button"
          type="button"
          onClick={getBoxValues}
        >
          Create Box
        </button>
      </fieldset>
    </form>
  );
}

export default ControlPanel;
