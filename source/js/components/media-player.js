import Moon from 'moonjs';
import template from '../templates/media-player';

const mediaPlayer = Moon.component('component-media-player', {
	props: ['src'],
	template,
	hooks: {
		mounted() {
			this.player = this.$el.querySelector('audio');

			const src = this.get('src');

			if (src) {
				this.callMethod('playAudio');
			}
		},
	},
	methods: {
		playAudio() {
			this.player.play();
		},
	},
});

export default mediaPlayer;
