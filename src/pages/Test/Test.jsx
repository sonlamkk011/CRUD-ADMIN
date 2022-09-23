import React, { useState } from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDatePicker, ProTable } from '@ant-design/pro-components';
import { Badge, Button, Tooltip } from 'antd';





const valueEnum = {
    0: 'close',
    1: 'running',
    2: 'online',
    3: 'error',
};
const tableListDataSource = [];
const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
        key: i,
        name: 'AppName',
        containers: Math.floor(Math.random() * 20),
        status: valueEnum[Math.floor(Math.random() * 10) % 4],
        createdAt: Date.now() - Math.floor(Math.random() * 2000),
        creator: creators[Math.floor(Math.random() * creators.length)],
    });
}



const columns = [
    {
        title: 'status',
        dataIndex: 'status',
        filters: true,
        onFilter: true,
        valueEnum: {
            close: { text: 'Default', status: 'Default' },
            running: { text: 'processing', status: 'Processing' },
            online: { text: 'success', status: 'Success' },
            error: { text: 'error', status: 'Error' },
        },
    },

];





function Test() {
    return (
        <>
            <ProTable columns={columns} request={(params, sorter, filter) => {
                return Promise.resolve({
                    data: tableListDataSource,
                    success: true,
                });
            }}

                rowKey="key" pagination={{
                    showQuickJumper: true,
                }} search={false} dateFormatter="string" options={{
                    setting: {
                        draggable: true,
                        checkable: true,
                        checkedReset: false,

                    },
                }} />

        </>
    )
}

export default Test;