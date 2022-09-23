import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Card, Form, Input, Space, Button, Typography, Image, message } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';
import foodService from "../Service/FoodService";
import Highlighter from 'react-highlight-words';
import axios from 'axios';










function FoodList() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const [foodList, setFoodList] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const { id } = useParams();
  const [data, setData] = useState()
  const [pageSize, setpageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)



  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });





  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: '2%',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '5%',
      editable: true,
      ...getColumnSearchProps("name")
    },
    {
      title: 'Image',
      dataIndex: 'images',
      editable: true,
      width: "15%",
      render: (images) =>
        <Image
          src={images}
          width="100%"
        />
    },
    {
      title: 'categoryName',
      dataIndex: 'categoryName',
      width: '10%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
      editable: true,
      ...getColumnSearchProps('price'),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      editable: true,
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Option',
      dataIndex: 'id',
      width: '10%',
      editable: true,
      render: (id, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
          </span>
        ) : (
          <div>
            <Typography.Link>
              <Link to={`/food/details/${id}`}>
                <Button>Details</Button>
              </Link>
            </Typography.Link>
            <Button type="primary" danger ghost onClick={() => { DeleteFood(id) }}>
              Delete
            </Button>
          </div>
        )
      },
    },
  ]


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
    clearFilters();
    setSearchText('');
    confirm({
      closeDropdown: false,
    });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

  };

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    getFoodLists();
  }, [pageSize, currentPage])



  useEffect(() => {
    console.log(foodList, 'foodList');
  }, [foodList])




  const getFoodLists = async () => {
    await foodService
      .getFoodList(currentPage)
      .then((res) => {
        setFoodList(res.data.data.content);
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }




  const DeleteFood = async (id) => {
    axios.delete(`http://13.213.7.133/api/admin/v1/foods/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZmlyc3ROYW1lIjoiUGluZGlhcyIsImxhc3ROYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJNZXRhd2F5aG9sZGluZ3MiLCJleHAiOjE2NjI5NDY3NjgsImVtYWlsIjoiZGFjYWRtaW5AZ21haWwuY29tIn0.JYZM0ABrYtXi09gHKY3ySaLofsqDfn_Wp4T0vMxdtO8",
      }
    })
      .then(res => {
        message.success("Delete Food success!")
        getFoodLists();
        console.log(res);
      })
      .catch(err => {
        message.error("Delete Food Fail!")
        console.log(err);
      });
  }


  return (
    <>
      <PageContainer>
        <Card>
          <ProTable columns={columns}
            dataSource={foodList}
            rowKey="key"
            pagination={{
              pageSize,
              current: currentPage,
              total: data?.totalElements,
              onChange: (page) => {
                setCurrentPage(page)
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
export default FoodList;