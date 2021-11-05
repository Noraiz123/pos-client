import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoutes from '../config/ProtectedRoutes';
import routes from '../config/routes';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <ProtectedRoutes
            path={route.path}
            exact={route.exact}
            key={index}
            component={route.component}
            isAuth={false}
          />
        ))}
        <Route path='/Login' render={() => <div>This is Login Page</div>} />
      </Switch>
    </Router>
  );
}

export default App;
