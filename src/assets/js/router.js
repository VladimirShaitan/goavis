import Vue from 'vue'
import VueRouter from 'vue-router'

import contactForm from '../../components/contactForm.vue';
import enterId from '../../components/enterId.vue';
import leaveReview from '../../components/leaveReview.vue';
import npsForm from '../../components/npsForm.vue';
import finish from '../../components/finish.vue';
import terms from '../../components/terms.vue';


Vue.use(VueRouter);

const routes = [
  {name: 'main', path: '/', component: enterId},
  {name: 'review', path: '/review', component: leaveReview },
  {name: 'contact-form', path: '/get-started', component: contactForm },
  {name: 'nps',  path: '/nps', component: npsForm },
  {name: 'finish', path: '/thanks', component: finish },
  {name: 'terms', path: '/terms-of-use', component: terms },
  { path: "*", component: enterId }
];

export default new VueRouter({
  mode: 'history',
  routes
})
