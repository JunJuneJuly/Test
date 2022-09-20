<template>
    <div class="productparam">
        <div class="nav-bar" :class="{'is_Fixed':isFixed}">
            <div class="container">
                <div class="pro-title">{{title}}</div>
                <div class="pro-param">
                    <a href="javascript:;">概述</a><span>|</span>
                    <a href="javascript:;">参数</a><span>|</span>
                    <a href="javascript:;">用户评价</a>
                    <slot name="buy"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {ref,onMounted,onUnmounted} from 'vue'
    export default {
        name:'productparam',
        props:{
            title:String,
        },
        setup(){
            const isFixed = ref(false);
            const initHeight = ()=>{
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                isFixed.value = scrollTop > 152 ? true:false;
            };
            onMounted(()=>{
                window.addEventListener('scroll',initHeight,true);
            });
            onUnmounted(()=>{
                window.removeEventListener('scroll',initHeight,false);
            });

            return{
                isFixed,
                initHeight
            }

        }

    }
</script>
<style lang="scss" scoped>
    @import "../assets/scss/config";
    @import "../assets/scss/mixin";
    .productparam{
        .nav-bar{
            border-top: 1px solid #E5E5E5;
            height: 70px;
            line-height: 70px;
            background: white;
            &.is_Fixed{
                position: fixed;
                top: 0;
                width: 100%;
                box-shadow: 0 2px 2px #cccccc;
                z-index: 20;
            }
            .container{
                @include flex();
                .pro-title{
                    font-size: 18px;
                    font-weight: 400;
                    color: #333333;
                }
                .pro-param{
                    font-size: 14px;
                    font-weight: 400;
                    a{
                        color: #666666;
                        margin: auto 11px;
                    }

                }
            }
        }
        .c{
            height: 200px;
            background: #FF6600;
        }
    }

</style>