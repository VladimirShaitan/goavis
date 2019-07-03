<template>

      <div class="col-12">
        <a href="/" class="logo"><img src="../assets/imgs/avislogo.png" alt="avis.help"></a>
        <form id="branch_uid" @submit="getBranchByUID" >
          <div class="branch-id-wrapper">
            <h3>{{lang.enterIDHeader}}</h3>
            <div class="input-wrapper">
              <div class="autotabbed" @click="changeFocus">
                <span></span>
                <input type="text" placeholder="—" required maxlength="1" class="inputs" readonly>
                <input type="text" placeholder="—" required maxlength="1" class="inputs" readonly>
                <input type="text" placeholder="—" required maxlength="1" class="inputs" readonly>
                <input type="text" placeholder="—" required maxlength="1" class="inputs" readonly>
                <input type="text" placeholder="—" required maxlength="1" class="inputs" id="last-input" readonly>
                <span></span>
              </div>
            </div>
            <div><input @keyup="falseInput" type="text" id="fake-input" autofocus autocomplete="off" style="opacity: 0"></div>
            <div class="error">{{lang.enterIDError}}</div>
          </div>
          <input type="submit" :value="lang.enterIDContinueBTN">
          <input type="hidden" name="id">
        </form>
      </div>

</template>

<script>
    import axios from 'axios';
    import router from '../assets/js/router.js';

    export default {
        name: "enterId",
        props: ['lang'],
        methods: {
          changeFocus(e){
            document.getElementById('fake-input').focus();
          },
          getBranchByUID(e) {
            console.log(this);
            e.preventDefault();
            let uid = '';
            e.target.querySelectorAll('.inputs').forEach((item) => {
              uid += item.value;
            });
            uid = uid.toUpperCase();
            console.log(uid.length);
            let errorBlock = e.target.querySelector('.error');

              axios.get('https://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/branch/getBranchByUID/' + uid)
                .then((resp) => {
                  if (resp.data.success) {
                    console.log(resp.data);
                    localStorage.setItem('branchid', resp.data.message.branchId);
                    localStorage.setItem('qrtype', resp.data.message.qrType);
                    router.push({name: 'review'});
                    this.$emit('qr-header', true);
                  } else {
                    errorBlock.style.visibility = 'visible';
                  }
                })
                .catch((error) => {
                  console.log(error);
                  errorBlock.style.visibility = 'visible';
                })

          },
          falseInput(e){

            document.querySelector('.error').style.visibility = 'hidden';

            if(document.querySelectorAll('.autotabbed input')[e.target.value.length-1] != undefined){
              document.querySelectorAll('.autotabbed input')[e.target.value.length-1].value = e.target.value[e.target.value.length-1];
            }

            if(!e.target.value[e.target.value.length]){

              if(document.querySelectorAll('.autotabbed input')[e.target.value.length] != undefined){
                document.querySelectorAll('.autotabbed input')[e.target.value.length].value = '';
              }

            }

            if(e.target.value.length > 5){
              e.target.value = e.target.value.substr(0, 5);
            }


          }
        },
      beforeCreate: function () {
        this.$emit('qr-header', false);
      }
    }
</script>
