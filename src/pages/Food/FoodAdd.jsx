import React, { useState, useEffect } from 'react';
import { ProForm, ProFormDigit, ProFormText, ProFormTextArea, PageContainer } from '@ant-design/pro-components';
import { Card, Form, Select, Spin, message, Image } from 'antd';
import categoryService from '../Service/CategoryService';
import { useNavigate } from "react-router-dom";
import foodService from '../Service/FoodService';


const { Option } = Select;
// const normFile = (e) => {
//   console.log('Upload event:', e);

//   if (Array.isArray(e)) {
//     return e;
//   }

//   return e?.fileList;
// };



function Food() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false)



  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()




    data.append('file', files[0])
    data.append('upload_preset', 'vuuqobal')
    setLoading(true)
    const res = await fetch("https://api.cloudinary.com/v1_1/smiley-face/image/upload",
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    console.log(file)
    setImages(file.secure_url)
    setLoading(false)
  }

  const [foodStatus] = useState([
    {
      key: 1,
      type: "ACTIVE"
    },
    {
      key: 2,
      type: "DEACTIVE"
    },

  ])

  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = async () => {
    await categoryService
      .getCategoryList()
      .then((res) => {
        setCategoryList(res.data.data.content);
        console.log("🚀 ~ file: FoodAdd.jsx ~ line 115 ~ .then ~ res.data", res.data.data.content)
      })
      .catch((err) => {
        console.log("🚀 ~ file: FoodAdd.jsx ~ line 79 ~ getCategoryList ~ err", err)
      });

  }

  const handleChangeStatus = (ev) => {
    console.log(ev)
  }
  const handleChangeCategory = (ev) => {
    setCategoryList(ev.target.value)

  }

  const onFinish = async (values) => {
    let dataConverted = {
      "name": values.name,
      "categoryId": values.categoryId,
      "description": values.description,
      "detail": values.detail,
      "images": images,
      "price": values.price,
      "status": values.status
    };
    console.log(dataConverted)
    await foodService.createNew(dataConverted)
      .then(res => {
        message.success('Create Food Success!');
        console.log("Create food success!", res.data.data)
      })
      .catch(err => {
        message.error("Create food fail!")
        console.log("Create fail", err)
      })
    navigate("/food/list")

  };

  const onFinishFailed = (errorInfo) => {
    console.log("🚀 ~ file: FoodAdd.jsx ~ line 115 ~ onFinishFailed ~ errorInfo", errorInfo)
  };

  return (
    <>
      <PageContainer>
        <Card>
          <ProForm form={form} onFinish={onFinish} style={{ width: "50%", marginLeft: "25%" }}
            onFinishFailed={onFinishFailed}  >
            <ProFormText id='name' label="Name" name="name"
              rules={[{ required: true, message: 'Please enter Name!' }]}
            />
            <ProFormDigit id='price' label="Price" name="price"
              rules={[{ required: true, message: 'Please enter Price!' }]}
            />
            <Form.Item
              id="categoryId"
              name="categoryId"
              label="Category Name"
              onChange={handleChangeCategory}
              rules={[
                {
                  required: true,
                  message: 'Please select Category!',
                },
              ]}
            >
              <Select placeholder="Select Category">
                {categoryList.map((item) => (
                  <Option Option key={item.id} value={item.id} > {item.name}</Option>
                )
                )}
              </Select>
            </Form.Item>

            <ProFormText id='detail' label="Detail" name="detail" placeholder="Detail"
              rules={[{ required: true, message: 'Please enter Detail!' }]}
            />
            <Form.Item
              id="status"
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Please select Status!',
                },
              ]}
            >
              <Select placeholder="Status" onChange={handleChangeStatus}>
                {foodStatus.map((food, index) => (
                  <Option key={index} value={food.id}>{food.type}</Option>
                )
                )}
              </Select>
            </Form.Item>
            <ProFormTextArea
              id="description"
              name="description"
              label="Description"
              placeholder="Description..."
              rules={[
                {
                  required: true,
                  message: 'Please enter Description!',
                },
              ]}

            />
            <Form.Item
              name="images"
              label="image"
              value={images}

            >
              <div>
                <input type="file" name="file" onChange={uploadImage} />
              </div>
              {
                loading ? (
                  <Spin />
                ) : (
                  <Image src={images} style={{ width: '100%' }} />
                )
              }
            </Form.Item>
          </ProForm>
        </Card>
      </PageContainer>
    </>
  )
}

export default Food;