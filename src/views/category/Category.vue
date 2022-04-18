<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
    </ul>
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
.wrapper {
  height: 200px;
  background-color: red;
  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>
