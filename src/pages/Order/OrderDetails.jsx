import { PageContainer, ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { Card, Form } from 'antd';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import orderService from '../Service/OrderService';

function OrderDetails() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [images, setImages] = useState("");

    useEffect(() => {
        getOrderDetail();

    }, [])


    const getOrderDetail = async () => {
        await orderService.getOrderDetails(id).then((res) => {
            console.log("🚀 order Details", res.data.data.orderDetails[0])
            form.setFieldsValue({ id: res.data.data.orderDetails[0].id });
            form.setFieldsValue({ name: res.data.data.orderDetails[0].name });
            form.setFieldsValue({ unitPrice: res.data.data.orderDetails[0].unitPrice });
            form.setFieldsValue({ images: res.data.data.orderDetails[0].images });
            form.setFieldsValue({ quantity: res.data.data.orderDetails[0].quantity });
            form.setFieldsValue({ shipName: res.data.data.shipName });
            form.setFieldsValue({ shipAddress: res.data.data.shipAddress });
            form.setFieldsValue({ shipPhone: res.data.data.shipPhone });
            if (res.data.data.orderDetails[0].images) {
                setImages(res.data.data.orderDetails[0].images)
            }
        });
    };

    return (
        <>
            <PageContainer>
                <Card>
                    <ProForm form={form} style={{ width: "50%", marginLeft: "25%" }} >
                        <ProFormDigit
                            disabled
                            label="Id"
                            name="id"
                            fieldProps={{ precision: 0 }}
                        />
                        <ProFormText
                            disabled
                            name="name"
                            label="Name"
                        />
                        <ProFormDigit
                            disabled
                            name="unitPrice"
                            label="Unit Price"
                            fieldProps={{ precision: 0 }}
                        />

                        <ProFormDigit
                            disabled
                            name="quantity"
                            label="Quantity"
                            fieldProps={{ precision: 0 }}
                        />
                        <ProFormText
                            disabled
                            name="shipName"
                            label="shipName"
                            fieldProps={{ precision: 0 }}
                        />
                        <ProFormText
                            disabled
                            name="shipAddress"
                            label="shipAddress"
                            fieldProps={{ precision: 0 }}
                        />
                        <ProFormDigit
                            disabled
                            name="shipPhone"
                            label="Ship Phone"
                            fieldProps={{ precision: 0 }}
                        />
                    </ProForm>
                </Card>
            </PageContainer>
        </>
    )
}


export default OrderDetails;