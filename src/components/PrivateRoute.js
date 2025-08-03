import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {(context) => (
      <Route
        {...rest}
        render={(props) =>
          !context.loading && !context.token ? (
            <Redirect to="/login" />
          ) : (
            <Component {...props} />
          )
        }
      />
    )}
  </AuthContext.Consumer>
);

export default PrivateRoute;
