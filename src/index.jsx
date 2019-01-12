import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';

import App from './components/App';

render(<App/>, document.querySelector('#root'));
