import React from 'react';
import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined, } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import { message, Space, Tabs } from 'antd';
import { useState } from 'react';
const iconStyles = {
    marginLeft: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

function Account() {
    const [loginType, setLoginType] = useState('phone');
    return (
        <>
            <div style={{ backgroundColor: 'white' }}>
                <LoginForm logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png" title="Github">
                    <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
                        <Tabs.TabPane key={'account'} tab={'Account'} />
                        <Tabs.TabPane key={'phone'} tab={'Phone Number'} />
                    </Tabs>
                    {loginType === 'account' && (<>
                        <ProFormText name="username" fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }} placeholder={' Admin'} rules={[
                            {
                                required: true,
                                message: 'ADMIN!',
                            },
                        ]} />
                        <ProFormText.Password name="password" fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }} placeholder={'Password '} rules={[
                            {
                                required: true,
                                message: 'PASSWORD！',
                            },
                        ]} />
                    </>)}
                    {loginType === 'phone' && (<>
                        <ProFormText fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className={'prefixIcon'} />,
                        }} name="mobile" placeholder={'Phone Number'} rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]} />
                        <ProFormCaptcha fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }} captchaProps={{
                            size: 'large',
                        }} placeholder={'otp'} captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} ${'获取验证码'}`;
                            }
                            return 'Send Otp';
                        }} name="captcha" rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]} onGetCaptcha={async () => {
                            message.success('Success!');
                        }} />
                    </>)}
                    <div style={{
                        marginBottom: 24,
                    }}>


                    </div>
                </LoginForm>
            </div>
        </>
    )
}

export default Account;