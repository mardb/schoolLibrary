import React, { useContext } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  const context = useContext(Consumer)
  return (
    // <Consumer>
    //   {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
    //   )}
    // </Consumer>
  );
};


