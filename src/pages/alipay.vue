<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
  import Loading from './../components/Loading';
  import {ref,getCurrentInstance,onMounted} from 'vue';
  import {useRoute} from 'vue-router'
  export default{
    name:'alipay',
    components:{
      Loading
    },
    setup(){
      const {proxy} = getCurrentInstance();
      const route = useRoute();
      const orderId = ref(route.query.orderId);
      const content = ref('');
      const loading = ref(true);

      const paySubmit = ()=>{
            proxy.$axios.post('/pay',{
                orderId:orderId.value,
                orderName:'Vue高仿小米商城',
                amount:0.01,//单位元
                payType:1 //1支付宝，2微信
            }).then((res)=>{
                content.value = res.content;
                setTimeout(()=>{
                    document.forms[0].submit();
                },100)
            })
      };

      onMounted(()=>{
          paySubmit();
      });

      return{
          paySubmit,
          loading,
          content,
          orderId
      }

    }
  }
</script>