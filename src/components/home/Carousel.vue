<template>
<swiper :options="swiperOption" ref="mySwiper" >
    <!-- slides -->
    <swiper-slide  v-for="navdata in navDatas" :key="navdata.href">
        <a :href=navdata.href>
                        <img :src=navdata.imgSrc alt="">
                    </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>
<script>
import Axios from "axios";
export default {
  name: "homeNavCarousel",
  data() {
    return {
      navDatas: [],
      swiperOption: {
        direction: "horizontal",
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  created() {
    Axios.get("/static/json/carousel.json").then(datas => {
      this.navDatas = datas.data.list;
    });
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>
