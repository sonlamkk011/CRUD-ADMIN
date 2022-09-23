import React, { useState } from 'react';
import { ProForm, ProFormDigit, ProFormText, PageContainer } from '@ant-design/pro-components';
import { Card, Form, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import accountService from '../Service/AccountService';



function CreateUser() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [Role] = useState([
    {
      key: 1,
      type: "ADMIN"
    },
    {
      key: 2,
      type: "USER"
    },
  ]);

  const onFinish = async (values) => {
    let dataConverted = {
      "accountRole": values.accountRole,
      "email": values.email,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "password": password.values,
      "phone": values.phone
    };
    console.log("🚀  dataConverted", dataConverted)
    await accountService.createNew(dataConverted)
      .then(res => {
        console.log("🚀CREATE USER", res.data)

      }).catch(err => {
        console.log("🚀 CREATE USER ERROR", err)
      })
    // message.success('Create successful users!');
    // navigate("/user/list")
  };

  const onFinishFailed = (errorInfo) => {
    console.log("🚀 ~ file: CreateUser.jsx ~ line 37 ~ onFinishFailed ~ errorInfo", errorInfo)
  };

  return (
    <>
      <PageContainer>
        <Card>
          <ProForm form={form} onFinish={onFinish} style={{ width: "50%", marginLeft: "25%" }}
            onFinishFailed={onFinishFailed}>
            <ProFormText id='firstName' label="firstName" name="firstName" rules={[{ required: true, message: 'firstName cannot be empty!' }]} />
            <ProFormText id='lastName' label="lastName" name="lastName" rules={[{ required: true, message: 'lastName cannot be empty!' }]} />
            <ProFormText id='email' label="Email" name="email" rules={[{ required: true, message: 'Email cannot be empty!' }]} />
            <ProFormText id='phone' label="phone" name="phone" rules={[{ required: true, message: 'Phone cannot be empty!' }]} />
            <Form.Item
              name="role"
              label="Role"
            >
              <Select placeholder="select role">
                {Role.map((item, index) => (
                  <Option key={index} value={item.key}>{item.type}</Option>
                ))}
              </Select>
            </Form.Item>
            <ProFormText.Password id='password' label="Password" name="password" rules={[{ required: true, message: 'Password cannot be empty!' }]} />
            {/* <ProFormText.Password id='confirmpassword' label="confirmPassword" name="confirmPassword" rules={[{ required: true, message: 'confirmpassword cannot be empty!' }]} /> */}
          </ProForm>
        </Card>
      </PageContainer>
    </>
  );
}

export default CreateUser