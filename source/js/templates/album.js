const template = `<a href="detail.html"><img src="{{album.thumb}}" class="album__cover__img" alt="{{album.title}}"></a>
					<h2 class="albums__item__title">
						<span class="album-release">{{album.year}}</span>
						<span class="album-artist">
							<ul m-for="artist in {{album.artists}}">
								<li>{{artist}}</li>
							</ul>
						</span><br>
						<span class="album-title">{{album.title}}</span>
					</h2>`;

export default template;
