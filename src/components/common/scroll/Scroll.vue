<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data(){
    return{
      betterScroll: null
    }
  },
  props:{
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.betterScroll = new BetterScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    this.betterScroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
    this.betterScroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time=300){
      this.betterScroll && this.betterScroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.betterScroll.finishPullUp()
    },
    refresh(){
      this.betterScroll && this.betterScroll.refresh()
    }
  },
  computed:{
    getY(){
      return this.betterScroll ? this.betterScroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
