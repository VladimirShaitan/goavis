<template>
      <div class="lr">

        <transition appear name="slide-top">
          <div>
            <goAvisHeader />
            <p class="message">{{lang.leaveReviewTopMessage}}</p>
          </div>
          </transition>

        <transition appear name="slide-bottom">
          <form id="featured_upload" @submit="sendReview" @change="formChange" enctype="multipart/form-data">
            <div class="fake_disable hidden"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
            <div class="branch-id-wrapper padding">
              <h3>{{lang.leaveReviewFormHeader}}</h3>
              <div class="input-wrapper">
                <div class="container">
                  <div class="starrating risingstar d-flex justify-content-center flex-row-reverse">
                    <input type="radio" id="star5" name="impression" value="5" /><label for="star5" title="5 star"></label>
                    <input type="radio" id="star4" name="impression" value="4" /><label for="star4" title="4 star"></label>
                    <input type="radio" id="star3" name="impression" value="3" /><label for="star3" title="3 star"></label>
                    <input type="radio" id="star2" name="impression" value="2" /><label for="star2" title="2 star"></label>
                    <input type="radio" id="star1" name="impression" value="1" /><label for="star1" title="1 star"></label>
                  </div>
                </div>

                <input type="text" name="message" :placeholder="lang.leaveReviewCommentField" autocomplete="off">
                <input type="hidden" name="qrType" :value="qr_type">
              </div>
            </div>

            <div class="number-form">
              <div class="branch-id-wrapper">
                <p style="text-align: center;">{{lang.leaveReviewPhoneHeader}}</p>
                <div class="input-wrapper">
                  <div class="input-phone">
                    <vue-tel-input v-model="phone" name="phone"  v-bind="telSettings"  autocomplete="off"></vue-tel-input>
                    <!-- v-bind:placeholder="lang.leaveReviewPhoneNumber" -->
                  </div>
                </div>
              </div>
            </div>
            <div class="form-footer">
              <div class="branch-id-wrapper image-download">
                <label for="my_image_upload" class="label-upload"></label>
                <input type="file" id="my_image_upload"  multiple="false" accept="image/*" />
              </div>

              <input id="submit_my_image_upload" name="submit_my_image_upload" type="submit" disabled :value="lang.leaveReviewFormSubmit" />
            </div>
          </form>
        </transition>
        <p class="accept" v-html="lang.leaveReviewAgreement"></p>
      </div>
</template>

<script>
  import VueTelInput from 'vue-tel-input';
  import 'vue-tel-input/dist/vue-tel-input.css';
  import coockies from '../assets/js/coockies.js'
  import serialize from  '../assets/js/serialize.js'
  import axios from 'axios'
  import goAvisHeader from "./goAvisHeader";
  import router from '../assets/js/router.js'

  export default {
      name: "leaveReview",
      props: ['lang'],
      components: {
        VueTelInput,
        goAvisHeader
      },
      data(){
        return {
          barnch_id: '',
          org_name: '',
          org_logo: '',
          qr_type: '',
          phone: '',
          prefCountries: {
            RU: ['BY', 'UA', 'RU'],
            UA: ['BY', 'UA', 'RU'],
            GB: ['AU', 'CA', 'GB', 'IE', 'NZ', 'US'],
            FR: ['AU', 'CA', 'GB', 'IE', 'NZ', 'US']
          },
          telSettings: {
            ignoredCountries: ['BA', 'CF', 'CD', 'DO', 'KP', 'MF', 'PM', 'VC', 'ST', 'GF', 'PF', 'MK', 'NC', 'AE', 'WF', 'CG', 'GQ'],
            wrapperClasses: 'telInputWrapper',
            preferredCountries: [],
            defaultCountry: '',
            placeholder: '',
          },
        }
      },
      created: function () {
        this.barnch_id = localStorage.getItem('branchid');
        this.qr_type = localStorage.getItem('qrtype');
        this.telSettings.preferredCountries = this.prefCountries[this.$props.lang.country];
        this.telSettings.defaultCountry = this.$props.lang.country;
        this.telSettings.placeholder = this.$props.lang.leaveReviewPhoneNumber;
      //leaveReviewPhoneNumber
      },
      updated: function () {
        this.telSettings.preferredCountries = this.prefCountries[this.$props.lang.country];
        this.telSettings.defaultCountry = this.$props.lang.lang.toUpperCase();
        this.telSettings.placeholder = this.$props.lang.leaveReviewPhoneNumber;
      },
      methods:{
          sendReview(e){
            e.preventDefault();

            let formData = new FormData();
            let imagefile = document.querySelector('#my_image_upload');
            formData.append('file', imagefile.files[0]);

            let apiUrl = 'https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/review/addReview/'+this.barnch_id+'?'+ serialize(e.target)+'&lang='+this.$props.lang.lang;
            // console.log(apiUrl);
            axios.post(apiUrl, formData)
              .then(function (resp) {
                // console.log(resp.data);
                if(resp.data.success){
                  router.push({name: 'nps'});
                }
              })
              .catch(function (error) {
                alert(error)
              })
        },
        formChange(e){
            if(e.target.id === 'my_image_upload'){
                var label = e.target.parentElement.querySelector('label.label-upload');
                label.classList.add('label-uploaded');
            }
          if(e.target.name === 'impression'){
            e.target.form.querySelector('input[type="submit"]').removeAttribute('disabled');
          }
        }


    }
  }
</script>


<style scoped>

  .vue-tel-input{
    border: none;
  }


  .vue-tel-input:focus-within{
    box-shadow: none
  }
  @media(max-width: 420px){
    .lr{width: 100%}
  }
</style>
