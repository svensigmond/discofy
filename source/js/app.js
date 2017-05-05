import Vue from 'vue/dist/vue.js';
import Utils from './utils/utils';
import eventbus from './utils/eventbus';
import discogs from './api/discogs';

import './components/album';
import './components/album-details';
import './components/user';
import './components/media-player';

const discollection = new Vue({
	el: '#js-vue',
	data() {
		return {
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
			details: {},
			showDetails: false,
			mediaUrl: '',
		};
	},

	init() {
		const localData = JSON.parse(localStorage.getItem('discofy'));

		if (localData) {
			// this.$data = localData;

			// TODO: Figure out why we need to set collection to trigger the changes
			// this.set('collection', localData.collection);
		}
	},
	mounted() {
		eventbus.$on('mediaplayer:change', (url) => {
			this.mediaUrl = url;
		});

		eventbus.$on('detail:close', () => {
			this.showDetails = false;
		});

		eventbus.$on('update:details', (data) => {
			this.details = data;
			this.showDetails = true;
		});
	},

	updated() {
		const { mediaUrl } = this;

		if (mediaUrl) {
			eventbus.$emit('mediaplayer:play');
		}
	},

	methods: {
		getData() {
			this.setUserData();
			this.setCollectionData();
		},

		setUserData() {
			discogs.getUserData(this.id)
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

					this.user = {
						show: true,
						name,
						username,
						avatar_url,
						num_collection,
						num_wantlist,
						location,
						registered: Utils.formatDate(registered),
					};
					/* eslint-enable camelcase */

					this.updateLocalStorage();
				});
		},

		setCollectionData(url) {
			const { sorting } = this;
			const activeSorting = sorting.options[sorting.active];

			discogs.getCollectionData(this.id, url, activeSorting)
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

					this.collection = albums;
					this.pagination = pagination;

					this.updateLocalStorage();
				});
		},

		paginate(action) {
			// const pagination = this.pagination;

			// this.callMethod('setCollectionData', [pagination.urls[action]]);
		},

		sort(option, index) {
			const { sorting } = this;

			if (sorting.options[sorting.active].sort === option.sort) {
				if (option.order === 'desc') {
					option.order = 'asc';
				} else {
					option.order = 'desc';
				}
			}

			sorting.active = index;
			sorting.options[index] = option;

			this.sorting = sorting;

			this.setCollectionData();
		},

		updateLocalStorage() {
			// return false;

			localStorage.setItem('discofy', JSON.stringify(this.$data));
		},
	},
});

window.discofy = discollection;
