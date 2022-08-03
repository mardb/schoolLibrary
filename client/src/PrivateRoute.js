import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//destructures component prop in function params
export default ({ component: Component, ...rest }) => {
  const context = useContext(Consumer);
  return (
    <Route
      {...rest}
      render={(props) =>
        context.authenticatedUser ? (
          <Component {...props} />
        ) : (
          //redirects to signin if the user requries to be signed in, authenticated
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
