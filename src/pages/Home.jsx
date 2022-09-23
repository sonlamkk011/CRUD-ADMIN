import React from 'react';
import { Button, Descriptions, Space, Statistic, Image } from 'antd'
import { PageContainer } from '@ant-design/pro-components';
import { LikeOutlined } from '@ant-design/icons';
import logo from "../../src/public/img/logo-bep.jpg";




function Home() {
  return (
    <>

        <Image.PreviewGroup>
          <Image
            width={"100%"}
            src="../../src/public/img/logo-bep.jpg"
          />
        </Image.PreviewGroup>
    </>
  )
}

export default Home