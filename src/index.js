import './config/globals';
import ReactDOM from 'react-dom';
import './assets/theme/index.css';
import DefaultPage from './pages/DefaultPage';
import { Provider } from 'react-redux'
import reportWebVitals from './config/reportWebVitals';

import store from './config/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DefaultPage />
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
