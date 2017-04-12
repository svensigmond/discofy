class Spotify {
	constructor() {
		this.baseUrl = 'https://api.spotify.com/v1/';
	}

	searchTrack(query) {
		const url = `${this.baseUrl}search?type=track&q=${query}`;

		return fetch(url).then(response => response.json());
	}
}

export default new Spotify();
