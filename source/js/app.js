const ALBUM_TEMPLATE = require('./templates/album');
const USER_TEMPLATE = require('./templates/user');
const ALBUM_DETAILS_TEMPLATE = require('./templates/details');
const MEDIAPLAYER_TEMPLATE = require('./templates/mediaplayer');

class Spotify {
	constructor() {
		this.baseUrl = 'https://api.spotify.com/v1/';
	}

	searchTrack(query) {
		const url = `${this.baseUrl}search?type=track&q=${query}`;

		return fetch(url).then(response => response.json());
	}
}

class Discogs {
	constructor() {
		this.token = 'tCCPbvQBMjhlVMqrIkjKWkpLduNeOXXQgwhWjWQs';
		this.baseUrl = 'https://api.discogs.com/';
	}

	getUserData(id) {
		const url = `${this.baseUrl}users/${id}?token=${this.token}`;

		return fetch(url).then(response => response.json());
	}

	getCollectionData(id, url, sorting) {
		url = url || `${this.baseUrl}/users/${id}/collection/folders/0/releases?page=1&sort=${sorting.sort}&sort_order=${sorting.order}&token=${this.token}`;

		return fetch(url).then(response => response.json());
	}

	getAlbumData(id) {
		const url = `${this.baseUrl}releases/${id}?token=${this.token}`;

		return fetch(url).then(response => response.json());
	}
}

const discogs = new Discogs();
const spotify = new Spotify();

const { Moon } = window;

const discofy = new Moon({
	el: '#js-discofy',
	data: {
		id: 'edw1n',
		user: {
			show: false,
		},
		collection: [],
		pagination: {},
		sorting: {
			active: 0,
			options: [
				{
					sort: 'added',
					order: 'desc',
				},
				{
					sort: 'artist',
					order: 'asc',
				},
				{
					sort: 'title',
					order: 'asc',
				},
				{
					sort: 'year',
					order: 'asc',
				},
			],
		},
		details: {
			show: false,
		},
		mediaUrl: null,
	},

	hooks: {
		init() {
			const localData = JSON.parse(localStorage.getItem('discofy'));

			if (localData) {
				this.$data = localData;

				// TODO: Figure out why we need to set collection to trigger the changes
				this.set('collection', localData.collection);
			}
		},
		mounted() {
			this.on('mediaplayer:play', (url) => {
				this.set('mediaUrl', url);
			});

			this.on('update:details', (data) => {
				this.set('details', data.album);
				this.set('details.show', true);

				this.callMethod('updateLocalStorage');
			});
		},
	},

	methods: {
		getData(e) {
			this.callMethod('setUserData');
			this.callMethod('setCollectionData');
		},

		setUserData() {
			discogs.getUserData(this.get('id'))
				.then((response) => {
					this.set('user', {
						show: true,
						name: response.name,
						username: response.username,
						avatar: response.avatar_url,
						ownedAmount: response.num_collection,
						location: response.location,
					});

				this.callMethod('updateLocalStorage');
				});
		},

		setCollectionData(url) {
			const sorting = this.get('sorting');
			const activeSorting = sorting.options[sorting.active];

			discogs.getCollectionData(this.get('id'), url, activeSorting)
				.then((response) => {
					const { releases } = response;
					const albums = releases.map((release) => {
						const info = release.basic_information;
						const album = {
							id: info.id,
							artists: info.artists.map((artist) => artist.name),
							title: info.title,
							year: info.year > 0 ? info.year : 'Unknown',
							thumb: info.thumb,
						};

						return album;
					});

					const pagination = {
						urls: response.pagination.urls,
						items: response.pagination.items,
						range: {
							low: (albums.length * response.pagination.page) - albums.length + 1,
							high: albums.length * response.pagination.page,
						},
					};

					this.set('collection', albums);
					this.set('pagination', pagination);

					this.callMethod('updateLocalStorage');
				});
		},

		paginate(action) {
			const pagination = this.get('pagination');

			this.callMethod('setCollectionData', [pagination.urls[action]]);
		},

		sort(option, index) {
			const sorting = this.get('sorting');

			if (sorting.options[sorting.active].sort === option.sort) {
				if (option.order === 'desc') {
					option.order = 'asc';
				} else {
					option.order = 'desc';
				}
			}

			sorting.active = index;
			sorting.options[index] = option;

			this.set('sorting', sorting);

			this.callMethod('setCollectionData');
		},

		updateLocalStorage() {
			localStorage.setItem('discofy', JSON.stringify(this.$data));
		},
	},
});

Moon.component('component-user', {
	props: ['user'],
	template: USER_TEMPLATE,
});

Moon.component('component-album', {
	props: ['album'],
	template: ALBUM_TEMPLATE,
	methods: {
		setAlbumData() {
			const album = this.get('album');

			discogs.getAlbumData(album.id)
				.then((response) => {
					album.meta = {
						genres: response.genres.join(', '),
						styles: response.styles ? response.styles.join(', ') : null,
						art: response.images[0].uri,
					trackList: response.tracklist.map((track) => {
						let formattedTrack = '';

						if (track.position) {
							formattedTrack = `${track.position} - ${track.title}`;
						} else {
							formattedTrack = `${track.title}`;
						}

						return formattedTrack;
					}),
						discogsUrl: response.uri,
						formats: response.formats.map((format) => {
						const descriptions = format.descriptions ? format.descriptions.join(', ') : 'Unknown';

							return `${format.qty}x ${descriptions}`;
						}),
					};

					this.set('album', album);
				})
				.then(() => {
					discofy.emit('update:details', this.$data);
				});
		},
	},
});

// const audio = new Audio();

Moon.component('component-mediaplayer', {
	props: ['src'],
	template: MEDIAPLAYER_TEMPLATE,
	hooks: {
		mounted() {
			this.player = this.$el.querySelector('audio');

			this.on('mediaplayer:play', (data) => {
				this.callMethod('playAudio');
			});
		},
	},
	methods: {
		playAudio() {
			// this.player.setAttribute('src', url);

			this.player.play();
		},
	},
});

Moon.component('component-album-details', {
	props: ['details'],
	template: ALBUM_DETAILS_TEMPLATE,
	methods: {
		clickTrack(track) {
			const details = this.get('details');
			const artists = details.artists.join();
			const query = `${artists} ${track}`;

			spotify.searchTrack(query)
				.then((response) => {
					const tracks = response.tracks.items;
					const url = tracks.length && tracks[0].preview_url;

					if (!url) {
						alert('Yo no track found!1! :(');

						return;
					}

					discofy.emit('mediaplayer:play', [url]);
				});
		},
	},
});

window.discofy = discofy;
