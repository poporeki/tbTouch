<template>
    <swiper :options="swiperOption" ref="mySwipers" >
        <!-- slides -->
        <swiper-slide  v-for="data in headlinesData" :key="data.id">
            <div class="logo">
                <img :src=data.imgSrc :alt=data.title>
            </div>
            <div class="text-block">
                <span class="title">{{data.title}}</span><a :href=data.href>{{data.text}}</a>
            </div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>
<script>
import Axios from "axios";
export default {
  name: "headline",
  data() {
    return {
      headlinesData: [],
      swiperOption: {
        direction: 'vertical',
        autoplay: true
      }
    };
  },
  created() {
    Axios.get("/static/json/headlines.json").then(datas => {
      this.headlinesData = datas.data.list;
    });
  },
  computed: {
    swiper() {
      return this.$refs.mySwipers.swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>
