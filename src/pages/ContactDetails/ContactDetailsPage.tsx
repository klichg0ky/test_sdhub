import * as React from "react";
import { Button, Card, Descriptions, message, Modal, Popconfirm } from "antd";

import { AppLayout } from "components/AppLayout";
import { useNavigate, useParams } from "react-router";
import { ContactApi } from "services/api/ContactApi";
import { Contact } from "models/contact";
import { GENDER_NAMES } from "constants/gender";
import { ROUTER_NAMES } from "router/routerNames";
import { AppLoader } from "components/AppLoader";
import { ContactForm } from "components/ContactForm";

export const ContactDetailsPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id as string;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [disabled, setDisabled] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  const [contact, setContact] = React.useState<Contact | null>(null);

  const openEditModal = () => {
    setEditVisible(true);
  };

  const closeEditModal = () => {
    setEditVisible(false);
  };
  const goToList = () => {
    navigate(ROUTER_NAMES.CONTACT_LIST);
  };
  const getContact = async () => {
    try {
      setLoading(true);
      const { data } = await ContactApi.getContactById(id);
      setContact(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onRemove = async () => {
    await ContactApi.deleteContact(id);
    message.success("Вы успешно удалили контакт");
    goToList();
  };

  const onEditContact = async (contact: Contact) => {
    try {
      setDisabled(true);
      const { data } = await ContactApi.updateContact(id, contact);
      closeEditModal();
      message.success("Контакт отредактирован");
      setContact(data);
    } catch (error) {
    } finally {
      setDisabled(false);
    }
  };

  React.useEffect(() => {
    getContact();
  }, []);

  if (loading || !contact) {
    return <AppLoader />;
  }

  const fullName = `${contact.first_name} ${contact.last_name}`;
  return (
    <>
      <AppLayout
        title="Детали"
        subTitle={fullName}
        extra={[
          <Popconfirm
            title="Вы действительно хотите удалить этот контакт?"
            onConfirm={() => onRemove()}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger>Удалить</Button>
          </Popconfirm>,
          <Button onClick={openEditModal} type="primary">
            Редактировать
          </Button>,
        ]}
      >
        <Card>
          <Descriptions size="middle" column={3}>
            <Descriptions.Item label="Имя">
              {contact.first_name}
            </Descriptions.Item>
            <Descriptions.Item label="Фамилия">
              {contact.last_name}
            </Descriptions.Item>
            <Descriptions.Item label="Пол">
              {GENDER_NAMES[contact.gender]}
            </Descriptions.Item>

            <Descriptions.Item label="Профессия">
              {contact.job}
            </Descriptions.Item>
            <Descriptions.Item label="Дата рождения">
              {contact.birth_date}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions>
            <Descriptions.Item label="Биография">
              {contact.biography}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </AppLayout>
      <Modal
        visible={editVisible}
        onCancel={closeEditModal}
        width={800}
        title="Редактирование контакта"
        footer={null}
      >
        <ContactForm
          initialValues={contact}
          button="Редактировать"
          onFinish={onEditContact}
          disabled={disabled}
        />
      </Modal>
    </>
  );
};
