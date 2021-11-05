import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import ProtectedRoutes from '../config/ProtectedRoutes';
import routes from '../config/routes';

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
              <ProtectedRoutes isAuth={false}>
                <route.component />
              </ProtectedRoutes>
            }
          />
        ))}
        <Route path='/Login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
