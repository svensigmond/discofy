import Moon from 'moonjs';
import template from '../templates/user';

const user = Moon.component('component-user', {
	props: ['user'],
	template,
});

export default user;
