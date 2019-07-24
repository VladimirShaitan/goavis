<template>
  <div class="branch-wrapper">
    <div class="branch-photo" :style="{ backgroundImage: 'url('+org_logo+')' }"></div>
    <div class="branch-name">{{org_name}}</div>
  </div>
</template>

<script>
    import axios from 'axios';
    import router from '../assets/js/router';
    export default {
        name: "goAvisHeader",
        data(){
          return {
            org_name: '',
            org_logo: ''
          }
        },
        created: function () {
          // console.log(this.$route);
          axios.get('https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/branch/getBranchInfo/'+localStorage.getItem('branchid'))
              .then((resp) => {
                this._data.org_name = resp.data.name;
                if(resp.data.branchLogoUrl){
                  this._data.org_logo = resp.data.branchLogoUrl;
                } else {
                  this._data.org_logo = resp.data.organization.logoUrl;
                }

                // console.log(resp.data);
              } )
              .catch((error) => {
                console.log(error);
              })
        }
    }
</script>
