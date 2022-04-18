<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img v-lazy="showImg" :key="showImg" alt="" @load="itemImgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">
        <span>{{ goodsItem.cfav }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemImgLoad() {
      this.$bus.$emit("itemImgLoad");
    },
    goodsItemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
};
</script>

<style scoped>
.goods-list-item {
  width: 48vw;
  font-size: 12px;
  position: relative;
}
.goods-list-item img {
  width: 100%;
  height: 230px;
  border-radius: 4px;
}
.goods-info {
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.price {
  color: var(--color-high-text);
}
.collect {
  /* display: flex; */
  position: relative;
  margin-left: 5px;
}
.collect::before {
  content: "";
  display: inline-block;
  padding-top: 2px;
  position: relative;
  top: 1px;
  width: 1em;
  height: 1em;
  background: url("~assets/img/common/collect.svg") 0 0/1em 1em;
}
</style>
