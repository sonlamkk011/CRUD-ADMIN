import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    message,
    Select,
} from 'antd';
import categoryService from '../Service/CategoryService';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
const { Option } = Select;


function CategoryDetails() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const { id } = useParams()



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

    useEffect(() => {
        getDetails();

    }, [])

    const getDetails = async () => {
        await categoryService.getCategoryDetails(id).then((res) => {
            form.setFieldsValue({ id: res.data.data.id });
            form.setFieldsValue({ name: res.data.data.name });
            form.setFieldsValue({ status: res.data.data.status });
            form.setFieldsValue({ description: res.data.data.description });
            form.setFieldsValue({ thumbnail: res.data.data.thumbnail });
        });
    };

    const handleChangeStatus = (ev) => {
        setStatus(ev.target.value)
    }

    const onFinish = async (values) => {
        let dataConverdTed = {
            "id": values.id,
            "name": values.name,
            "status": values.status,
            "thumbnail": values.thumbnail,
            "description": values.description,
        };
        console.log("dataconverd", dataConverdTed)
        await categoryService.updateCategory(dataConverdTed)
            .then(res => {
                message.success("Update Success!")
                console.log("update success", res.data.data);
            })
            .catch(err => {
                message.error("Update Fail!")
                console.log("update fail", err);
            })

        navigate("/category/list");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <PageContainer >
                <Card>
                    <ProForm form={form} onFinish={onFinish} style={{ width: "50%", marginLeft: "25%" }}
                        onFinishFailed={onFinishFailed}  >
                        <ProFormText label="Id" name="id"
                            rules={[{ required: true, message: 'Id cannot be empty!' }]}
                        />
                        <ProFormText label="Name" name="name"
                            rules={[{ required: true, message: 'Name cannot be empty!' }]}
                        />
                        <Form.Item
                            name="status"
                            label="Status"
                            value={status}
                            onChange={handleChangeStatus}
                            rules={[{ required: true, message: 'Status cannot be empty!' }]}>
                            <Select placeholder="Select status">
                                {categoryStatus.map((item, index) => (
                                    <Option key={index} value={item.id}>{item.type}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <ProFormText label="Thumbnail" name="thumbnail"
                            rules={[{ required: false, message: 'Thumbnail cannot be empty!' }]} />
                        <ProFormTextArea label="Description" name="description" />
                    </ProForm>
                </Card>
            </PageContainer>
        </>
    )
}
export default CategoryDetails;