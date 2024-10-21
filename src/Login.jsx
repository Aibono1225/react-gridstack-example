import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, message, Modal, Spin } from "antd";

const { TabPane } = Tabs;

const Login = () => {
  const [activeTab, setActiveTab] = useState("2"); // 默认选中用户密码登录
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    const encodedURL =
      "https://vendor142v016.gaohuasec.com:44336/api/sso/authorize?client_id=LocalPortalWeb&redirect_uri=https%3A%2F%2Flocalhost%3A5174&response_type=code&scope=offline_access%20openid%20SSO&state=test";
    let decodedURL = decodeURIComponent(encodedURL);
    console.log("看下", decodedURL);
  }, []);

  const onTabChange = (key) => {
    if (!loading) {
      if (key === "1") {
        setLoading(true);
        // 模拟Windows自动登录请求
        setTimeout(() => {
          setLoading(false);
          message.success("Windows自动登录成功");
        }, 2000);
      }
      setActiveTab(key);
    }
  };

  const handleLogin = (values) => {
    setLoading(true);
    const { username, password } = values;
    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "password") {
        message.success("登录成功");
      } else {
        setLoginFailed(true);
      }
    }, 2000);
  };

  const handleCancel = () => {
    setLoginFailed(false);
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <Spin spinning={loading}>
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          tabBarStyle={{ opacity: loading ? 0.5 : 1 }}
        >
          <TabPane
            tab="Windows自动登录"
            key="1"
            className={loading ? "pointer-events-none" : ""}
          >
            <p>请确保您的Windows账户已经登录。</p>
          </TabPane>
          <TabPane
            tab="用户密码登录"
            key="2"
            className={loading ? "pointer-events-none" : ""}
          >
            <Form name="login_form" onFinish={handleLogin} layout="vertical">
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: "请输入用户名!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  disabled={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Spin>
      <Modal
        title="登录失败"
        visible={loginFailed}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleCancel}>
            确定
          </Button>,
        ]}
      >
        <p>用户名或密码错误，请重试。</p>
      </Modal>
    </div>
  );
};

export default Login;
