<template>

  <div>
    <transition appear name="fade">
    <div class="container number-form">
      <div class="row">
        <div class="col-12">
          <h3>{{lang.termsSiteUse}}</h3>
          <p>{{lang.termsP1}}</p>

          <h3>{{lang.termsDenyResp}}</h3>
          <p>{{lang.termsP2}}</p>

          <h3>{{lang.termsPostMes}}</h3>
          <p>{{lang.termsP3}}</p>

          <h3>{{lang.termsFbRevs}}</h3>
          <p>{{lang.termsP4}}</p>

          <h3>{{lang.termsPData}}</h3>
          <p>{{lang.termsP5}}</p>

          <h3>{{lang.termsDStorage}}</h3>
          <p>{{lang.termsP6}}</p>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "terms",
        props: ['lang']
    }
</script>

<style scoped>
  .number-form h3{
    color: #ed6868;
    font-family: "Avenir";
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 0.04px;
    margin: 20px 0;
    text-align: center;
  }
  p{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 17px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
  }
</style>
