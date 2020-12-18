import React from 'react';
import ReactDOM from 'react-dom';
import ControlPanel from './components/ControlPanel/ControlPanel';
import './index.sass';

ReactDOM.render(
  <React.StrictMode>
    <ControlPanel/>
  </React.StrictMode>,
  document.querySelector('.app-main')
);
