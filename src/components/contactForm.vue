<template>
  <div>
        <h3>{{lang.contactHeader}}</h3>
        <div role="form" class="wpcf7" id="wpcf7-f126-o1" lang="en-US" dir="ltr">
          <div class="screen-reader-response"></div>
          <form @submit="handleContactForm">
            <div class="contact-wrapper input-wrapper">
                  <span class="wpcf7-form-control-wrap your-name">
                    <input type="text" name="your-name" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" :placeholder="lang.contactPlName">
                  </span>
              <br>
              <span class="wpcf7-form-control-wrap your-email">
                <input type="email" name="your-email" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email" aria-required="true" aria-invalid="false" :placeholder="lang.contactPlEmail">
              </span>
              <br>
              <span class="wpcf7-form-control-wrap your-tel">
                    <input type="tel" name="your-tel" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validates-as-tel" aria-required="true" aria-invalid="false" :placeholder="lang.contactPlPhone">
                </span>
            </div>
            <p>
              <span class="wpcf7-form-control-wrap your-consent">
                <span class="wpcf7-form-control wpcf7-acceptance">
                  <span class="wpcf7-list-item">
                    <label>
                      <input type="checkbox" name="your-consent" value="1" aria-invalid="false">
                      <span class="wpcf7-list-item-label">{{lang.contactAgreement}}
                      </span>
                    </label>
                  </span>
                </span>
              </span>
              <br>
              <input type="submit" :value="lang.contactSendBtn" class="wpcf7-form-control wpcf7-submit" disabled="">
              <span class="ajax-loader"></span>
            </p>
            <div class="wpcf7-response-output wpcf7-display-none"></div>
          </form>
        </div>
        <p class="accept contact" v-html="lang.contactSendingAgreement"></p>
        <a href="https://go.avis.help/review/?branchid=51&amp;qrtype=GENERAL" class="how-works "> {{lang.contactSHIW}}</a>
      </div>
</template>

<script>
    export default {
        name: "contactForm",
        props: ['lang'],
        data(){
          return {
            branch: ''
          }
        },
        methods: {
          handleContactForm(e){
            console.log(e.target);
          }
        }
    }
</script>

<style scoped>

</style>
