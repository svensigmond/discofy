import Vue from 'vue/dist/vue.js';
import eventbus from '../utils/eventbus';
import discogs from '../api/discogs';
import template from '../templates/album';

const album2 = Vue.component('component-album', {
	props: ['album'],
	template,
	methods: {
		setAlbumData() {
			const { album } = this;

			discogs.getAlbumData(album.id)
				.then((response) => {
					album.meta = {
						genres: response.genres.join(', '),
						styles: response.styles ? response.styles.join(', ') : null,
						art: response.images[0].uri,
						tracklist: response.tracklist,
						discogsUrl: response.uri,
						formats: response.formats.map((format) => {
							const descriptions = format.descriptions ? format.descriptions.join(', ') : null;

							return `${format.qty}x ${descriptions}`;
						}),
					};
				})
				.then(() => {
					console.log(this);
					eventbus.$emit('update:details', this.album);
				});
		},
	},
});

export default album2;
