<template>
  <div>
      <div class="counter-box">
            <span class='h'>{{hour>9?hour:'0'+hour}}</span>
            <span class='dot'>:</span>
            <span class='m'>{{min>9?min:'0'+min}}</span>
            <span class='dot'>:</span>
            <span class='s'>{{sec>9?sec:'0'+sec}}</span>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      endTime: "2018/06/31 00: 00",
      hour: 0,
      min: 0,
      sec: 0
    };
  },
  methods: {
    forMate() {
      let _this = this;
      let endTime = this.endTime;
      let time = new Date(endTime).getTime() - new Date().getTime();
      let hour = parseInt(time / 1000 / 3600);
      let min = parseInt((time / 1000 - hour * 3600) / 60);
      let sec = parseInt(time / 1000 - hour * 3600 - min * 60);
      this.hour = hour;
      this.min = min;
      this.sec = sec;
      setTimeout(function() {
        _this.forMate();
      }, 1000);
    }
  },
  created() {
    this.forMate();
  }
};
</script>
