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
	props: ['album'],
	template: '<li>{{title}}</li>',
	hooks: {
		init() {
			console.log('init');
		},
		mounted() {
			const album = JSON.parse(this.get('album'));

			this.set('title', album.title);

			console.log('mounted');
		},
		updated() {
			console.log('updated');
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
				const collection = [];

				response.releases.forEach((release) => {
					collection.push(
						JSON.stringify(release.basic_information)
					);
				});

				this.set('collection', collection);
			});
		}
	}
});
