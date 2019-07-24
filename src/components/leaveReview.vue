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
                <image-uploader
                  :preview="true"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  capture="environment"
                  :debug="0"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage"
                  :maxWidth="400"
                  :maxHeight="500"
                  :quality="0.7"
                >
                  <label for="fileInput" slot="upload-label">
                    <figure>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path class="path1" d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"></path>
                      </svg>
                    </figure>
                  </label>


                </image-uploader>
              </div>

              <input id="submit_my_image_upload" name="submit_my_image_upload" type="submit" disabled :value="lang.leaveReviewFormSubmit" />

            </div>
          </form>
        </transition>
        <p class="accept" v-html="lang.leaveReviewAgreement"></p>
      </div>
</template>

<script>
  import Vue from 'vue';
  import VueTelInput from 'vue-tel-input';
  import 'vue-tel-input/dist/vue-tel-input.css';
  import coockies from '../assets/js/coockies.js'
  import serialize from  '../assets/js/serialize.js'
  import axios from 'axios'
  import goAvisHeader from "./goAvisHeader";
  import router from '../assets/js/router.js';
  import ImageUploader from 'vue-image-upload-resize'
  Vue.use(ImageUploader);

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
            RU: ['UA', 'BY', 'RU'],
            UA: ['RU', 'BY', 'UA'],
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
          hasImage: false,
          image: null,
          startImageResize: '',
          endImageResize: '',

        }
      },
      created: function () {
        this.barnch_id = localStorage.getItem('branchid');
        this.qr_type = localStorage.getItem('qrtype');
        this.telSettings.preferredCountries = this.prefCountries[this.$props.lang.country];
        this.telSettings.defaultCountry = this.$props.lang.basePhoneMask;
        this.telSettings.placeholder = this.$props.lang.leaveReviewPhoneNumber;
      //leaveReviewPhoneNumber


      },
      updated: function () {
        this.telSettings.preferredCountries = this.prefCountries[this.$props.lang.country];
        this.telSettings.defaultCountry = this.$props.lang.basePhoneMask;
        this.telSettings.placeholder = this.$props.lang.leaveReviewPhoneNumber;
      },
      methods:{
          sendReview(e){
            e.preventDefault();

            let formData = new FormData();
            let imagefile = document.querySelector('#my_image_upload');
            formData.append('file', this.image);

            let apiUrl = 'https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/review/addReview/'+this.barnch_id+'?'+ serialize(e.target)+'&lang='+this.$props.lang.lang;
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
        },

        setImage: function (file) {
          this.hasImage = true;
          this.image = file;

          document.querySelector('.branch-id-wrapper.image-download label').parentElement.style.position = 'relative';
          document.querySelector('.branch-id-wrapper.image-download label').classList.add('img_uploader');
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
