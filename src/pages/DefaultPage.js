import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '../config/ProtectedRoutes';
import routes from '../config/routes';
import React from 'react';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            path={route.path}
            exact={route.exact}
            key={index}
            element={
              <ProtectedRoutes isAuth={true}>
                <route.component />
              </ProtectedRoutes>
            }
          />
        ))}
        <Route path='/Login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
