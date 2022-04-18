import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop.vue";
export const imgRefrashMixin = {
  data(){
    return {
      itemImgLister:null
    }
  },
  mounted() {
  	let newRefresh = debounce(this.$refs.scroll.refresh,100)
  	this.itemImgLister = ()=> {
  		newRefresh()
  	}
  	this.$bus.$on('itemImgLoad',this.itemImgLister);
  }
}
export const scrollTopMixin = {
  data() {
	  return {
		  isShowBackTop: false,
	  }
  },
  components: {
	  BackTop
  },
  methods: {
	  backTop(){
	  	//返回顶部
	  	this.$refs.scroll.scrollTo(0,0);
	  }
  }
}
