<template>



  <div id="app">
    <langSwitcher :langs="langs" :current-lang="currentLang" @change-lang="changeLang"/>
    <div class="container" :class="qrHeader ? 'qr-form' : ''">
      <!--:class="isBranchNeed ? 'qr-form' : ''"-->
      <div class="row">
        <div class="col-12">

          <transition name="fade">
            <router-view :lang="lang"></router-view>
          </transition>
            <!--<contactForm :lang="lang" /> &lt;!&ndash; Get started page &ndash;&gt;-->
            <!--<enterId :langs="lang" />-->
            <!--<leaveReview :lang="lang" />-->
            <!--<npsForm :lang="lang" />-->
            <!--<finish :lang="lang" />-->

            <goAvisFooter />
        </div>
      </div>
    </div>

  </div>


</template>

<script>
  import langSwitcher from './components/langSwitcher.vue';
  // import contactForm from './components/contactForm.vue';
  // import enterId from './components/enterId.vue';
  // import leaveReview from './components/leaveReview.vue';
  // import npsForm from './components/npsForm.vue';
  // import finish from './components/finish.vue';
  import goAvisFooter from './components/goAvisFooter.vue';
  import coockies from './assets/js/coockies.js';
  import ru from './assets/translation/ru.json';
  import en from './assets/translation/en.json';
  import fr from './assets/translation/fr.json';
  import ua from './assets/translation/ua.json';


  export default {
    name: 'app',
    data(){
      return{
        langs: site_defaults.language.langs,
        currentLang: '',
        lang: {}, // translations,
        apiData: {}, // data for api requests,
        qrHeader: true
      }
    },
    components: {
      langSwitcher,
      // contactForm,
      // enterId,
      // leaveReview,
      // finish,
      // npsForm,
      goAvisFooter
    },
    methods: {
      changeLang(langIndex){
        this.lang = get_translations(langIndex);
        coockies.set('lang', langIndex);
      }
    },
    created: function () {
      console.log(this.$router.currentRoute);

      // localisation
      if(coockies.get('lang') === undefined){
            coockies.set('lang', user_defaults.language);
            this.lang = get_translations(user_defaults.language);
      } else {
            this.lang = get_translations(coockies.get('lang'));
      }
      this.currentLang = this.lang.lang; // this.lang.lang equals language index (eg. en)
      // localisation

      // save GET paramethers


        if( ( coockies.findGetFromUrl('branchid') && coockies.findGetFromUrl('qrtype')) != null ){
            console.log('ok');

            localStorage.setItem('branchid', coockies.findGetFromUrl('branchid'));
            localStorage.setItem('qrtype', coockies.findGetFromUrl('qrtype'));
            history.replaceState( {} , '/', '/' );
        } else if(
          ( coockies.findGetFromUrl('branchid') && coockies.findGetFromUrl('qrtype')) === null
          &&
          ( localStorage.getItem('branchid') && localStorage.getItem('qrtype')) === null
        ) {
            alert('No GET data');
        }

      // save GET paramethers


      if(this.$router.currentRoute.name === 'main'){
          this.qrHeader = false
      }
    }
  }


  var urlParams = new URLSearchParams(window.location.search);
  const user_defaults = {
    language: navigator.language.split('-')[0]
  };


  const site_defaults = {
    language: {
      langs: ['fr', 'ua', 'ru','en'],
      default_lang: 'en',
      langs_trns: {
        'fr': fr,
        'ru': ru,
        'en': en,
        'ua': ua
      },

    }
  };

  function get_translations(lang){
    var lang_index = site_defaults.language.langs_trns[site_defaults.language.default_lang];

    if(lang && (site_defaults.language.langs.indexOf(lang) != -1) ){
        lang_index = site_defaults.language.langs_trns[lang];
    } else {
      if(site_defaults.language.langs.indexOf(user_defaults.language) != -1){
        lang_index = site_defaults.language.langs_trns[user_defaults.language];
      }
    }
    return lang_index;

  }

</script>
<style lang="css">
  @import 'https://use.fontawesome.com/releases/v5.7.2/css/all.css';
  @import 'assets/fonts/fonts.css';
  @import 'assets/css/bootstrap.min.css';
  @import 'assets/css/intlInputPhone.min.css';
  @import 'assets/css/style.css';
</style>

