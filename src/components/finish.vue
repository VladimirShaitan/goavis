<template>
  <div>

    <transition appear name="slide-bottom">
    <div>
      <goAvisHeader />
      <div class="container number-form">
        <div class="row">
          <div class="branch-id-wrapper nps-wrap">
            <h3 class="finish" v-html="lang.finishHeader"></h3>
          </div>
        </div>
      </div>
    </div>
    </transition>

  </div>
</template>

<script>
  import goAvisHeader from './goAvisHeader.vue';

    export default {
        name: "finish",
        props: ['lang'],
        components: {goAvisHeader},
        data(){
          return {
            org_name: '',
            org_logo: ''
          }
        }
    }
</script>
