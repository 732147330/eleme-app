<template lang="jade">
  -var c = 'cartControl'
  -var wrap = c + '__wrap'

  div(class="#{wrap}")
    transition(name="move")
      div(class="inner", v-show="food.count>0")
        span(class="icon-remove_circle_outline decrease", @click="decreaseCart()")
    div(class="count", v-show="food.count>0") {{food.count}}
    div(class="icon-add_circle add", @click="addCart($event)")

</template>

<script>
  import Vue from 'vue';
  export default {
    name: "cartControl",
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart($event) {
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1);
        }else {
          this.food.count++;
        }
        this.$emit('addCart', $event)
      },
      decreaseCart() {
        if(this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style>
  @import "cartControl.css";
  .move-enter-active, .move-leave-active {
    transition: all .4s linear;
  }
  .move-enter, .move-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0, 0) rotate(180deg);
  }
</style>
