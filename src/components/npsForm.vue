<template>
  <div>
        <goAvisHeader />
        <form id="nps_form" @change="enableSubmit" @submit="sendNPS">
          <div class="fake_disable hidden"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
          <div class="branch-id-wrapper nps-wrap">
            <h3 class="finish hidden" v-html="lang.npsThanks"></h3>
            <div class="nps-container">
              <h3>{{lang.npsHeader}}</h3>
              <p style="text-align: center;">{{lang.npsDescr}}</p>
              <div class="nps-wrapper">
                <input type="radio" name="scoreNps" value="0" id="nps-0"><label for="nps-0">0 <span></span></label>
                <input type="radio" name="scoreNps" value="1" id="nps-1"><label for="nps-1">1 <span></span></label>
                <input type="radio" name="scoreNps" value="2" id="nps-2"><label for="nps-2">2 <span></span></label>
                <input type="radio" name="scoreNps" value="3" id="nps-3"><label for="nps-3">3 <span></span></label>
                <input type="radio" name="scoreNps" value="4" id="nps-4"><label for="nps-4">4 <span></span></label>
                <input type="radio" name="scoreNps" value="5" id="nps-5"><label for="nps-5">5 <span></span></label>
                <input type="radio" name="scoreNps" value="6" id="nps-6"><label for="nps-6">6 <span></span></label>
                <input type="radio" name="scoreNps" value="7" id="nps-7"><label class="yellow" for="nps-7">7 <span></span></label>
                <input type="radio" name="scoreNps" value="8" id="nps-8"><label class="yellow" for="nps-8">8 <span></span></label>
                <input type="radio" name="scoreNps" value="9" id="nps-9"><label class="green" for="nps-9">9 <span></span></label>
                <input type="radio" name="scoreNps" value="10" id="nps-10"><label class="green" for="nps-10">10 <span></span></label>

              </div>
              <input type="hidden" name="branchId" :value="barnch_id">
              <input id="submit_nps" name="submit_nps" type="submit" disabled :value="lang.npsSend" />
            </div>
          </div>
        </form>
      </div>
</template>

<script>
    import axios from 'axios';
    import serialize from '../assets/js/serialize';
    import goAvisHeader from './goAvisHeader.vue';
    import router from '../assets/js/router.js'

    export default {
        name: "npsForm",
        props: ['lang'],
      components: {
        goAvisHeader
      },
        data(){
            return {
              barnch_id: '',
              qr_type: '',
              org_name: '',
              org_logo: ''
          }
        },
        created: function () {
          this.barnch_id = localStorage.getItem('branchid');
          this.qr_type = localStorage.getItem('qrtype');

          axios.get('http://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/branch/getBranchInfo/'+this.barnch_id )
            .then((resp) => {
              this._data.org_name = resp.data.organization.name;
              this._data.org_logo = resp.data.organization.logoUrl;
            } )
            .catch((error) => {
              console.log(error);
            })
        },
        methods: {
          enableSubmit(e){
            e.target.form.querySelector('input[type="submit"]').removeAttribute('disabled');
          },
          sendNPS(e){


            e.preventDefault();

            axios.post('http://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/nps/addNps?'+ serialize(e.target))
              .then(function (resp) {
                // console.log(resp.data)
                router.push({name: 'finish'});
              })
              .catch(function (error) {
                alert(error)
              })

          }

        }

    }
</script>
