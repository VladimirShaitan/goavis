<template>
  <div class="container qr-form">
    <div class="row">
      <div class="col-12">
        <div class="branch-wrapper">
          <div class="branch-photo" :style="{ backgroundImage: 'url('+org_logo+')' }"></div>
          <div class="branch-name">{{org_name}}</div>
        </div>
        <form id="nps_form" method="post" action="#" enctype="multipart/form-data">
          <div class="fake_disable hidden"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
          <div class="branch-id-wrapper nps-wrap">
            <h3 class="finish hidden" v-html="lang.npsThanks"></h3>
            <div class="nps-container">
              <h3>{{lang.npsHeader}}</h3>
              <p style="text-align: center;">{{lang.npsDescr}}</p>
              <div class="nps-wrapper">
                <input type="radio" name="nps" value="0" id="nps-0"><label for="nps-0">0 <span></span></label>
                <input type="radio" name="nps" value="1" id="nps-1"><label for="nps-1">1 <span></span></label>
                <input type="radio" name="nps" value="2" id="nps-2"><label for="nps-2">2 <span></span></label>
                <input type="radio" name="nps" value="3" id="nps-3"><label for="nps-3">3 <span></span></label>
                <input type="radio" name="nps" value="4" id="nps-4"><label for="nps-4">4 <span></span></label>
                <input type="radio" name="nps" value="5" id="nps-5"><label for="nps-5">5 <span></span></label>
                <input type="radio" name="nps" value="6" id="nps-6"><label for="nps-6">6 <span></span></label>
                <input type="radio" name="nps" value="7" id="nps-7"><label class="yellow" for="nps-7">7 <span></span></label>
                <input type="radio" name="nps" value="8" id="nps-8"><label class="yellow" for="nps-8">8 <span></span></label>
                <input type="radio" name="nps" value="9" id="nps-9"><label class="green" for="nps-9">9 <span></span></label>
                <input type="radio" name="nps" value="10" id="nps-10"><label class="green" for="nps-10">10 <span></span></label>

              </div>
              <input id="submit_nps" name="submit_nps" type="submit" disabled :value="lang.npsSend" />
            </div>
          </div>
        </form>
        <a href="#" class="logo"><img src="../assets/imgs/avislogo.png" alt="avis"></a>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "npsForm",
        props: ['lang'],
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

    }
</script>

<style scoped>

</style>
