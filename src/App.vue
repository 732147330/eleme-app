<template lang="jade">
  -var c = 'app'
  -var wrap = c + '__wrap'
  -var content = wrap + '__content'

  div(class="#{wrap}")
    m-header(:seller="seller")
    div(class="tab border-1px")
      div(class="tab-item")
        router-link(to="/goods") 商品
      div(class="tab-item")
        router-link(to="/ratings") 评论
      div(class="tab-item")
        router-link(to="/seller") 商家
    router-view(class="#{content}", :seller="seller")

</template>

<script>
  import MHeader from "./components/mHeader/mHeader";

  const ERR_OK = 200;

  export default {
    name: "app",
    components: {MHeader},
    data() {
      return {
        seller: {},
        ratings: {},
      }
    },
    created() {
      let vm = this;
      vm.axios.get(vm.api.seller).then((res) => {
        let successData = res.data
        if(successData.resCode === ERR_OK ) {
          vm.seller = successData.seller;
        }
      }, (res) => {
      });
      vm.axios.get(vm.api.ratings).then((res) => {
        let successData = res.data
        if(successData.resCode === ERR_OK ) {
          vm.ratings = successData.ratings;
        }
      }, (res) => {
      });
    }
  };
</script>


<style>
  @import "common/css/commonIndex.css";
</style>

