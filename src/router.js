import { createRouter,createWebHashHistory} from 'vue-router'

import Home from './pages/home'
import Login from './pages/login'
import Index from './pages/index'
import Cart from './pages/cart'
import Product from './pages/product'
import Detail from './pages/detail'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import OrderPay from './pages/orderPay'
import Alipay from './pages/alipay'
import OrderList from './pages/orderList'
export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            redirect:'/index',
            children:[
                {
                    path:'/index',
                    name:'index',
                    component:Index,
                },
                {
                    path:'/product/:id',
                    name:'product',
                    component:Product,
                },
                {
                    path:'/detail/:id',
                    name:'detail',
                    component:Detail,
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/cart',
            name:'cart',
            component:Cart
        },
        {
            path:'/order',
            name:'order',
            component:Order,
            children: [
                {
                    path:'list',
                    name:'order-list',
                    component:OrderList
                },
                {
                    path:'confirm',
                    name:'order-confirm',
                    component:OrderConfirm
                },
                {
                    path:'pay',
                    name:'order-pay',
                    component:OrderPay,
                },
                {
                    path:'alipay',
                    name:'order-alipay',
                    component:Alipay,
                }
            ]
        }
    ]
})