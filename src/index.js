import './config/globals';
import ReactDOM from 'react-dom';
import React from 'react';
import './assets/theme/index.scss';
import DefaultPage from './pages/DefaultPage';
import { Provider } from 'react-redux';
import reportWebVitals from './config/reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { store, persistor } from './config/store';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ToastContainer position='top-right' />
        <DefaultPage />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceworker.js')
      .then((reg) => console.log('Success: ', reg.scope))
      .catch((err) => console.log('Failure: ', err));
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();