import { Avatar, Badge, Button, Dropdown, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import BagIcon from '../../../assets/icon/bagIcon.svg';
import LogoutIcon from '../../../assets/icon/logoutIcon.svg';
import NoteIcon from '../../../assets/icon/noteIcon.svg';
import SearchIcon from '../../../assets/icon/searchIcon.svg';
import AvatarIcon from '../../../assets/img/avatar-2.png';
import Logo from '../../../assets/img/logo.svg';
import { actions, selectors } from '../../../stores';
import './style.scss';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectors.selectUserInfo);
  const products = useSelector(selectors.selectProducts);

  const handleNavigate = (direction) => {
    navigate(direction);
  };

  const items = useMemo(() => {
    return [
      {
        key: '1',
        label: (
          <div
            onClick={() => {
              return handleNavigate('/thong-tin-ca-nhan');
            }}>
            Thông tin cá nhân
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div
            onClick={() => {
              localStorage.removeItem('user');
              dispatch(actions.resetUser());
              dispatch(actions.setCartProducts([]));
              return handleNavigate('/');
            }}>
            Đăng xuất
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <header>
        <NavLink to='/'>
          <img src={Logo} alt='logo' style={{ width: '210px', height: '150px' }} />
        </NavLink>
        <div className='header-container'>
          <div className='up'>
            <div className='input'>
              <input
                placeholder='Tìm kiếm tại đây ...'
                onClick={() => navigate('/cua-hang#search')}
                readOnly
              />
              <div className='incon-search'>
                <img src={SearchIcon} alt='logo' />
              </div>
            </div>
            {!userInfo ? (
              <>
                <Tooltip title='Đăng nhập/Đăng ký'>
                  <div className='icon-up' onClick={() => handleNavigate('/dang-nhap')}>
                    <img src={LogoutIcon} alt='logo' />
                  </div>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title='Giỏ hàng'>
                  <Badge count={products && products.length ? products.length : null}>
                    <div className='icon-up' onClick={() => handleNavigate('/gio-hang-cua-toi')}>
                      <img src={BagIcon} alt='logo' />
                    </div>
                  </Badge>
                </Tooltip>
                <Tooltip title='Đơn hàng' onClick={() => handleNavigate('/don-hang-cua-toi')}>
                  <div className='icon-up'>
                    <img src={NoteIcon} alt='logo' />
                  </div>
                </Tooltip>
                <div className='icon-up'>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement='bottom'
                    arrow>
                    <Avatar src={userInfo.avatar} size='large' icon={<UserOutlined />} />
                  </Dropdown>
                </div>
              </>
            )}
          </div>
          <div className='down'>
            <Button type='primary' size='large' onClick={() => handleNavigate('/')}>
              Trang chủ
            </Button>
            <Button type='primary' size='large' onClick={() => handleNavigate('/cua-hang')}>
              Sản phẩm
            </Button>
            <Button type='primary' size='large' onClick={() => handleNavigate('/ve-chung-toi')}>
              Giới thiệu
            </Button>
            <Button type='primary' size='large'>
              Mã giảm giá
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
