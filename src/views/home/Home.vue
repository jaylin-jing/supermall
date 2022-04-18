<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control
      class="home-tab"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabControlFixed"
    ></tab-control>
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="scollPosition"
      @pullingUp="pullUpLoad"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <future-view></future-view>
      <tab-control
        class="home-tab"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <div>2</div>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import FutureView from "./childComps/FutureView.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import BackTop from "components/content/backTop/BackTop.vue";
// import { debounce } from "common/utils.js";
import { imgRefrashMixin } from "common/mixins.js";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabControlHeight: 0,
      isTabControlFixed: false,
      saveY: 0,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    FutureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    this.$bus.$on("itemImgLoad", this.itemImgLister);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getY;
    this.$bus.$off("itemImgLoad", this.itemImgLister);
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mixins: [imgRefrashMixin],
  mounted() {},
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    swiperImgLoad() {
      this.tabControlHeight = this.$refs.tabControl2.$el.offsetTop;
    },
    pullUpLoad() {
      this.getHomeGoods(this.currentType);
    },
    scollPosition(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isTabControlFixed = -position.y > this.tabControlHeight;
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page = page;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
}
.home {
  padding-top: 44px;
}
.home-tab {
  position: sticky;
  z-index: 9;
  top: 44px;
  background-color: white;
}
.wrapper {
  height: calc(100vh - 44px - 49px - 3px);
  overflow: hidden;
}
</style>
