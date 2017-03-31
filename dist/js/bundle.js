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


Moon.component("component-album", {
	props: ['title', 'artist'],
	template: '<li>{{title}} {{artist}}</li>',
	hooks: {
		mounted() {
			//console.log(typeof this.get('albums'));
		}
	}
});


const discofy = new Moon({
	el: '#js-discofy',
	data: {
		id: '',
		name: '',
		avatar: '',
		collection: []
	},
	methods: {
		getData(e) {
			this.set('id', e.target.value);

			this.callMethod('setUserData');
			this.callMethod('setCollectionData');
		},

		setUserData: function() {
			discogs.getUserData(this.get('id'))
			.then((response) => {
				discofy.set('name', response.name);
				discofy.set('avatar', response.avatar_url);
			});
		},

		setCollectionData: function() {
			discogs.getCollectionData(this.get('id'))
			.then((response) => {
				const test = [
					{
						title: 'sticky fingers',
						artist: 'stones'
					},
					{
						title: 'hunky dory',
						artist: 'bowie'
					}
				];

				//this.set('collection', response.releases)
				this.set('collection', test);
			});
		}
	}
});

},{}]},{},[1]);
