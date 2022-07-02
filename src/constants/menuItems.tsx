import { PlusOutlined } from "@ant-design/icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { ROUTER_NAMES } from "router/routerNames";

export const MENU_ITEMS: ItemType[] = [
  {
    label: "Список",
    key: ROUTER_NAMES.CONTACT_LIST,
  },
  {
    label: "Создать контакт",
    key: ROUTER_NAMES.CONTACT_CREATE,
    icon: <PlusOutlined />,
  },
];
