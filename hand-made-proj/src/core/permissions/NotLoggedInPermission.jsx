import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectors } from '../../stores';

const NotLoggedInPermission = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectors.selectUserInfo);

  useEffect(() => {
    if (currentUser) {
      return navigate(-1);
    }
  }, []);

  return <>{children}</>;
};

export default NotLoggedInPermission;
