class Discogs {
	constructor() {
		this.token = 'tCCPbvQBMjhlVMqrIkjKWkpLduNeOXXQgwhWjWQs';
		this.baseUrl = 'https://api.discogs.com/';
	}

	getUserData(id) {
		const url = `${this.baseUrl}users/${id}?token=${this.token}`;

		return fetch(url).then(response => response.json());
	}

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

const ALBUM_TEMPLATE = `<div class="album" m-on:click="setAlbumData()">
							<div class="album__visual">
								<img src="{{album.thumb}}" alt="Album">
							</div>
							<div class="album__body">
								<h1>{{album.title}} <span m-if="{{album.year}}">({{album.year}})</span></h1>
								<ul m-for="artist in {{album.artists}}">
									<li>{{artist}}</li>
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
                			<img src="{{user.avatar}}" alt="{{user.name}}" class="avatar__visual">
                			<figcaption class="avatar_caption">{{user.name}}, {{user.location}} ({{user.username}})</figcaption>
            			</figure>`;

const discofy = new Moon({
	el: '#js-discofy',
	data: {
		id: 'edw1n',
		user: {
			show: false,
		},
		collection: [],
		pagination: {},
		details: {},
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
			});
		},

		setCollectionData(url) {
			discogs.getCollectionData(this.get('id'), url)
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

					this.set('collection', albums);
					this.set('pagination', response.pagination.urls);
				});
		},

		paginate(action) {
			const pagination = this.get('pagination');

			this.callMethod('setCollectionData', [pagination[action]]);
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
	},
});

window.discofy = discofy;
