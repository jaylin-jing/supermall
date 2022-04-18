<template>
  <div class="wrapper" ref="wrapper">
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      betterScroll: null,
    };
  },
  mounted() {
    this.betterScroll = new BetterScroll(".wrapper", {
      probeType: 3,
      click: true,
      pullUpLoad: true,
    });
    this.betterScroll.on("scroll", (position) => {
      console.log(position);
    });
  },
};
</script>

<style scoped>
</style>
