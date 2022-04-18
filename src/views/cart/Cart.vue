<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="wrapper" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-button></cart-bottom-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import CartBottomButton from "./childComps/CartBottomButton.vue"
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomButton
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.wrapper {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
