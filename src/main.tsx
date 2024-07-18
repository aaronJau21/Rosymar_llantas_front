import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { RosyMar } from './RosyMar';
import Modal from 'react-modal';

Modal.setAppElement('#root');
ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    <RosyMar />
  </React.StrictMode>,
);
