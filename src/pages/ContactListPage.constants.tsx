import { Button, Popconfirm } from "antd";
import { ColumnsType } from "antd/lib/table";
import { GENDER_NAMES } from "constants/gender";
import { Contact, ContactGender } from "models/contact";

export const getContactListColumns = (onRemove: (id: number) => void) => {
  return [
    ...CONTACT_LIST_COLUMNS,
    {
      title: "Действия",

      key: "actions",
      render: (_, record) => (
        <div onClick={(event) => event.stopPropagation()}>
          <Popconfirm
            title="Вы действительно хотите удалить этот контакт?"
            onConfirm={() => onRemove(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger>Удалить</Button>
          </Popconfirm>
        </div>
      ),
    },
  ] as ColumnsType<Contact>;
};
export const CONTACT_LIST_COLUMNS: ColumnsType<Contact> = [
  {
    title: "Имя",
    dataIndex: "first_name",
    key: "name",
  },
  {
    title: "Фаилия",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Дата рождения",
    dataIndex: "birth_date",
    key: "birth_date",
  },
  {
    title: "Пол",
    dataIndex: "gender",
    render: (gender: ContactGender) => GENDER_NAMES[gender],
  },
];
