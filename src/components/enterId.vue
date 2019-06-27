<template>
      <div class="col-12">
        <a href="/" class="logo"><img src="../assets/imgs/avislogo.png" alt="avis.help"></a>
        <form id="branch_uid" @submit="getBranchByUID">
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
          </div>
          <input type="submit" :value="lang.enterIDContinueBTN">
          <input type="hidden" name="id">
        </form>
      </div>
</template>

<script>
    import axios from 'axios';
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
            console.log(e.target);
            console.log(e.target.value);

          },
          getBranchByUID(e){
            e.preventDefault();
            let uid = '';
            e.target.querySelectorAll('.inputs').forEach((item) => {
              uid += item.value;
            });
            uid = uid.toUpperCase();
            axios.get('http://qrticket-env.pymmzmsf4z.eu-west-3.elasticbeanstalk.com/api/v0/branch/getBranchByUID/'+uid).then((resp)=>{
              console.log(resp.data);
            });

          }
        }
    }
</script>
