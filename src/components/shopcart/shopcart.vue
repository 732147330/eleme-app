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
        transition(name="drop",
        @before-enter="drop_before_enter",
        @enter="drop_enter",
        @after-enter="drop_after_enter")
          div(class="ball", v-show="ball.show")
            div(class="inner inner-hook")
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
          {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}
        ],
        dropBalls: []
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
      _drop(el) {
        for(let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
          }
        }
      },
      drop_before_enter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 22;
            let y = -(window.innerHeight - rect.top - 48);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      drop_enter(el, done) {
        // let rf = el.offestHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
          el.addEventListener('transitionend', done);
        });
      },
      drop_after_enter(el) {
        this.$nextTick(() => {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            delete ball.el;
            el.style.display = 'none';
          }
        });
      }
    },
  }
</script>

<style>
  @import "shopcart.css";
  .drop-enter-active, .drop-leave-active {
    transition: all .3s cubic-bezier(.27,-0.41,.46,.47) ;
  }
  .drop-enter, .drop-leave-to {
  }
</style>
