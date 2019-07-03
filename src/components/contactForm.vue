<template>
  <div>
    <transition appear name="slide-bottom">
    <div>
        <h3>{{lang.contactHeader}}</h3>
        <div role="form" class="wpcf7" id="wpcf7-f126-o1" lang="en-US" dir="ltr">
          <div class="screen-reader-response"></div>
          <form @submit="handleContactForm" >
            <div class="contact-wrapper input-wrapper">
                  <span class="wpcf7-form-control-wrap your-name">
                    <input type="text" required name="name" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" :placeholder="lang.contactPlName">
                  </span>
              <br>
              <span class="wpcf7-form-control-wrap your-email">
                <input type="email" name="mail" required value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email" aria-required="true" aria-invalid="false" :placeholder="lang.contactPlEmail">
              </span>
              <br>
              <span class="wpcf7-form-control-wrap your-tel">
                    <input type="tel" name="phone" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validates-as-tel" aria-required="true" aria-invalid="false" :placeholder="lang.contactPlPhone">
                </span>
              <div class="message-send">{{lang.contactSendedSuccess}}</div>
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
              <input type="submit" :value="lang.contactSendBtn" class="wpcf7-form-control wpcf7-submit">
              <span class="ajax-loader"></span>
            </p>
            <div class="wpcf7-response-output wpcf7-display-none"></div>
          </form>
        </div>
        <p class="accept contact" v-html="lang.contactSendingAgreement"></p>
        <a @click="testAccRev"  href="#" class="how-works "> {{lang.contactSHIW}}</a>
      </div>
    </transition>
  </div>
</template>

<script>
    import axios from 'axios';
    import serialize from '../assets/js/serialize.js'
    import router from '../assets/js/router.js'

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
            e.preventDefault();
            axios.post('https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/utils/send_email?'+serialize(e.target))
              .then((resp) => {
                if(resp.data.success){
                  e.target.querySelector('.message-send').style.opacity = 1;
                  setTimeout(() => {
                    e.target.querySelector('.message-send').style.opacity = 0;
                  }, 3000)
                }
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(serialize(e.target));
          },
          testAccRev(e){
            e.preventDefault();
            // (51, 'GENERAL')
            localStorage.setItem('branchid', 51);
            localStorage.setItem('qrtype', 'GENERAL');
            router.push({name: 'review'})
          }

        },
      beforeCreate: function () {
        this.$emit('qr-header', true);
      }
    }
</script>

<style scoped>

</style>
