import Moon from 'moonjs';
import Spotify from '../api/spotify';
import template from '../templates/album-details';

const albumDetails = Moon.component('component-album-details', {
	props: ['details'],
	template,
	methods: {
		clickTrack(track) {
			const details = this.get('details');
			const artists = details.artists.join();
			const query = `${artists} ${track}`;

			Spotify.searchTrack(query)
				.then((response) => {
					const tracks = response.tracks.items;
					const previewUrl = tracks.length && tracks[0].preview_url;

					if (!previewUrl) {
						alert('Yo no track found!1! :(');

						return;
					}

					window.discofy.emit('mediaplayer:play', [previewUrl]); // refactor :')
				});
		},
	},
});

export default albumDetails;
