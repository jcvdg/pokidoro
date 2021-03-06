import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth.action';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();

  dispatch(logout());

  return (
    <div>
      Logging out ...
      <Navigate to="/auth" />
    </div>
  )
}

export default Logout;