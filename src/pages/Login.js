import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Modal } from "antd";
// import { asyncLoginFetch } from "../reducers/actions";
import { useDispatch } from "react-redux";
import { sagaLoginFB } from "../reducers/fbAuthSlice";
// import { useLogin } from "../hooks/useFirebase";

const Login = () => {
  //return 한것 중에 login만 쓰겠다.
  // const { login } = useLogin();

  // Link , NavLink , useNavigate
  const navigate = useNavigate();

  //로그인
  const dispatch = useDispatch();
  const onFinish = async values => {
    // login(values.email, values.password);

    //dispatch 를 통해서 액션을 만들어/액션 담거나

    // try {
    //   await dispatch(
    //     //dispatch에서 매개변수가 필요하면 객체로 만들어주자.
    //     asyncLoginFetch({ email: values.email, password: values.password }),
    //   ).unwrap();
    //   //후속처리
    //   navigate("/");
    // } catch (err) {
    //   console.log(err);
    // }

    dispatch(sagaLoginFB({ email: values.email, password: values.password }));
  };
  const onFinishFailed = errorInfo => {
    //console.log("Failed:", errorInfo);
  };
  //Modal 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 m-auto mt-5 shadow rounded-md bg-white">
      <h2>Login</h2>
      {/* AntD Modal */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>
      {/* AntD form  */}
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",

              required: true,
              message: "이메일을 입력해주세요",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요",
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error("At least 6 passengers"));
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button">Reset</Button>
            <Button type="link" htmlType="button">
              Fill form
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
