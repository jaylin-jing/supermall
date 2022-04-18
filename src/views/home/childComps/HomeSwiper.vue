<template>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name: 'HomeSwiper',
  data(){
    return{
      isLoad: false
    }
  },
  props:{
    banners: {
      type: Array,
      defualt(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad(){
      if(!this.isLoad){
        this.$emit("swiperImgLoad")
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
