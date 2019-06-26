<template>
  <div class="container qr-form">
    <div class="row">
      <div class="col-12">
        <div class="branch-wrapper">
          <div class="branch-photo" style="background-image: url(<?php echo $organization->organization->logoUrl; ?>)"></div>
          <div class="branch-name"><?php echo $organization->name; ?></div>
        </div>
        <form id="nps_form" method="post" action="#" enctype="multipart/form-data">
          <div class="fake_disable hidden"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
          <div class="branch-id-wrapper nps-wrap">
            <h3 class="finish hidden" v-html="npsThanks"></h3>
            <div class="nps-container">
              <h3>{{npsHeader}}</h3>
              <p style="text-align: center;">{{npsDescr}}</p>
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
              <input id="submit_nps" name="submit_nps" type="submit" disabled :value="npsSend" />
            </div>
          </div>
        </form>
        <a href="#" class="logo"><img src="../assets/imgs/avislogo.png" alt="avis"></a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "npsForm",
        props: ['lang']
    }
</script>

<style scoped>

</style>
