import Vue from 'vue'
import VueRouter from 'vue-router'

import contactForm from '../../components/contactForm.vue';
import enterId from '../../components/enterId.vue';
import leaveReview from '../../components/leaveReview.vue';
import npsForm from '../../components/npsForm.vue';
import finish from '../../components/finish.vue'

// console.log(enterId);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: enterId },
  { path: '/review', component: leaveReview },
  { path: '/get-started', component: contactForm },
  { path: '/nps', component: npsForm },
  { path: '/thanks', component: finish }
];

export default new VueRouter({
  mode: 'history',
  routes
})
