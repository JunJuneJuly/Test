import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './action'

//管理状态
const state = {
    username:'',
    cartcount:0
};
//导入变量
export default createStore({
    state,
    mutations,
    actions
});