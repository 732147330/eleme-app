<template lang="jade">
  -var c = 'mHeader'
  -var wrap = c + '__wrap'
  -var content = wrap + '__content'
  -var bulletin = wrap + '__bulletin'
  -var background = wrap + '__background'
  -var detail = wrap + '__detail'

  div(class="#{wrap}")
    div(class="#{content}")
      div(class="content_avatar")
        img(width="64", height="64", :src="seller.avatar")
      div(class="content_wrap")
        div(class="content_wrap_title")
          span(class="brand")
          span(class="name") {{seller.name}}
        div(class="content_wrap_description") {{seller.description}}/{{seller.deliveryTime}}分钟送达
        div(v-if="seller.supports", class="content_wrap_support")
          m-support-type-icon(:supportType="seller.supports[0].type", :text="seller.supports[0].description", :sizeType="1", :widthSize="12", :heightSize="12")
      div(v-if="seller.supports", class="content_support_count", @click="showDetail()")
        span(class="count") {{seller.supports.length}}个
        i(class="icon-keyboard_arrow_right icon")
    div(class="#{bulletin}", @click="showDetail()")
      span(class="bulletin_title")
      span(class="bulletin-text") {{seller.bulletin}}
      i(class="icon-keyboard_arrow_right icon")
    div(class="#{background}")
      img(:src="seller.avatar", width="100%", height="100%")

    transition(name="fade")
      div(v-if="detailShow", class="#{detail}")
        div(class="detail_wrap clearfix")
          div(class="detail_wrap_main")
            h1(class="name") {{seller.name}}
            div(class="stars")
              m-star(:size="48", :score="seller.score", :starsNum="5")
            div(class="title")
              m-title(text="优惠信息")
            ul(v-if="seller.supports", class="supports")
              li(class="supports_item", v-for="item, index in seller.supports", :key="index")
                m-support-type-icon(:supportType="item.type", :text="item.description", :sizeType="2", :widthSize="16", :heightSize="16")
            div(class="title")
              m-title(text="商家公告")
            div(class="bulletin")
              p(class="content") {{seller.bulletin}}
        div(class="detail_footer", @click="hideDetail()")
          i(class="icon-close")

</template>

<script>
  import MStar from "../mStar/mStar";
  import MTitle from "../mTitle/mTitle";
  import MSupportTypeIcon from "../mSupportTypeIcon/mSupportTypeIcon";

  export default {
    name: "mHeader",
    components: { MSupportTypeIcon, MTitle, MStar },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    }
  };
</script>

<style>
  @import "../../common/css/commonIndex.css";
  @import "./mHeader.css";
  .fade-enter-active, .fade-leave-active {
    transition: all 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
