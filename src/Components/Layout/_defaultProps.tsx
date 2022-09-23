import { GiftOutlined, UserAddOutlined, ShopOutlined, OrderedListOutlined, HomeOutlined } from '@ant-design/icons'

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                name: 'Home',
                icon: <HomeOutlined />,
            },
            {
                path: '/food',
                name: 'Food',
                icon: <GiftOutlined />,
                routes: [
                    {
                        path: '/food/list',
                        name: 'Food List',
                    },
                    {
                        path: '/food/create',
                        name: 'Create New Food',
                    },
                 

                ],
            },
            {
                path: '/category',
                name: 'Category',
                icon: <OrderedListOutlined />,
                routes: [
                    {
                        path: '/category/create',
                        name: ' Create New Category',
                    },
                    {
                        path: '/category/list',
                        name: 'Category List',
                    },

                ],
            },
            {
                path: '/user',
                name: 'User',
                icon: <UserAddOutlined />,
                routes: [
                    {
                        path: '/user/create',
                        name: 'Create New User',
                    },
                    {
                        path: '/user/list',
                        name: 'User List',
                    },


                ],
            },
            {
                path: '/order',
                name: 'Order',
                icon: <ShopOutlined />,
                routes: [
                    {
                        path: '/order/list',
                        name: 'Order List',
                    },
                ],
            },

        ],
    },
    location: {
        pathname: '/',
    },
}
