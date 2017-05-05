import Vue from 'vue/dist/vue.js';
import template from '../templates/media-player';

const mediaPlayer = Vue.component('component-media-player', {
	props: ['src'],
	template,
	mounted() {
		this.player = this.$el.querySelector('audio');
	},
	watch: {
		src: function() { // eslint-disable-line object-shorthand
			this.playAudio();
		},
	},
	methods: {
		playAudio() {
			const { player } = this;

			player.oncanplaythrough = () => player.play();
		},
	},
});

export default mediaPlayer;
