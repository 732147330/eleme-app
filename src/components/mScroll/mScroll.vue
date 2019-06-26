<template lang="jade">
  -var c = 'mScroll'
  -var wrap = c + '__wrap'

  div(class="#{wrap}", ref="scrollWrapper")
    slot

</template>

<script>
  import BScroll from "./better-scroll/src/index.js";

  export default {
    name: "mScroll",
    props: {
      type: {//normal: 正常滚动模版；content：内容滚动模版；tab：导航滚动模版 （content与tab进行联动）
        type: String,
        default: 'normal'
      },
      listHeight: {//获取dom元素高度数组
        type: Array,
        default() {
          return [];
        }
      },
      currentIndex: {//tab当前下标
        type: Number,
        default: 0
      },
      scrollObject: {//将sroll对象与父组件同步联动
        type: Object,
        default() {
          return {};
        }
      },
      onclick: {//是否触发滚动dom元素里的点击事件
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0,
        customScroll: this.scrollObject
      }
    },
    mounted() {
      let vm = this;
      vm._initScroll();
    },
    methods: {
      _initScroll() {
        let vm = this;
        if(vm.type === "content") {
          vm.customScroll = new BScroll(vm.$refs.scrollWrapper, {
            click: this.onclick,
            probeType: 3,
          });
          vm.customScroll.on('scroll', (pos) => {
            vm.scrollY = Math.abs(Math.round(pos.y));
            let currentIndex = vm._changeCurrentIndex();
            vm.$emit('update:currentIndex', currentIndex);
          });
          vm.$emit('update:scrollObject', vm.customScroll);
        }else if(vm.type === "tab") {
          vm.customScroll = new BScroll(vm.$refs.scrollWrapper, {
            click: this.onclick,
          });
        }else {
          vm.customScroll = new BScroll(vm.$refs.scrollWrapper, {
            click: this.onclick,
          });
        }
      },
      _changeCurrentIndex() {
        let vm = this;
        if(vm.type != "content") return 0;
        if(vm.listHeight === undefined) return 0;
        for(let i = 0; i < vm.listHeight.length; i++) {
          let height1 = vm.listHeight[i];
          let height2 = vm.listHeight[i+1];
          if(!height2 || (vm.scrollY >= height1 && vm.scrollY < height2)) return i;
        }
        return 0;
      }
    }
  }
</script>

<style>
  @import "mScroll.css";
</style>
