<template>
    <ul class="language-switcher">
      <select @change="changeLang" v-model="selected">
        <option v-for="lang in langs" :value="lang" :se="currentLang">{{lang}}</option>
      </select>

    </ul>
</template>

<script>
    export default {
      name: "langSwitcher",
      props: ['langs', 'current-lang'],
      methods: {
        changeLang(e){
            this.$emit('change-lang', e.target.value);
        }
      },
      data(){
        return {
          selected: this._props.currentLang
        }
      },
    }
</script>
