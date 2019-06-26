<template>
  <!--<div class="container">-->
    <!--<div class="row">-->
      <div class="col-12">
        <a href="/" class="logo"><img src="../assets/imgs/avislogo.png" alt="avis.help"></a>
        <form id="branch_uid">
          <div class="branch-id-wrapper">
            <h3>{{langs.enterIDHeader}}</h3>
            <div class="input-wrapper">
              <div class="autotabbed">
                <input type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs">
                <input type="text" placeholder="—" maxlength="1" class="inputs" id="last-input">
                <span></span>
              </div>
            </div>
          </div>
          <input type="submit" :value="langs.enterIDContinueBTN">
          <input type="hidden" name="id">
        </form>
      </div>
    <!--</div>-->
  <!--</div>-->
</template>

<script>
    export default {
        name: "enterId",
        props: ['langs']
    }
</script>
