import Moon from 'moonjs';
import eventbus from '../utils/eventbus';
import template from '../templates/media-player';

const mediaPlayer = Moon.component('component-media-player', {
	props: ['src'],
	template,
	hooks: {
		mounted() {
			this.player = this.$el.querySelector('audio');

			// Workaround beause updated hook doesn't work with components
			eventbus.on('mediaplayer:play', () => {
				this.callMethod('playAudio');
			});
		},
	},
	methods: {
		playAudio() {
			this.player.play();
		},
	},
});

export default mediaPlayer;
