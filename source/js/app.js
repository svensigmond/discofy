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
