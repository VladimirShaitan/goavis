<template>
  <div class="branch-wrapper">
    <div class="branch-photo" :style="{ backgroundImage: 'url('+org_logo+')' }"></div>
    <div class="branch-name">{{org_name}} </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "goAvisHeader",
        data(){
          return {
            org_name: '',
            org_logo: ''
          }
        },
        created: function () {
            axios.get('http://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/branch/getBranchInfo/'+localStorage.getItem('branchid'))
              .then((resp) => {
                this._data.org_name = resp.data.organization.name;
                this._data.org_logo = resp.data.organization.logoUrl;
              } )
              .catch((error) => {
                console.log(error);
              })
        }
    }
</script>
