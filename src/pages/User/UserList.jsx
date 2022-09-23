import React, { useState, useRef, useEffect } from 'react';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Dropdown, Popconfirm, Space, Card, Form, Input, InputNumber, Button, Typography } from 'antd';
import accountService from "../Service/AccountService";
import Highlighter from 'react-highlight-words';




const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};




function UserList() {

  const [accountList, setAccountList] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data, setData] = useState()
  const [pageSize, setpageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  


  const isEditing = (record) => record.key === editingKey;

  

  useEffect(() => {
    getAccountList();
  }, [currentPage, pageSize])



  useEffect(() => {
    console.log(accountList, 'accountList');
  }, [accountList])


  const getAccountList = async () => {
    await accountService
      .getAccountList(currentPage)
      .then((res) => {
        setAccountList(res.data);
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

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
            }}>
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
      width: '5%',
      editable: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: '20%',
      editable: true,
      ...getColumnSearchProps('username'),
    },

    {
      title: 'Email',
      dataIndex: 'email',
      width: '30%',
      editable: true,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '20%',
      editable: true,
      ...getColumnSearchProps('phone'),
    },

    {
      title: 'Role',
      dataIndex: 'role',
      width: '10%',
      editable: true,
      ...getColumnSearchProps('role'),
      render: res => (<>{res == "1" ? "ADMIN" : "USER"}</>)

    },
    {
      title: 'Operation',
      dataIndex: 'id',
      render: (id, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>

          </span>
        ) : (
          <Typography.Link>
            {/* <Link to={`/user/details/${id}`}>
              <Button>Details</Button>
            </Link> */}
            <Button type="primary" danger ghost>Delete</Button>
          </Typography.Link>
        )

      },

    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  console.log(accountList);



  return (
    <>
      <PageContainer form={form} component={false}>
        <Card>
          <ProTable
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={accountList}
            columns={mergedColumns}
            rowKey="outUserNo"
            pagination={{
              pageSize,
              current: currentPage,
              total: data?.totalElements,
              onChange: (page) => {
                setCurrentPage(page)
                console.log("page", page)
              },
            }}
            toolBarRender={false} search={false} />
        </Card>
      </PageContainer>
    </>
  );
};


export default UserList