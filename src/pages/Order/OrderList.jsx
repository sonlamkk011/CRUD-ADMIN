import React, { useState, useRef, useEffect } from "react";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Card, Typography } from "antd";
import orderService from "../Service/OrderService";
import { Link } from "react-router-dom";
import moment from "moment";
import { format } from "date-fns";

const valueEnum = {
  0: "close",
  1: "running",
  2: "online",
  3: "error",
};
const tableListDataSource = [];
const creators = ["付小小", "曲丽丽", "林东东", "陈帅帅", "兼某某"];
for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: "AppName",
    containers: Math.floor(Math.random() * 20),
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const column = [
  {
    title: "id",
    dataIndex: "id",
    width: "2%",
    editable: true,
  },
  {
    title: "account",
    dataIndex: "account",
    width: "5%",
    editable: true,
  },
  // {
  //   title: 'shipName',
  //   dataIndex: 'shipName',
  //   editable: true,
  //   width: "15%",

  // },
  // {
  //   title: 'shipPhone',
  //   dataIndex: 'shipPhone',
  //   width: '10%',
  //   editable: true,

  // },
  // {
  //   title: 'shipAddress',
  //   dataIndex: 'shipAddress',
  //   width: '10%',
  //   editable: true,

  // },
  {
    title: "shipType",
    dataIndex: "shipType",
    width: "5%",
    editable: true,
  },
  {
    title: "totalPrice",
    dataIndex: "totalPrice",
    width: "5%",
    editable: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "orderStatus",
    width: "5%",
    editable: true,
    initialValue: "all",
    filters: true,
    onFilter: true,
    // valueEnum: {
    //   all: { text: 'Default', status: 'Default' },
    //   close: { text: 'REJECT', status: 'Default' },
    //   running: { text: 'CANCEL', status: 'Processing' },
    //   online: { text: 'PENDING', status: 'Success' },
    //   error: { text: 'DELETED', status: 'Error' },
    // },
  },

  // {
  //   title: 'status',
  //   dataIndex: 'status',
  //   width: '10%',
  //   editable: true,
  // },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "5%",
    editable: true,
  },

  ,
  {
    title: "Option",
    dataIndex: "id",
    width: "5%",
    editable: true,
    render: (id, record) => {
      return (
        <>
          <Typography.Link>
            <Link to={`/order/details/${id}`}>
              <Button>Details</Button>
            </Link>
          </Typography.Link>
        </>
      );
    },
  },
];

function OrderList() {
  const [orderList, setOderList] = useState([]);
  const [data, setData] = useState([]);
  const [dataOrder, setDataOrder] = useState();
  const [pageSize, setpageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = () => {
    const data = [];
    for (let i = 0; i < orderList.length; ++i) {
      data.push({
        id: orderList[i].id,
        fullName: orderList[i].fullName,
        phone: orderList[i].phone,
        note: orderList[i].note,
        totalPrice: orderList[i].totalPrice,
        orderStatus: orderList[i].orderStatus,
        createdAt: orderList[i].createdAt,
      });
    }
    setData(data);
  };

  useEffect(() => {
    getData();
  }, [orderList]);

  useEffect(() => {
    getOrderList();
  }, [pageSize, currentPage]);

  const getOrderList = async () => {
    await orderService
      .getOrderList(currentPage)
      .then((res) => {
        setOderList(res.data.data.content);
        setDataOrder(res.data.data);
      })
      .catch((err) => {});
  };

  return (
    <>
      <PageContainer>
        <Card>
          <ProTable
            columns={column}
            dataSource={orderList}
            rowKey="key"
            pagination={{
              pageSize,
              current: currentPage,
              total: dataOrder?.totalElements,
              onChange: (page) => {
                setCurrentPage(page);
                console.log("page", page);
              },
              showSizeChanger: false,
            }}
            search={false}
          />
        </Card>
      </PageContainer>
    </>
  );
}

export default OrderList;
