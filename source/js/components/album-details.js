import Vue from 'vue/dist/vue.js';
import eventbus from '../utils/eventbus';
import Spotify from '../api/spotify';
import template from '../templates/album-details';

const albumDetails = Vue.component('component-album-details', {
	props: ['details'],
	template,
	methods: {
		clickTrack(track) {
			const { details } = this;
			const artists = details.artists.join();
			const query = `${artists} ${track}`;

			Spotify.searchTrack(query)
				.then((response) => {
					const tracks = response.tracks.items;
					const previewUrl = tracks.length && tracks[0].preview_url;

					if (!previewUrl) {
						return;
					}

					eventbus.$emit('mediaplayer:change', previewUrl);
				});
		},

		onClose() {
			eventbus.$emit('detail:close');
		},
	},
});

export default albumDetails;
