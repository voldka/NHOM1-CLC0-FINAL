import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectors } from '../../stores';

const LoggedInPermission = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectors.selectUserInfo);

  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('backToUrl', window.location.pathname);
      return navigate('/dang-nhap');
    }
  }, []);

  return <>{children}</>;
};

export default LoggedInPermission;
