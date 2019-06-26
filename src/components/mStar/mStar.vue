<template lang="jade">
  -var c = 'mStar'
  -var wrap = c + '__wrap'

  div(class="#{wrap}", :class="starType")
    span(v-for="itemClass, index in itemClasses", :class="itemClass", class="star_item", :key="index")

</template>

<script>
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
      name: "mStar",
      props: {
        size: {
          type: Number
        },
        score: {
          type: Number
        },
        starsNum: {
          type: Number
        }
      },
      computed: {
        starType() {
          return 'star-' + this.size;
        },
        itemClasses() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = score % 1 !== 0;
          let integer = Math.floor(score);
          for(let i = 0; i < integer; i++){
            result.push(CLS_ON);
          }
          if(hasDecimal) {
            result.push(CLS_HALF);
          }
          while (result.length < this.starsNum) {
            result.push(CLS_OFF);
          }
          return result;
        }
      },
    }
</script>

<style>
  @import "./mStar.css";
</style>
