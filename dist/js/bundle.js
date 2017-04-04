(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Discogs {
	constructor(key) {
		this.baseUrl = 'https://api.discogs.com/';
		this.token = 'tCCPbvQBMjhlVMqrIkjKWkpLduNeOXXQgwhWjWQs';
	}

	getUserData(id) {
		const url = `${this.baseUrl}users/${id}?token=${this.token}`;

		return fetch(url).then(response => response.json());
	}

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


const discofy = new Moon({
	el: '#js-discofy',
	data: {
		id: null,
		user: {},
		albumDetails: {},
		collection: [],
	},
	methods: {
		getData(e) {
			this.set('id', e.target.value);

			this.callMethod('setUserData');
			this.callMethod('setCollectionData');
		},

		setUserData() {
			discogs.getUserData(this.get('id'))
			.then((response) => {
				this.set('user', {
					name: response.name,
					avatar: response.avatar_url,
					ownedAmount: response.num_collection,
				});
			});
		},

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
	},
});

},{}]},{},[1]);
