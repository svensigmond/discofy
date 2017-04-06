(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
							</div>
						</div>`;

const USER_TEMPLATE = `<figure class="avatar">
                			<img src="{{user.avatar}}" alt="{{user.name}}" class="avatar__visual">
                			<figcaption class="avatar_caption">{{user.name}}, {{user.location}} ({{user.username}})</figcaption>
            			</figure>`;

const ALBUM_DETAILS_TEMPLATE = `<div class="album-details">
									<img src="{{details.meta.art}}">
									<table>
										<tbody>
 											<tr>
 												<th>Title:</th>
 												<td>{{details.title}}</td>
 											</tr>
											<tr>
												<th>Artists:</th>
												<td>
													<ul class="list-unstyled">
														<li m-for="artist in {{details.artists}}">
															{{artist}}
														</li>
													</ul>
												</td>
											</tr>
											<tr>
												<th>Format:</th>
												<td>
													<ul class="list-unstyled" m-for="format in {{details.meta.formats}}">
														<li>{{format}}</li>
													</ul>
												</td>
											</tr>
 											<tr>
 												<th>Released:</th>
 												<td>{{details.year}}</td>
 											</tr>
											<tr>
												<th>Genre:</th>
												<td>{{details.meta.genres}}</td>
											</tr>
											<tr m-if="{{details.meta.styles}}">
												<th>Style:</th>
												<td>{{details.meta.styles}}</td>
											</tr>
											<tr>
												<th>Track list:</th>
												<td>
													<ol m-if="{{details.meta.trackList}}">
														<li m-for="track in {{details.meta.trackList}}">{{track}}</li>
													</ol>
												</td>
											</tr>
											<tr>
												<th>External:</th>
												<td>
													<a href="{{details.meta.discogsUrl}}">View on discogs</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>`;

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
	},

	hooks: {
		mounted() {
			this.on('update:details', (data) => {
				this.set('details', data.album);
				this.set('details.show', true);
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
							low: (response.pagination.per_page * response.pagination.page) - response.pagination.per_page + 1,
							high: response.pagination.per_page * response.pagination.page,
						},
					};

					this.set('collection', albums);
					this.set('pagination', pagination);
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
					trackList: response.tracklist.map((track) => track.title),
					discogsUrl: response.uri,
					formats: response.formats.map((format) => {
						const descriptions = format.descriptions.join(', ');

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

Moon.component('component-album-details', {
	props: ['details'],
	template: ALBUM_DETAILS_TEMPLATE,
});

window.discofy = discofy;

},{}]},{},[1]);
