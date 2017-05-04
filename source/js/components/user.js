import Vue from 'vue/dist/vue.js';
import template from '../templates/user';

const user = Vue.component('component-user', {
	props: ['user'],
	template,
});

export default user;
