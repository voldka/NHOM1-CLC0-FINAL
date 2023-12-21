import { LoginOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Tooltip } from "antd";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import BagIcon from "../../../assets/icon/bagIcon.svg";
import LogoutIcon from "../../../assets/icon/logoutIcon.svg";
import NoteIcon from "../../../assets/icon/noteIcon.svg";
import Logo from "../../../assets/img/logo_cut_trans.png";
import { actions, selectors } from "../../../stores";
import "./style.scss";

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
        key: "1",
        label: (
          <div
            onClick={() => {
              return handleNavigate("/thong-tin-ca-nhan");
            }}
          >
            Thông tin cá nhân
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            onClick={() => {
              localStorage.removeItem("user");
              dispatch(actions.resetUser());
              dispatch(actions.setCartProducts([]));
              return handleNavigate("/");
            }}
          >
            Đăng xuất
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <header>
        <div className="header-container">
          <div className="down">
            <NavLink to="/" className="logo">
              <img
                src={Logo}
                alt="logo"
                style={{ width: "auto", height: "60px" }}
              />
            </NavLink>
            <Button
              type="primary"
              size="large"
              onClick={() => handleNavigate("/")}
            >
              Trang chủ
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => handleNavigate("/cua-hang")}
            >
              Sản phẩm
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => handleNavigate("/ve-chung-toi")}
            >
              Giới thiệu
            </Button>
            <Button type="primary" size="large">
              Mã giảm giá
            </Button>
            <Button
              icon={<SearchOutlined />}
              size="large"
              onClick={() => handleNavigate("/cua-hang#search")}
            >
              Search
            </Button>

            <div className="up">
              {!userInfo ? (
                <Button
                  icon={<LoginOutlined />}
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#16a34a", color: "#ffffff" }}
                  onClick={() => handleNavigate("/dang-nhap")}
                >
                  Đăng nhập
                </Button>
              ) : (
                <>
                  <Tooltip title="Giỏ hàng">
                    <Badge
                      count={
                        products && products.length ? products.length : null
                      }
                    >
                      <div
                        className="icon-up"
                        onClick={() => handleNavigate("/gio-hang-cua-toi")}
                      >
                        <img src={BagIcon} alt="logo" />
                      </div>
                    </Badge>
                  </Tooltip>
                  <Tooltip
                    title="Đơn hàng"
                    onClick={() => handleNavigate("/don-hang-cua-toi")}
                  >
                    <div className="icon-up">
                      <img src={NoteIcon} alt="logo" />
                    </div>
                  </Tooltip>
                  <div className="icon-up">
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottom"
                      arrow
                    >
                      <Avatar
                        src={userInfo.avatar}
                        size="large"
                        icon={<UserOutlined />}
                      />
                    </Dropdown>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
