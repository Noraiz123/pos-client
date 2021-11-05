import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({ isAuth, component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={() => {
          if (isAuth) {
            return <Component />;
          } else {
            return <Redirect to='/Login' />;
          }
        }}
      />
    </div>
  );
};

export default ProtectedRoutes;
