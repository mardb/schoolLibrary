import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom'
//change to stateless component
const UserSignOut = ({context}) => {
const {push} = useHistory();

useEffect(() => {
  context.actions.UserSignOut();
  push('/')
}, [])
  return(
    <> Signing you out...</>
  )
}

export default UserSignOut;