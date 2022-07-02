import * as React from "react";
import { Menu } from "antd";
import { MENU_ITEMS } from "constants/menuItems";
import { useLocation, useNavigate } from "react-router";

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToLink = (key: string) => {
    navigate(key);
  };
  return (
    <Menu
      selectedKeys={[location.pathname]}
      onClick={({ key }) => goToLink(key)}
      mode="horizontal"
      items={MENU_ITEMS}
    />
  );
};
