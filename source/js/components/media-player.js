import Vue from 'vue/dist/vue.js';
import template from '../templates/media-player';

const mediaPlayer = Vue.component('component-media-player', {
	props: ['media'],
	data() {
		return {
			active: null,
			playlist: [],
			player: new Audio(),
		};
	},
	template,
	watch: {
		active: function(index) { // eslint-disable-line object-shorthand
			this.play(index);
		},
		media: function() { // eslint-disable-line object-shorthand
			this.start();
		},
	},
	methods: {
		start() {
			const { media, player, playlist } = this;

			if (!playlist.length) {
				player.src = media.url;

				this.active = 0;
			}

			playlist.push(media);
		},
		play(index) {
			const { player, playlist } = this;

			player.src = playlist[index].url;

			player.oncanplaythrough = () => player.play();

			player.onended = () => this.end();
		},
		pause() {
			this.player.pause();
		},
		end() {
			const { active, playlist } = this;

			if (active + 1 === playlist.length) {
				return;
			}

			++this.active;
		},
		clickTrack(index) {
			this.active = index;
		},
	},
});

export default mediaPlayer;
