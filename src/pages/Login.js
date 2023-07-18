import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
// import firebase from "../firebase";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login } = useLogin();
  // Link , NavLink , useNavigate
  const navigate = useNavigate();

  //로그인

  const onFinish = values => {
    console.log("Success:", values);
    try {
      login(values.email, values.password);
    } catch (err) {
      console.log(err);
    }
    //firebase 로그인 시도
    // try {
    //   //values 이 부분은 원래는 state
    //   await firebase
    //     .auth()
    //     .signInWithEmailAndPassword(values.email, values.password);
    //   console.log("로그인 성공");
    //   //로그인 된 사용자 정보를 가지고 옴.
    //   const user = firebase.auth().currentUser;
    //   console.log(user);
    //   setFBName(user.displayName);
    //   setFBEmail(user.email);
    //   setFBUid(user.uid);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error.code);

    //   setIsModalOpen(true);

    //   if (error.code === "auth/invalid-email") {
    //     setModalMessage("올바른 이메일 형식이 아닙니다.");
    //   } else if (error.code === "auth/wrong-password") {
    //     setModalMessage("올바르지않은 비밀번호입니다.");
    //   } else if (error.code === "auth/user-not-found") {
    //     setModalMessage("가입되지 않은 사용자 입니다.");
    //   } else if (error.code === "auth/missing-email") {
    //     setModalMessage("이메일이 입력되지않았습니다.");
    //   } else {
    //     setModalMessage("로그인이 실패하였습니다.");
    //   }
    //   showModal();
    // }
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
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
