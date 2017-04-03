(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Discogs {
	constructor(key) {
		this.baseUrl = 'https://api.discogs.com/';//users/edw1n
	}

	getUserData(id) {
		const url = `${this.baseUrl}/users/${id}`;

		return fetch(url).then(response => response.json());
	}

	getCollectionData(id) {
		const url = `${this.baseUrl}/users/${id}/collection/folders/0/releases`;

		return fetch(url).then(response => response.json());
	}
}

const discogs = new Discogs();


const discofy = new Moon({
	el: '#js-discofy',
	data: {
		id: null,
		user: {},
		collection: [],
	},
	hooks: {
		init() {
			console.log('init');
		},
		mounted() {
			console.log('mounted');
		},
		updated() {
			console.log('updated');
		}
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
				});
			});
		},

		setCollectionData() {
			discogs.getCollectionData(this.get('id'))
			.then((response) => {
				const releases = response.releases;
				const albums = releases.map((release) => {
					const info = release.basic_information;
					const album = {
						artists: info.artists.map((artist) => artist.name).join(', '),
						title: info.title,
						year: info.year > 0 ? info.year : 'Not specified',
					};

					return album;
				});

				this.set('collection', albums);
			});
		}
	}
});

},{}]},{},[1]);
