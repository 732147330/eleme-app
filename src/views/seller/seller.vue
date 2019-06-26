<template lang="jade">
  -var c = 'seller'
  -var wrap = c + '__wrap'

  div(class="#{wrap}")
    | 我是蔡徐坤

</template>

<script>
  export default {
    name: "seller"
  };
</script>

<style>
  @c seller {
    @d wrap {

    }
  }
</style>
