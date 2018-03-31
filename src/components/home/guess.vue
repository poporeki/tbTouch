<template>
  <div>
      <div class="guess-title">
                        <div class="tit">
                            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#FE5400" d="M810.97269 561.152l-293.711449 288.308966-300.526344-285.554759 0.812137-0.459035c-48.269241-39.300414-79.483586-102.223448-79.483586-173.12662 0-119.137103 88.346483-215.710897 197.243586-215.710897 77.682759 0 144.913655 49.152 176.975449 120.620138 32.450207-70.656 99.328-119.172414 176.445793-119.172414 108.932414 0 197.208276 96.609103 197.208276 215.746207 0 68.678621-29.307586 129.800828-74.963862 169.348414z m0 0"
                                />
                            </svg>
                            <span>猜你喜欢</span>
                        </div>
        
                        <span>实时推荐最适合你的宝贝</span>
                    </div>
      <div class="guess-items">
            <a :href=data.link class="guess-item" v-for="data in guessItemsDatas" :key="data.id">
                <div class="item-img">
                    <img :src=data.imgSrc alt="">
                </div>
                <div class="item-text">
                    <span>[为你推荐]{{data.itemText}}</span>
                </div>
                <div class="item-price">￥{{data.price}}.00</div>
            </a>
        </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default{
        data(){
            return{
                guessItemsDatas:[]
            }
        },
        created(){
            Axios.get('/static/json/guessItems.json')
            .then((datas)=>{
                this.guessItemsDatas=datas.data.list;
            })
        }
    }
</script>