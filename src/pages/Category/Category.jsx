import React, { useState } from 'react';
import { ProForm, ProFormText, PageContainer, ProFormTextArea } from '@ant-design/pro-components';
import { Card, Form, Select, message } from 'antd';
import { useNavigate, } from 'react-router-dom';
import categoryService from "../Service/CategoryService";



const { Option } = Select;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};


function Category() {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [categoryStatus] = useState([
    {
      key: 1,
      type: "ACTIVE"
    },
    {
      key: 2,
      type: "DEACTIVE"
    },

  ])

  const handleChangeStatus = (ev) => {
    setStatus(ev.target.value)

  }


  const onFinish = async (values) => {
    let dataConverted = {
      "description": values.description,
      "name": values.name,
      "status": values.status,
      "thumbnail": values.thumbnail
    };
    console.log("dataconverd", dataConverted)
    await categoryService.createNew(dataConverted)
      .then(res => {
        message.success('Create Category Success!');
        console.log("create success", res.data);
      }).catch(err => {
        message.error('Create Category Fail!');
        console.log("create fail", err);
      })
    navigate("/category/list")
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <>
      <PageContainer form={form}>
        <Card>
          <ProForm onFinish={onFinish} style={{ width: "50%", marginLeft: "25%" }}
            onFinishFailed={onFinishFailed}>
            <ProFormText
              id="name"
              label="Name"
              placeholder="Please enter Name!"
              name="name" rules={[{ required: true, message: 'Category cannot be empty!' }]} />
            <Form.Item
              id="status"
              name="status"
              label="Status"
              value={status}

              onChange={handleChangeStatus}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Please select Status">
                {categoryStatus.map((item, index) => (
                  <Option key={index} value={item.id}>{item.type}</Option>
                ))}
              </Select>
            </Form.Item>
            <ProFormText
              name="thumbnail"
              label="Thumbnail"
              placeholder="Please enter Thumbnail"
            />
            <ProFormTextArea
              name="dedescriptions"
              label="Description"
              placeholder="Please enter Description..."
            />
          </ProForm>
        </Card>
      </PageContainer>
    </>
  )
}

export default Category