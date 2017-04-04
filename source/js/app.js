class Discogs {
<<<<<<< HEAD
	constructor() {
		this.token = 'tCCPbvQBMjhlVMqrIkjKWkpLduNeOXXQgwhWjWQs';
		this.baseUrl = 'https://api.discogs.com/';
=======
	constructor(key) {
		this.baseUrl = 'https://api.discogs.com/';
		this.token = 'tCCPbvQBMjhlVMqrIkjKWkpLduNeOXXQgwhWjWQs';
>>>>>>> 30aa2a9e0ee77cd5197bb799803b7eae1f574717
	}

	getUserData(id) {
		const url = `${this.baseUrl}users/${id}?token=${this.token}`;

		return fetch(url).then(response => response.json());
	}

<<<<<<< HEAD
	getCollectionData(id, url) {
		url = url || `${this.baseUrl}/users/${id}/collection/folders/0/releases?page=1&token=${this.token}`;

		return fetch(url).then(response => response.json());
	}

	getAlbumData(id) {
		const url = `${this.baseUrl}releases/${id}?token=${this.token}`;

		return fetch(url).then(response => response.json());
	}
}


const discogs = new Discogs();
const { Moon } = window;
// const eventbus = new Moon({});

const ALBUM_TEMPLATE = `<div class="album" m-on:click="setAlbumData()">
							<div class="album__visual">
								<img src="{{album.basic_information.thumb}}" alt="Album">
							</div>
							<div class="album__body">
								<h1>{{album.basic_information.title}} <span m-if="{{album.basic_information.year}}">({{album.basic_information.year}})</span></h1>
								<ul m-for="artist in {{album.basic_information.artists}}">
									<li>{{artist.name}}</li>
								</ul>
								<div m-if="{{albumDetails}}">
								<img src="{{albumDetails.art}}">

								<table>
									<tbody>
										<tr>
											<th>Artist:</th>
											<td>{{albumDetails.artists}}</td>
										</tr>
										<tr>
											<th>Released:</th>
											<td>{{albumDetails.year}}</td>
										</tr>
										<tr>
											<th>Genre:</th>
											<td>{{albumDetails.genres}}</td>
										</tr>
										<tr>
											<th>Style:</th>
											<td>{{albumDetails.styles}}</td>
										</tr>
										<tr>
											<th>Track list:</th>
											<td>
												<ul class="list-unstyled" m-if="{{albumDetails.trackList}}">
													<li m-for="track in {{albumDetails.trackList}}">{{track}}</li>
												</ul>
											</td>
										</tr>
									</tbody>
								</table>
								</div>
							</div>
						</div>`;
const USER_TEMPLATE = `<figure class="avatar">
                			<img src="{{user.avatar_url}}" alt="{{user.name}}" class="avatar__visual">
                			<figcaption class="avatar_caption">{{user.name}}, {{user.location}} ({{user.username}})</figcaption>
            			</figure>`;
=======
	getCollectionData(id, page) {
		const url = `${this.baseUrl}users/${id}/collection/folders/0/releases?token=${this.token}&page=${page}`;

		return fetch(url).then(response => response.json());
	}

	getAlbumData(id) {
		const url = `${this.baseUrl}releases/${id}?token=${this.token}`;

		return fetch(url).then(response => response.json());
	}
}

const discogs = new Discogs();
>>>>>>> 30aa2a9e0ee77cd5197bb799803b7eae1f574717


const discofy = new Moon({
	el: '#js-discofy',
	data: {
<<<<<<< HEAD
		id: 'edw1n',
		user: {},
		collection: [],
		pagination: {},
		details: {},
=======
		id: null,
		user: {},
		albumDetails: {},
		collection: [],
>>>>>>> 30aa2a9e0ee77cd5197bb799803b7eae1f574717
	},

	hooks: {
		mounted() {
			this.on('update:details', (data) => {
				this.set('details', data.album);
			});
		},
	},

	methods: {
		getData(e) {
			this.callMethod('setUserData');
			this.callMethod('setCollectionData');
		},
<<<<<<< HEAD
		setUserData() {
			discogs.getUserData(this.get('id'))
				.then((response) => {
					this.set('user', response);
				});
=======

		setUserData() {
			discogs.getUserData(this.get('id'))
			.then((response) => {
				this.set('user', {
					name: response.name,
					avatar: response.avatar_url,
					ownedAmount: response.num_collection,
				});
			});
>>>>>>> 30aa2a9e0ee77cd5197bb799803b7eae1f574717
		},
		setCollectionData(url) {
			discogs.getCollectionData(this.get('id'), url)
				.then((response) => {
					this.set('pagination', response.pagination);
					this.set('collection', response.releases);
				});
		},
		onNextPage(e) {
			const pagination = this.get('pagination');

<<<<<<< HEAD
			this.callMethod('setCollectionData', [pagination.urls.next]);
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
					styles: response.styles.join(', '),
					art: response.images[0].uri,
					trackList: response.tracklist.map((track) => `${track.title}`),
				};

				this.set('album', album);
			})
			.then(() => {
				discofy.emit('update:details', this.$data);
			});
		},
=======
		setCollectionData(page = 1) {
			discogs.getCollectionData(this.get('id'), page)
			.then((response) => {
				const releases = response.releases;
				const albums = releases.map((release) => {
					const info = release.basic_information;
					const album = {
						id: info.id,
						artists: info.artists.map((artist) => artist.name).join(', '),
						title: info.title,
						year: info.year > 0 ? info.year : 'Unknown',
					};

					return album;
				});
				const pagination = {
					page: response.pagination.page,
					prev: response.pagination.urls.prev ? response.pagination.page - 1 : null,
					next: response.pagination.urls.next ? response.pagination.page + 1 : null,
				};

				this.set('collection', albums);
				this.set('pagination', pagination);
			});
		},

		paginate(action) {
			const pagination = this.get('pagination');
			let page = null;

			if (action === 'next') {
				page = pagination.next;
			} else {
				page = pagination.prev;
			}

			this.callMethod('setCollectionData', [page]);
		},

		setAlbumData(album, index) {
			discogs.getAlbumData(album.id)
			.then((response) => {

				this.set('albumDetails', {
					title: album.title,
					artists: album.artists,
					year: album.year,
					genres: response.genres.join(', '),
					styles: response.styles.join(', '),
					art: response.images[0].uri,
					trackList: response.tracklist.map((track) => `${track.title}`),
				});
			});
		},
>>>>>>> 30aa2a9e0ee77cd5197bb799803b7eae1f574717
	},
});

window.discofy = discofy;
