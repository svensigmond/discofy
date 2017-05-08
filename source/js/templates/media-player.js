const template = `<div class="media-player">
	<div class="media-player__current">
		<h2 :data-current="playlist[active].track" v-if="playlist.length">{{playlist[active].track}}</h2>
	</div>
	<div class="media-player__playlist">
		<ol v-if="playlist.length">
			<li v-for="(media, index) in playlist" v-bind:class="{'is-active': index === active }" v-on:click="clickTrack(index)">{{media.track}}</li>
		</ol>
	</div>
	<button v-on:click="start">▶️</button><button v-on:click="pause">⏸️</button>
</div>`;

export default template;
