import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalTimeSpentWatcher from './utils/GlobalTimeSpentWatcher';
import SpentTimeRepository from './data/SpentTimeRepository';

let spentTimeRepository = SpentTimeRepository.getInstance();

let onSpentTimeChangedListener = (elapsedTime: number, timeDiff: number) => {
  spentTimeRepository.updateTopTimeSpent(elapsedTime)
    .then(_ => spentTimeRepository.updateOverallTimeSpent(timeDiff))
    .catch(e => console.error(e));
}

// init singleton objects
GlobalTimeSpentWatcher.getInstance()
  .addListener(onSpentTimeChangedListener);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
