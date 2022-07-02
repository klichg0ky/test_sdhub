import * as React from "react";
import { Row, Spin } from "antd";

export const AppLoader: React.FC = () => {
  return (
    <Row justify="center">
      <Spin size="large" />
    </Row>
  );
};
