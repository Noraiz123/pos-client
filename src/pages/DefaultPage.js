import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '../config/routes';
import React from 'react';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.path} exact={route.exact} key={index} element={<route.component />} />
        ))}
        <Route path='/Login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
