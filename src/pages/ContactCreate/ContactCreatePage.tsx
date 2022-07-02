import * as React from "react";
import { useNavigate } from "react-router";

import { AppLayout } from "components/AppLayout";
import { ContactForm } from "components/ContactForm";
import { ContactApi } from "services/api/ContactApi";
import { Contact } from "models/contact";
import { ROUTER_NAMES } from "router/routerNames";
import { Card } from "antd";

export const ContactCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = React.useState(false);
  const addContact = async (contact: Contact) => {
    try {
      setDisabled(true);
      await ContactApi.addContact(contact);
      navigate(ROUTER_NAMES.CONTACT_LIST);
    } catch (error) {
    } finally {
      setDisabled(false);
    }
  };

  return (
    <AppLayout title="Создать контакт">
      <Card>
        <ContactForm
          disabled={disabled}
          onFinish={addContact}
          button="Создать"
        />
      </Card>
    </AppLayout>
  );
};
