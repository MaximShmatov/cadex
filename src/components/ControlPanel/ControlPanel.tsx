import React, {useRef, useState} from 'react';
import TriangulationBox from '../TriangulationBox/TriangulationBox';
import './styles.sass';

const ControlPanel = () => {
  const initBox: TBoxGeometry = {
    x: 0,
    y: 0,
    z: 0,
    vertices: [],
    triangles: [],
  }
  const width = useRef<HTMLInputElement>(null);
  const height = useRef<HTMLInputElement>(null);
  const dept = useRef<HTMLInputElement>(null);

  const [boxGeometryState, setBoxGeometryState] = useState(initBox);

  const url = 'https://apishare.herokuapp.com/triangulation_box';

  const getBoxValues = () => {
    if (width.current !== null && height.current !== null && dept.current !== null) {
      const get = `?width=${width.current.value}&height=${height.current.value}&dept=${dept.current.value}`;
      fetch(url + get)
        .then(res => res.json())
        .then(data => setBoxGeometryState(data));
    }
  };

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
            ref={width}
            defaultValue={200}
          />
          Width
        </label>
        <label className="control__panel-item">
          <input
            className="control__max-value"
            type="number"
            ref={height}
            defaultValue={200}
          />
          Height
        </label>
        <label className="control__panel-item">
          <input
            className="control__value-from"
            type="number"
            ref={dept}
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
