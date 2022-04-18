<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="buttonChange"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算：({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomButton",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((oldValue, item) => {
            return oldValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    buttonChange() {
      if (this.isSelectAll) {
        // 全部选中
        this.cartList.forEach((element) => (element.checked = false));
      } else {
        // 没有全部选中(部分不选中)
        this.cartList.forEach((element) => (element.checked = true));
      }
      // this.cartList.forEach(element => element.checked = !this.isSelectAll);
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1000)
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 15px;
  margin-right: 5px;
  width: 90px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price {
  margin-left: 10px;
  flex: 1;
}
.calculate{
  background-color: red;
  padding:0 6px;
}
</style>
