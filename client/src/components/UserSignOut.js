//eslint-disable-next-line
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UserSignOut = ({ context }) => {
  const { push } = useHistory();

  useEffect(() => {
    context.actions.signOut();
    push('/');
  }, []);
  return <> Signing you out...</>;
};

export default UserSignOut;
