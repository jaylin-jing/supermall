<template>
  <div class="detail">
    <detail-nav-bar @itemClick="itemClick" ref="nav"></detail-nav-bar>
    <scroll
      :probeType="3"
      class="detail-scroll"
      ref="scroll"
      @scroll="detailScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendInfo"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCartButton"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar.vue";
import DetailSwiper from "views/detail/childComps/DetailSwiper.vue";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "views/detail/childComps/DetailBottomBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import { imgRefrashMixin, scrollTopMixin } from "common/mixins.js";
import { getDetail, Goods, Shop, Param, getRecommend } from "network/detail.js";
import {mapActions} from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommendInfo: [],
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo);
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule);
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list;
      }
    });
    getRecommend().then((res) => {
      this.recommendInfo = res.data.data.list;
    });
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs();
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    getThemeTopYs() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    detailScroll(position) {
      this.isShowBackTop = -position.y > 500;
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          ((i < length - 1 &&
            positionY > this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY > this.themeTopYs[i])) &&
          this.currentIndex != i
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addCartButton() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.discountDesc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;
      this.addCart(product).then((res)=>{
        this.$toast.show(res,1000)
      })
      // this.$store.dispatch("addCart", product).then((res)=>{
      //   console.log(res)
      // });
    },
  },
  mixins: [imgRefrashMixin, scrollTopMixin],
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgLister);
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-scroll {
  height: calc(100vh - 44px - 55px);
  overflow: hidden;
}
</style>
