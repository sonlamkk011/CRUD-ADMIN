import React, { useState, useEffect } from 'react';
import {
  Form,
  Select,
  Card,
  Image,
  message,
  Spin
} from 'antd';
import categoryService from '../Service/CategoryService';
import foodService from '../Service/FoodService';
import 'antd/dist/antd.css';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer, ProForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components';




const { Option } = Select;
function FoodDetails() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [status, setStatus] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams()
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false)


  const uploadImage = async e => {
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
    getDetail();
  }, [])

  useEffect(() => {
    getCategoryList();
  }, [])


  const getCategoryList = async () => {
    await categoryService
      .getCategoryList()
      .then((res) => {
        setCategoryList(res.data.data.content);
        console.log("getCategoryList", res.data)
      })
      .catch((err) => {
        console.log("err", err);
      });
  }



  const getDetail = async () => {
    await foodService.getDetails(id).then((res) => {
      console.log("🚀 Food Details", res.data.data)
      form.setFieldsValue({ id: res.data.data.id });
      form.setFieldsValue({ name: res.data.data.name });
      form.setFieldsValue({ price: res.data.data.price });
      form.setFieldsValue({ description: res.data.data.description });
      form.setFieldsValue({ categoryId: res.data.data.categoryId });
      form.setFieldsValue({ detail: res.data.data.detail });
      form.setFieldsValue({ status: res.data.data.status });
      form.setFieldsValue({ images: res.data.data.images });
      if (res.data.data.images) {
        setImages(res.data.data.images)

      }
    });
  };




  const handleChangeStatus = (ev) => {
    setStatus(ev.target.value)

  }
  const handleChangeCategory = (ev) => {
    setCategoryName(ev.target.value)

  }

  const onFinish = async (values) => {
    let dataConverd = {
      "id": values.id,
      "name": values.name,
      "images": images,
      "price": values.price,
      "description": values.description,
      "status": values.status,
      "detail": values.detail,
      "categoryId": values.categoryId,
    };
    await foodService.updateDetails(dataConverd)
      .then(res => {
        message.success("Update Success!")
        console.log("update success", res.data);
      }).catch(err => {
        message.error("Update Fail!")
        console.log("update fail", err);
      })
    navigate("/food/list");
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <PageContainer>
        <Card>
          <ProForm form={form} onFinish={onFinish} style={{ width: "50%", marginLeft: "25%" }}
            onFinishFailed={onFinishFailed}>
            <ProFormText label="Id" name="id"
              rules={[{ required: true, message: 'Id cannot be empty!' }]}
            />
            <ProFormText label="Name" name="name"
              rules={[{ required: true, message: 'Name cannot be empty!' }]}
            />
            <ProFormDigit label="Price" name="price"
              rules={[{ required: true, message: 'Price cannot be empty !' }]}
            />
            <Form.Item
              name="categoryId"
              label="Category Name"
              onChange={handleChangeCategory}
              rules={[
                {
                  required: true,
                  message: 'Please select categoryId',
                },
              ]}
            >
              <Select placeholder="select categoryId">
                {categoryList.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              id="status"
              name="status"
              label="Status"
              value={status}
              onChange={handleChangeStatus}
              rules={[
                {
                  required: true,
                  message: 'Please select status',
                },
              ]}
            >
              <Select placeholder="select status">
                {foodStatus.map((item, index) => (
                  <Option key={index} value={item.id}>{item.type}</Option>
                ))}
              </Select>
            </Form.Item>
            <ProFormTextArea
              id="detail"
              name="detail"
              label="Detail"
              placeholder="Please enter Detail..."
              rules={[
                {
                  required: true,
                  message: 'Please enter Detail',
                },
              ]}
            />
            <ProFormTextArea
              id="description"
              name="description"
              label="Description"
              placeholder="Please enter Description..."
              rules={[
                {
                  required: true,
                  message: 'Please enter Description',
                },
              ]}
            />
            <Form.Item
              id='images'
              name="images"
              label="Image"
              value={images}
            >
              <div >
                <input type="file" name="file" onChange={uploadImage} />
              </div>
              {
                loading ? (
                  <Spin />
                ) : (
                  <Image src={images} style={{ width: "100%" }} />
                )
              }
            </Form.Item>
          </ProForm>
        </Card>
      </PageContainer>
    </>
  )
}


export default FoodDetails;