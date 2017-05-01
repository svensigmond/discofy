import Moon from 'moonjs';
import Utils from './utils/utils';
import eventbus from './utils/eventbus';
import discogs from './api/discogs';

import './components/album-details';
import './components/album';
import './components/media-player';
import './components/user';

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
		mediaUrl: '',
	},

	hooks: {
		init() {
			const localData = JSON.parse(localStorage.getItem('discofy'));

			if (localData) {
				// this.$data = localData;

				// TODO: Figure out why we need to set collection to trigger the changes
				// this.set('collection', localData.collection);
			}
		},
		mounted() {
			eventbus.on('mediaplayer:change', (url) => {
				this.set('mediaUrl', url);
			});

			eventbus.on('update:details', (data) => {
				this.set('details', data.album);
				this.set('details.show', true);
			});
		},

		updated() {
			const mediaUrl = this.get('mediaUrl');

			if (mediaUrl) {
				eventbus.emit('mediaplayer:play');
			}
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
					/* eslint-disable camelcase */
					const {
						name,
						username,
						avatar_url,
						num_collection,
						num_wantlist,
						location,
						registered,
					} = response;

					this.set('user', {
						show: true,
						name,
						username,
						avatar_url,
						num_collection,
						num_wantlist,
						location,
						registered: Utils.formatDate(registered),
					});
					/* eslint-enable camelcase */

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
						const year = info.year ? info.year : null;

						const album = {
							id: info.id,
							artists: info.artists.map(artist => Utils.stripNumber(artist.name)),
							title: info.title,
							year,
							yearShort: Utils.getYearShort(year),
							thumb: info.thumb,
							isPictureDisc: Utils.isPictureDisc(info),
							vinylColor: Utils.getVinylColor(info),
							cssStyles: Utils.getCssStyles(info),
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
			// return false;

			localStorage.setItem('discofy', JSON.stringify(this.$data));
		},
	},
});

window.discofy = discofy;
