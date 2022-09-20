import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import AntD,{message} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router.js'
import store from './store'
//根据前端的跨域方式做调整
axios.defaults.baseURL = '/api';//基础值
axios.defaults.timeout = 8000;
//根据环境变量获取不同的请求地址
//axios.defaults.baseURL = env.baseURL;

// 接口错误拦截
axios.interceptors.response.use(function (response) {
    let res = response.data;//response.data接口的值
    let path = window.location.hash;//window.location.hash
    //console.log(res);
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {
        if(path != '#/index'){
            window.location.href = '/#/login';
        }
        return Promise.reject(res)
        // window.location.href = '/#/login';
    } else {
        message.warning(res.msg);
        // message({
        //     message:res.msg,
        //     type:'warning'
        // });

        return Promise.reject(res);
    }
},(error)=> {
    // let res = error.response;
    message.error('登录失败！')
    // console.log(error);
    return Promise.reject(error);
});

const app = createApp(App);
// 挂载全局对象
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$router = router;
app.config.globalProperties.$store = store;
app.use(AntD).use(router).use(store).mount('#app');
