<template>
      <div class="col-12">
        <a href="/" class="logo"><img src="../assets/imgs/avislogo.png" alt="avis.help"></a>
        <form id="branch_uid">
          <div class="branch-id-wrapper">
            <h3>{{langs.enterIDHeader}}</h3>
            <div class="input-wrapper">
              <div class="autotabbed" @keydown="changeFocus">
                <span></span>
                <input autofocus d-a="1" type="text" placeholder="—" maxlength="1" class="inputs">
                <input d-a="2" type="text" placeholder="—" maxlength="1" class="inputs">
                <input d-a="3" type="text" placeholder="—" maxlength="1" class="inputs">
                <input d-a="4" type="text" placeholder="—" maxlength="1" class="inputs">
                <input d-a="5" type="text" placeholder="—" maxlength="1" class="inputs" id="last-input">
                <span></span>
              </div>
            </div>
          </div>
          <input type="submit" :value="langs.enterIDContinueBTN">
          <input type="hidden" name="id">
        </form>
      </div>
</template>

<script>
    export default {
        name: "enterId",
        props: ['langs'],
        methods: {
          changeFocus(e){

            let nextSib = e.target.nextElementSibling;
            let prevSib = e.target.previousElementSibling;


            if(e.target.value != ''){
              nextSib.focus();
            } else {
              // if(prevSib.value != undefined && nextSib.value === ''){
              //   console.log(e.target);
              //   prevSib.value = '';
              // }
              if(e.target.value === ''){
                prevSib.focus();
              }

            }
            console.log(e.target);
            console.log(e.target.value);

          },
        }
    }
</script>
