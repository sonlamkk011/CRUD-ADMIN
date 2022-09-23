import React, { useState, useEffect, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Input, Form, Space, Button, Typography, message } from 'antd';
import categoryService from '../Service/CategoryService';
import { Link, useParams } from "react-router-dom";
import Highlighter from 'react-highlight-words';
import axios from 'axios';




function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const { id } = useParams();
  const [data, setData] = useState()
  const [pageSize, setpageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)



  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    getCategoryList();
  }, [currentPage, pageSize])

  useEffect(() => {
    console.log("Foodlist", categoryList);
  }, [categoryList])



  const getCategoryList = async () => {
    await categoryService
      .getCategoryList(currentPage)
      .then((res) => {
        setCategoryList(res.data.data.content);
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }
  const DeleteCategory = async (id) => {
    axios.delete(`http://13.213.7.133/api/admin/v1/categories/${id}`, {
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZmlyc3ROYW1lIjoiUGluZGlhcyIsImxhc3ROYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJNZXRhd2F5aG9sZGluZ3MiLCJleHAiOjE2NjI5NDY3NjgsImVtYWlsIjoiZGFjYWRtaW5AZ21haWwuY29tIn0.JYZM0ABrYtXi09gHKY3ySaLofsqDfn_Wp4T0vMxdtO8",
      },
    }).then(res => {
      getCategoryList();
      message.success("Delete Category Success!")
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }


  
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
      title: 'id',
      dataIndex: 'id',
      width: '2%',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '10%',
      editable: true,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: '20%',
      editable: true,
    },
    {
      title: 'thumbnail',
      dataIndex: 'thumbnail',
      width: '20%',
      editable: true,
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: '10%',
      editable: true,
    },

    {
      title: 'operation',
      dataIndex: 'id',
      width: '10%',
      editable: true,
      render: (id, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
          </span>
        ) : (
          <Typography.Link>
            <Link to={`/category/details/${id}`}>
              <Button>Details</Button>
            </Link>
           
            <Button danger onClick={() => { DeleteCategory(id) }} >
              Delete
            </Button>
          </Typography.Link>
        )
      },
    },
  ];


  return (
    <>
      <PageContainer >
        <Card>
          <ProTable columns={columns}
            dataSource={categoryList.sort((a, b) => (a.id > b.id ? 1 : -1))}
            rowKey="key"
            pagination={{
              pageSize,
              current: currentPage,
              total: data?.totalElements,
              onChange: (page) => {
                setCurrentPage(page)
                console.log("page", page)
              },
            }}
            search={false} />
        </Card>
      </PageContainer>
    </>
  );
}

export default CategoryList