<template lang="jade">
  -var c = 'shopcart'
  -var wrap = c + '__wrap'

  div(class="#{wrap}")
    div(class="content")
      div(class="content_left")
        div(class="logo_wrap")
          div(class="logo", :class="{'highlight': totalCount > 0}")
            i(class="icon-shopping_cart icon", :class="{'highlight': totalCount > 0}")
          div(class="num", v-show="totalCount > 0") {{totalCount}}
        div(class="price", :class="{'highlight': totalPrice > 0}") ¥ {{totalPrice}}
        div(class="desc") 另需配送费 ¥ {{deliveryPrice}} 元
      div(class="content_right")
        div(class="pay", :class="payClass") {{payDesc}}

    div(class="ball_container")
      div(v-for="ball, index in balls", :key="index")
        transition(name="drop")
          div(clas="ball", v-show="ball.show")
</template>

<script>
  export default {
    name: "shopcart",
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ]
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price*food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if(this.totalPrice === 0) {
          return `¥${this.minPrice} 元起送`;
        }else if(this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice;
          return `还差 ¥${diff} 元起送`;
        }else {
          return '去结算';
        }
      },
      payClass() {
        if(this.totalPrice < this.minPrice){
          return 'not_enough';
        }else {
          return 'enough';
        }
      }
    },
    methods: {
      _drop(target) {
        console.log(target);
      }
    },
  }
</script>

<style>
  @import "shopcart.css";
  .drop-enter-active, .drop-leave-active {
    transition: all .4s;
  }
  .drop-enter, .drop-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0, 0) rotate(180deg);
  }
</style>
