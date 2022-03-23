import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from '../config/routes';
import React, { useEffect } from 'react';
import LoginPage from './LoginPage';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <Router>
      {isLoading && <Loader />}
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
