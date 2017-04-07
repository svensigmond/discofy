module.exports = `<div class="album" m-on:click="setAlbumData()">
    <div class="album__visual">
        <img src="{{album.thumb}}" alt="Album">
    </div>
    <div class="album__body">
        <h1>{{album.title}} <span m-if="{{album.year}}">({{album.year}})</span></h1>
        <ul m-for="artist in {{album.artists}}">
            <li>{{artist}}</li>
        </ul>
    </div>
</div>`;
