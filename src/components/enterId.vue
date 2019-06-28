<template>
      <div class="col-12">
        <a href="/" class="logo"><img src="../assets/imgs/avislogo.png" alt="avis.help"></a>
        <form id="branch_uid" @submit="getBranchByUID" @input="validForm">
          <div class="branch-id-wrapper">
            <h3>{{lang.enterIDHeader}}</h3>
            <div class="input-wrapper">
              <div class="autotabbed" @keydown="changeFocus">
                <span></span>
                <input autofocus type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs" id="last-input">
                <span></span>
              </div>
            </div>
            <div class="error">{{lang.enterIDError}}</div>
          </div>
          <input type="submit" disabled :value="lang.enterIDContinueBTN">
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
            let nextSib = e.target.nextElementSibling;
            let prevSib = e.target.previousElementSibling;

            if(e.target.value != ''){
              nextSib.focus();
            } else if(e.target.value === '') {
                prevSib.focus();
            }
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

              axios.get('http://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/branch/getBranchByUID/' + uid)
                .then((resp) => {
                  if (resp.data.branchId) {
                    localStorage.setItem('branchid', resp.data.branchId);
                    localStorage.setItem('qrtype', resp.data.qrType);
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
          validForm(e){
              // console.log(e.target);
            e.target.form.querySelector('.error').style.visibility = 'hidden';
            let uid = '';
              e.target.form.querySelectorAll('.inputs').forEach((item) => {
                uid += item.value;
              });
            const subInp = e.target.form.querySelector('input[type="submit"]');
              if(uid.length === 5){
                subInp.removeAttribute('disabled');
              } else {
                subInp.setAttribute('disabled', 'disabled');
              }
          }
        },
      beforeCreate: function () {
        this.$emit('qr-header', false);
      }
    }
</script>
