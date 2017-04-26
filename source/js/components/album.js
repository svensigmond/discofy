import Moon from 'moonjs';
import eventbus from '../utils/eventbus';
import discogs from '../api/discogs';
import template from '../templates/album';

const album2 = Moon.component('component-album', {
	props: ['album'],
	template,
	methods: {
		setAlbumData() {
			const album = this.get('album');

			discogs.getAlbumData(album.id)
				.then((response) => {
					album.meta = {
						genres: response.genres.join(', '),
						styles: response.styles ? response.styles.join(', ') : null,
						art: response.images[0].uri,
						// trackList: response.tracklist.map((track) => {
						// 	// let formattedTrack = '';

						// 	// if (track.position) {
						// 	// 	formattedTrack = `${track.position} - ${track.title}`;
						// 	// } else {
						// 	// 	formattedTrack = `${track.title}`;
						// 	// }

						// 	return track.title;
						// }),
						trackList: response.tracklist.map(track => track.title),
						discogsUrl: response.uri,
						formats: response.formats.map((format) => {
							const descriptions = format.descriptions ? format.descriptions.join(', ') : null;

							return `${format.qty}x ${descriptions}`;
						}),
					};

					this.set('album', album);
				})
				.then(() => {
					eventbus.emit('update:details', this.$data);
				});
		},
	},
});

export default album2;
