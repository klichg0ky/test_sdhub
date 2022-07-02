import * as React from "react";

import { Col, Layout, PageHeader, PageHeaderProps, Row } from "antd";

import styles from "./AppLayout.module.scss";
import { useNavigate } from "react-router";
interface Props extends PageHeaderProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children, ...props }) => {
  const navigate = useNavigate();
  return (
    <Layout className={styles.container}>
      <Row justify="center" gutter={16}>
        <Col span={22}>
          <PageHeader onBack={() => navigate(-1)} {...props}>
            {children}
          </PageHeader>
        </Col>
      </Row>
    </Layout>
  );
};
