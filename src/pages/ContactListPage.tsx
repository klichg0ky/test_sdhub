import * as React from "react";
import { useNavigate } from "react-router";
import { Spin, Table } from "antd";

import { AppLayout } from "components/AppLayout";

import { Contact } from "models/contact";
import { ContactApi } from "services/api/ContactApi";
import { getContactListColumns } from "./ContactListPage.constants";
import { ROUTER_NAMES } from "router/routerNames";

export const ContactListPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [contacts, setContacts] = React.useState<Contact[]>([]);

  const goToDetails = (id: number) => {
    navigate(`/${id}`);
  };

  const getContacts = async () => {
    try {
      const { data } = await ContactApi.getContactList();
      setContacts(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getContacts();
  }, []);

  const onRemoveContact = async (id: number) => {
    try {
      await ContactApi.deleteContact(id);
      getContacts();
    } catch (error) {}
  };

  if (loading) {
    return <Spin size="large" />;
  }
  return (
    <AppLayout title="Список контактов">
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              goToDetails(record.id);
            },
          };
        }}
        columns={getContactListColumns(onRemoveContact)}
        dataSource={contacts}
      />
    </AppLayout>
  );
};
