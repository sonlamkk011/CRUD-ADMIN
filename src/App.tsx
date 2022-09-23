// 3rd party libraries
import { Suspense, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Avatar } from 'antd';
import { ProLayout } from '@ant-design/pro-components';
import type { ProSettings } from '@ant-design/pro-components';
import { UserOutlined } from '@ant-design/icons';

// Images
import logoBep from './public/img/logo.jpg';

// Components
import defaultProps from './Components/Layout/_defaultProps';
import Home from './pages/Home';
import FoodAdd from './pages/Food/FoodAdd';
import FoodDetails from "./pages/Food/FoodDetails";
import FoodList from "./pages/Food/FoodList";
import CreateUser from "./pages/User/CreateUser";
import UserDetails from "./pages/User/UserDetails";
import UserList from "./pages/User/UserList";
import Category from "./pages/Category/Category";
import CategoryList from "./pages/Category/CategoryList";
import CategoryDetails from "./pages/Category/CategoryDetails";
import OrderList from "./pages/Order/OrderList";
import OrderDetails from "./pages/Order/OrderDetails";
import NotFound from './pages/NotFound';
import GetUserInfo from './Components/GetUserInfo/GetUserInfo';
import Footer from "./pages/Footer";
import Account from "./pages/Account/Account";
import Test from "./pages/Test/Test";


// CSS Styles
import "./App.css";
import "braft-editor/dist/index.css";
import '@ant-design/pro-components/dist/components.css'

function App() {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true })
    const [pathname, setPathname] = useState('/')

    return (


        <>

            <Suspense fallback={<div>Loading...</div>}>
                {/* <GetUserInfo /> */}
                <BrowserRouter>
                    <div
                        style={{
                            height: '100vh',
                        }}
                    >
                        <ProLayout
                            {...defaultProps}
                            navTheme="light"
                            location={{
                                pathname,
                            }}
                            logo={logoBep}
                            title="Admin"
                            menuHeaderRender={(logo, title) => (
                                <div
                                    id="customize_menu_header"
                                >
                                    <span>
                                        {logo}
                                    </span>
                                    <span>
                                        {title}
                                    </span>
                                </div>
                            )}
                            onMenuHeaderClick={() => { }}
                            menuItemRender={(item, dom) => (
                                <span
                                    onClick={() => {
                                        setPathname(item.path ? item.path : '/')
                                    }}
                                >
                                    {
                                        item.path?.includes('https') ? (
                                            <a href={item.path} target={'_blank'}>{dom}</a>
                                        ) : (
                                            <Link to={`${item.path}`} >{dom}</Link>
                                        )
                                    }
                                </span>
                            )}
                            rightContentRender={() => (
                                <div>
                                    <Avatar shape="square" size="small" icon={<UserOutlined />} />
                                </div>
                            )}
                            {...settings}
                        >
                            <Routes>
                                {/* ============= HOME PAGE ============= */}
                                <Route path='/' element={<Home />} />

                                {/* ============= FOOD PAGE ============= */}
                                <Route path='/food/create' element={<FoodAdd />} />
                                <Route path='/food/list' element={<FoodList />} />
                                <Route path='/food/details/:id' element={<FoodDetails />} />
                                {/* ============= OFF FOOD PAGE ============= */}

                                {/* ============= USER PAGE ============= */}
                                <Route path='/user/create' element={<CreateUser />} />
                                <Route path='/user/details' element={<UserDetails />} />
                                <Route path='/user/list' element={<UserList />} />
                                {/* ============= USER PAGE ============= */}

                                {/* ============= Category PAGE ============= */}
                                <Route path='/category/create' element={<Category />} />
                                <Route path='/category/list' element={<CategoryList />} />
                                <Route path='/category/details/:id' element={<CategoryDetails />} />
                                {/* =============Off Category PAGE ============= */}
                                {/* ============= Order PAGE ============= */}
                                <Route path='/order/list' element={<OrderList />} />
                                <Route path='/order/details/:id' element={<OrderDetails />} />
                                {/* =============Off Order PAGE ============= */}

                                {/* ============= NOT FOUND PAGE ============= */}
                                <Route path="*" element={<NotFound />} />
                                <Route path="/account" element={<Account />} />
                                <Route path="/test" element={<Test />} />
                            </Routes>
                        </ProLayout>
                    </div>
                </BrowserRouter>
            </Suspense>

        </>

    )
}

export default App
