<template lang="jade">
  -var c = 'mTitle'
  -var wrap = c + '__wrap'

  div(class="#{wrap}")
    div(class="line")
    div(class="text") {{text}}
    div(class="line")

</template>

<script>
  export default {
    name: "mTitle",
    props: {
      text: {
        type: String
      }
    }
  }
</script>

<style>
  @import "./mTitle.css";
</style>
