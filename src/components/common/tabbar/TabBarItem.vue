<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isActive">
      <slot name="tab-bar-item-img"></slot>
    </div>
    <div v-show="isActive">
      <slot name="tab-bar-item-img-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="tab-bar-item-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "deepPink",
    },
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
  /* display: flex;  */
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* margin-bottom: 2px; */
}
.active {
  color: pink;
}
</style>