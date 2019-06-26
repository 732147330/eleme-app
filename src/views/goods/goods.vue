<template lang="jade">
  -var c = 'goods'
  -var wrap = c + '__wrap'

  div(class="#{wrap}")
    m-scroll(class="menu_wrap", type="tab", :onclick="true")
      ul
        li(v-for="item, index in goods", :key="index", class="menu_item", :class="{'current':currentIndex === index}", @click="selectMenu(index)")
          span(class="item_cell border-1px")
            m-support-type-icon(v-show="item.type", :supportType="item.type", :text="item.name", :sizeType="3", :widthSize="16", :heightSize="16")
    m-scroll(class="foods_wrap", type="content", :listHeight="listHeight", :currentIndex.sync="currentIndex", :scrollObject.sync="foodsScroll", :onclick="true")
      ul
        li(v-for="item, index in goods", :key="index", class="food_list list_hook")
          h1(class="title") {{item.name}}
          ul
            li(v-for="food in item.foods", class="food_item border-1px")
              div(class="icon")
                img(:src="food.icon", width="57", height="57")
              div(class="content")
                h2(class="name") {{food.name}}
                p(class="desc") {{food.description}}
                div(class="extra")
                  span(class="count") 月售{{food.sellCount}}份
                  span 好评率{{food.rating}}%
                div(class="price")
                  span(class="now") ¥{{food.price}}
                  span(v-show="food.oldPrice", class="old") ¥{{food.oldPrice}}
                div(class="cartControl_wrapper")
                  cart-control(:food="food", @addCart="addCart($event)")
    shopcart(ref="shopcart", :selectFoods="selectFoods", :deliveryPrice="seller.deliveryPrice", :minPrice="seller.minPrice")
</template>

<script>
  import MSupportTypeIcon from "../../components/mSupportTypeIcon/mSupportTypeIcon";
  import MScroll from "../../components/mScroll/mScroll";
  import Shopcart from "../../components/shopcart/shopcart";
  import CartControl from "../../components/cartControl/cartControl";
  const ERR_OK = 200;

  export default {
    name: "goods",
    props: {
      seller: Object
    },
    components: { CartControl, Shopcart, MScroll, MSupportTypeIcon },
    data() {
      return {
        goods: [],
        listHeight: [],
        currentIndex: 0,
        foodsList: {},
        foodsScroll: {}
      }
    },
    computed: {
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count) {
              foods.push(food);
            }
          })
        })
        return foods;
      }
    },
    created() {
      let vm = this;
      vm.axios.get(vm.api.goods).then((res) => {
        let successData = res.data;
        if(successData.resCode === ERR_OK ) {
          vm.goods = successData.goods;
          vm.$nextTick(()=> {
            vm.calculateHeight();
          });
        }
      }, (res) => {
      });
    },
    methods: {
      calculateHeight() {
        let vm = this;
        vm.foodsList = document.getElementsByClassName('list_hook');
        let height = 0;
        vm.listHeight.push(height);
        for(let i = 0; i < vm.foodsList.length; i++){
          let item = vm.foodsList[i];
          height += item.clientHeight;
          vm.listHeight.push(height);
        }
      },
      selectMenu(index) {
        this.currentIndex = index;
        let element  = this.foodsList[index];
        this.foodsScroll.scrollToElement(element, 300);
      },
      addCart($event) {
        this.ballDrop($event.target);
      },
      ballDrop(target) {
        this.$refs.shopcart._drop(target);
      }
    }
  };
</script>

<style>
  @import "../../common/css/commonIndex.css";
  @import "../../styles/goods/goods.css";
</style>
