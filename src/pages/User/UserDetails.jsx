import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Select,
} from 'antd';
import accountService from '../Service/AccountService';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';

const { Option } = Select;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};






function UserDetails() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams()

  const [roleStatus] = useState([
    {
      key: 1,
      type: "ADMIN"
    },
    {
      key: 2,
      type: "USER"
    },
  ]);


  useEffect(() => {
    getDetails();

  }, [])

  const getDetails = async () => {
    await accountService.getDetails(id).then((res) => {
      form.setFieldsValue({ id: res.data.id });
      form.setFieldsValue({ username: res.data.username });
      form.setFieldsValue({ email: res.data.email });
      form.setFieldsValue({ phone: res.data.phone });
      form.setFieldsValue({ role: res.data.role });
    });
  };


  const onFinish = async (values) => {
    let dataConverted = {
      "id": values.id,
      "username": values.username,
      "email": values.email,
      "password": values.password,
      "confirmPassword": values.confirmPassword,
      "phone": values.phone,
      'role': values.role
    };
    console.log(dataConverted)

    axios.put(`https://order-foods.herokuapp.com/api/v1/accounts/${values.id}`, dataConverted)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    navigate("/user/list")
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <>
      <PageContainer >
        <Card >
          <ProForm form={form} onFinish={onFinish} style={{width:"50%", marginLeft:"25%"}}
            onFinishFailed={onFinishFailed}>
            <ProFormText id='id' label="id" name="id" />
            <ProFormText id='username' label="username" name="username" rules={[{ required: true, message: 'Username cannot be empty!' }]} />
            <ProFormText id='email' label="Email" name="email" rules={[{ required: true, message: 'Email cannot be empty!' }]} />
            <ProFormText id='phone' label="phone" name="phone" rules={[{ required: true, message: 'Phone  cannot be empty!' }]} />
            <ProFormText.Password id='newpassword' label="new password" name="newpassword" rules={[{ required: true, message: 'Password cannot be empty!' }]} />
            <ProFormText.Password id='confirmPassword' label="Confirm password" name="confirmPassword" rules={[{ required: true, message: 'Password cannot be empty!' }]} />
            <Form.Item
              name="role"
              label="Role">
              <Select placeholder="select role">
                {roleStatus.map((item, index) => (
                  <Option key={index} value={item.key}>{item.key} - {item.type}</Option>
                ))}
              </Select>
            </Form.Item>
          </ProForm>
        </Card>
      </PageContainer>
    </>
  )
}

export default UserDetails