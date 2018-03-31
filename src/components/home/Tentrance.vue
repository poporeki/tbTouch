<template>
  <div>
      <section class='tentrance'>
            <dl class='t-items'>
                <dd class='item' v-for="tdata in tentranceDatas" :data-href=tdata.href :key="tdata.id">
                    <div class="logo">
                        <img :src=tdata.imgSrc alt="">
                    </div>
                    <div class="text">{{tdata.name}}</div>
                </dd>
            </dl>
        </section>
  </div>
</template>

<script>
import Axios from 'axios';

    export default{
        name:'tentrance',
        data(){
            return{
                tentranceDatas:[]
            }
        },
        created(){
            Axios.get('/static/json/tentrance.json')
            .then((datas)=>{
                this.tentranceDatas=datas.data.list;
            })
        }
    }
</script>
