<template lang="jade">
  -var c = 'mSupportTypeIcon'
  -var wrap = c + '__wrap'
  div(class="#{wrap}")
    span(v-if="supportType > -1", class="icon", :class="`${supportTypeMap[supportType]}_${sizeType}`", :style="iconStyle")
    span(class="text") {{text}}

</template>

<script>
  export default {
    name: "mSupportTypeIcon",
    props: {
      supportType: {
        type: Number,
        default: -1
      },
      text: {
        type: String
      },
      sizeType: {
        type: Number,
        default: 1
      },
      widthSize: {
        type: Number,
        default: 12
      },
      heightSize: {
        type: Number,
        default: 12
      }
    },
    data() {
      return {
        supportTypeMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        iconStyle: {},
      }
    },
    created() {
      let vm = this;
      vm.iconStyle.width = vm.widthSize + "px";
      vm.iconStyle.height = vm.heightSize + "px";
      vm.iconStyle.backgroundSize = vm.widthSize + "px " + vm.heightSize + "px";
    }
  }
</script>

<style>
  @import "./mSupportTypeIcon.css";
</style>
