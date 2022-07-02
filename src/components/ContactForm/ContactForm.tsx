import * as React from "react";
import moment from "moment";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { GENDER_LIST } from "constants/gender";

import styles from "./ContactForm.module.scss";
import { Contact } from "models/contact";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const buttonWrapperCol = {
  offset: 4,
  span: 20,
};

const INPUTS_LENGTH = {
  FIRST_NAME: 256,
  LAST_NAME: 256,
  JOB: 256,
  BIOGRAPHY: 1024,
};

interface Props {
  onFinish(values: Contact): void;
  button: string;
  disabled: boolean;
  initialValues?: Contact;
}

export const ContactForm: React.FC<Props> = ({
  onFinish,
  button,
  disabled,
  initialValues,
}) => {
  return (
    <Form
      name="basic"
      initialValues={{
        is_active: false,
        ...(initialValues
          ? {
              ...initialValues,
              birth_date: moment(new Date(initialValues?.birth_date)),
            }
          : {}),
      }}
      onFinish={(values) => {
        onFinish({
          ...values,
          birth_date: moment(new Date(values.birth_date)).format("YYYY-MM-DD"),
        });
      }}
      onFinishFailed={() => {}}
      autoComplete="off"
    >
      <Form.Item
        {...formItemLayout}
        label="Имя"
        name="first_name"
        rules={[{ required: true, message: "Введите имя" }]}
      >
        <Input maxLength={INPUTS_LENGTH.FIRST_NAME} />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Фамилия"
        name="last_name"
        rules={[{ required: true, message: "Введите фамилию" }]}
      >
        <Input maxLength={INPUTS_LENGTH.LAST_NAME} />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        required
        label="Дата рождения"
        name="birth_date"
        rules={[{ required: true, message: "Выберите дату рождения" }]}
      >
        <DatePicker
          className={styles.datepicker}
          placeholder="Выберите дату"
          disabledDate={(d) => !d || d.isAfter(new Date())}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Пол"
        name="gender"
        rules={[
          {
            required: true,
            message: "Выберите пол",
          },
        ]}
      >
        <Select>
          {GENDER_LIST.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Профессия"
        name="job"
        rules={[{ required: true, message: "Введите профессию" }]}
      >
        <Input maxLength={INPUTS_LENGTH.JOB} />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Биография"
        name="biography"
        rules={[{ required: true, message: "Заполните биографию" }]}
      >
        <Input.TextArea maxLength={INPUTS_LENGTH.BIOGRAPHY} />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="is_active"
        label="Активный"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item wrapperCol={buttonWrapperCol}>
        <Button
          disabled={disabled}
          htmlType="submit"
          className={styles.button}
          type="primary"
          size="large"
        >
          {button}
        </Button>
      </Form.Item>
    </Form>
  );
};
