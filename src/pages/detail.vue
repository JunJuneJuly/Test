<template>
    <div class="detail">
        <product-param v-bind:title="product.value.name"></product-param>
        <div class="container">
            <div class="contentL">
                <a-carousel autoplay>
                    <div v-for="(item, index) in swiperList" v-bind:key="index" class="swiper-box">
                        <a class="swiper-slide"><img :src="item.img" ></a>
                    </div>
                </a-carousel>
            </div>
            <div class="contentR">
                <div class="title">
                    <h4>{{product.value.name}}</h4>
                    <p>相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红<br/>
                        外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
                    <p><span class="self">小米自营</span></p>
                    <p><span class="price">{{product.value.price}}元</span><span style="text-decoration: line-through">2999元</span></p>
                </div>
                <div class="version">
                    <div class="addr">
                        <p><span class="icon-addr"></span>北京 北京市 朝阳区 安定门街道 <a href="javascript:;">修改</a></p>
                        <p class="have">有现货</p>
                    </div>
                    <div class="choose-version">
                        <h3>选择版本</h3>
                        <div class="version-btn">
                            <a href="javascript:;" :class="{'checked':version == 1}" @click="version = 1">6GB+64GB 全网通  1099</a>
                            <a href="javascript:;" :class="{'checked':version == 2}" @click="version = 2">4GB+64GB 移动4G   1049</a>
                        </div>
                    </div>
                    <div class="choose-color">
                        <h3>选择颜色</h3>
                        <a href="javascript:;" class="color"><span></span>深空灰</a>
                    </div>
                    <div class="total">
                        <p><span>{{product.value.name}} {{version == 1 ? '6GB+64GB 全网通':'4GB+64GB 移动4G'}}</span><span class="price">{{version == 1 ? '1099':'1049'}}元<span style="color: #666666; text-decoration: underline">1699元</span></span></p>
                        <p class="totalprice">总计：{{product.value.price}}元</p>
                    </div>
                </div>
                <div class="buy-btn">
                    <a href="javascript:;" class="addcart" @click="addcart">加入购物车</a>
                    <a href="javascript:;" class="like"><span></span>喜欢</a>
                </div>
            </div>
        </div>
        <div class="detail-footer">
            <div class="fcontainer">
                <h4>价格说明</h4>
                <div class="price-info">
                    <img src="/imgs/detail/item-price.jpeg" alt="">
                </div>
            </div>

        </div>
        <service-bar></service-bar>
    </div>
