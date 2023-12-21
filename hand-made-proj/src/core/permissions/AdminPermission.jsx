import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectors } from '../../stores';

const AdminPermission = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectors.selectUserInfo);

  useEffect(() => {
    if (!currentUser) {
      return navigate('/dang-nhap');
    }
    if (!currentUser.isAdmin) {
      return navigate(-1);
    }
  }, []);

  return <>{children}</>;
};

export default AdminPermission;
