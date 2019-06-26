<template lang="jade">
  -var c = 'ratings'
  -var wrap = c + '__wrap'

  div(class="#{wrap}")
    | 我是蒜头王八

</template>

<script>
  export default {
    name: "ratings"
  };
</script>

<style>
  @c ratings {
    @d wrap {

    }
  }
</style>