</template>
<script type="text/ecmascript-6">
    import {ref,onMounted,reactive,getCurrentInstance} from 'vue'
    import ServiceBar from '../components/ServiceBar';
    import ProductParam from '../components/ProductParam';
    import { useRoute } from 'vue-router';
    export default {
        components:{
            ProductParam,
            ServiceBar
        },
        setup(){
            const { proxy } = getCurrentInstance();
            const swiperList = reactive([
                {
                    img:'/imgs/detail/phone-1.jpg'
                },
                {
                    img:'/imgs/detail/phone-2.jpg'
                },
                {
                    img:'/imgs/detail/phone-3.jpg'
                },
                {
                    img:'/imgs/detail/phone-4.jpg'
                }
            ]);
            const product = reactive({});
            product.value = {};
            const version = ref('1');
            const route = useRoute();
            const getProductInfo = ()=>{
                let id = route.params.id;
                proxy.$axios.get(`/products/${id}`).then((res)=>{
                    product.value = res;
                    console.log(res);
                })
            };
            const addcart = ()=>{
                proxy.$axios.post('/carts',{
                    productId:route.params.id,
                    selected:true
                }).then((res={})=>{
                    proxy.$store.dispatch('saveCartCount',res.cartTotalQuantity)
                    proxy.$router.push('/cart');
                    console.log(res)
                })
            };
            onMounted(()=>{
                getProductInfo();
            });
            return{
                swiperList,
                product,
                version,
                getProductInfo,
                addcart
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/scss/mixin";
    .detail{
        .container{
            overflow: hidden;
            border-top: 1px solid #cccccc;
            background: white;
            .contentL{
                float: left;
                margin-top: 40px;
                width: 410px;
                .swiper-slide{
                    text-align: center;
                    img{
                        width: 384px;
                    }
                }
            }
            .contentR{
                width: 583px;
                float: right;
                .title{
                    border-bottom: 1px solid #E5E5E5;
                    padding-bottom: 25px;
                    h4{
                        font-size: 28px;
                        font-weight: 400;
                        color: #333333;
                        margin-top: 30px;
                        margin-bottom: 16px;
                    }
                    p{
                        font-size: 14px;
                        font-weight: 400;
                        color: #999999;
                    }
                    .self{
                        margin-top: 26px;
                        margin-bottom: 14px;
                        color: #FF6700;
                        font-size: 16px;
                        display: inline-block;
                    }
                    .price{
                        color: #FF6700;
                        font-size: 16px;
                        margin-right: 10px;
                    }
                }
                .version{
                    .addr{
                        margin: 30px 0;
                        padding: 34px;
                        background: #FAFAFA;
                        p{
                            font-size: 14px;
                            font-weight: 400;
                            .icon-addr{
                                @include bgImg(20px,20px,'/imgs/icon-loc.png');
                                margin-right: 10px;
                            }
                            a{
                                margin-left: 20px;
                                color: #FF6700;
                            }
                        }
                        .have{
                            font-size: 14px;
                            font-weight: 400;
                            color: #FF6700;
                            margin-left: 30px;
                            margin-top: 15px;
                        }
                    }
                    .choose-version{
                        h3 {
                            font-size: 18px;
                            font-weight: 400;
                            color: #333333;
                        }
                        .version-btn{
                            display: flex;
                            justify-content: space-between;
                            margin: 20px 0 30px 0;
                            a{
                                display: inline-block;
                                box-sizing: border-box;
                                width: 287px;
                                height: 50px;
                                line-height: 50px;
                                border: 1px solid #E5E5E5;
                                padding-left:34px;
                                color: #333333;
                                &.checked{
                                    border: 1px solid #FF6600;
                                    color:#FF6600;
                                }
                            }

                        }
                    }
                    .choose-color{
                        h3{
                            font-size: 18px;
                            font-weight: 400;
                            color: #333333;
                        }
                        .color{
                            display: inline-block;
                            box-sizing: border-box;
                            width: 287px;
                            height: 50px;
                            line-height: 50px;
                            border: 1px solid #FF6600;
                            padding-left:34px;
                            font-size: 16px;
                            font-weight: 400;
                            color: #FF6700;
                            margin: 20px 0 50px 0;
                            span{
                                width: 14px;
                                height: 16px;
                                background: #666666;
                                display: inline-block;
                                margin-right: 9px;
                            }

                        }
                    }
                    .total{
                        width: 100%;
                        height: 108px;
                        background: #FAFAFA;
                        padding-top: 24px;
                        padding-left: 30px;
                        box-sizing: border-box;
                        font-size: 14px;
                        font-weight: 300;
                        color: #333333;
                        position: relative;
                        .price{
                            position: absolute;
                            right: 33px;
                        }
                        .totalprice{
                            font-size: 24px;
                            font-weight: 400;
                            color: #FF6600;
                            margin-top: 15px;
                        }
                    }
                }
                .buy-btn{
                    .addcart{
                        width: 300px;
                        height: 54px;
                        background: #FF6600;
                        color: #ffffff;
                        line-height: 54px;
                        text-align: center;
                        display: inline-block;
                        margin: 30px 20px 50px 0;
                        font-size: 16px;
                    }
                    .like{
                        width: 142px;
                        height: 54px;
                        background: #BBBBBB;
                        line-height: 54px;
                        text-align: center;
                        display: inline-block;
                        color: #ffffff;
                        font-size: 16px;
                        font-weight: 400;
                        span{
                            display: inline-block;
                            @include bgImg(18px,16px,'/imgs/icon-gou.png');
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
        .detail-footer{
            width: 100%;
            background: #F3F3F3;
            .fcontainer{
                margin-right: auto;
                margin-left: auto;
                width: 1226px;
                h4{
                    font-size: 24px;
                    font-weight: 400;
                    color: #333333;
                    padding: 38px 0 30px 0;
                }
                .price-info{
                    width: 100%;
                    height: 189px;
                    padding-bottom: 60px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }

        }

    }
</style>
