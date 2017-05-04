const template = `<div v-on:click="setAlbumData" class="album"
						v-bind:class="[album.vinylColor ?  'album--' + album.vinylColor : '', album.isPictureDisc ?  'album--picture-disc' : '']"
						:style="album.isPictureDisc ? album.cssStyles : ''">
					<div class="album__cover">
						<img :src="album.thumb" :alt="album.title" class="album__visual">
					</div>
					<h2 class="album__title">
						<span class="album-release">{{album.yearShort}}</span>
						<span class="album-artist">
							<span v-for="artist in album.artists">
								{{artist}}
							</span>
						</span><br>
						<span class="album-title">{{album.title}}</span>
					</h2>
				</div>`;

export default template;
