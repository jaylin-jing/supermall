<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="left">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="center">
        <div v-for="(item,index) in titles" :key="index" class="nav-bar-item" :class="{active: index === currentIndex}" @click="currentItem(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data(){
    return {
      currentIndex:0,
      titles: ['商品','参数','评论','推荐']
    }
  },
  methods: {
    currentItem(index){
      this.currentIndex = index
      this.$emit('itemClick',index)
    },
    backClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.center{
  display: flex;
  font-size: 13px;
}
.nav-bar-item{
  flex: 1;
}
.left{
  display: flex;
  height: 100%;
  align-items: center;
}
.left img{
  width: 16px;
  height: 16px;
  margin-left: 10px;
}
.active{
  color: var(--color-high-text);
}
</style>
