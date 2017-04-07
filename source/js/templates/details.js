module.exports = `<div class="album-details">
    <img src="{{details.meta.art}}">
    <table>
        <tbody>
            <tr>
                <th>Title:</th>
                <td>{{details.title}}</td>
            </tr>
            <tr>
                <th>Artists:</th>
                <td>
                    <ul class="list-unstyled">
                        <li m-for="artist in {{details.artists}}">
                            {{artist}}
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>Format:</th>
                <td>
                    <ul class="list-unstyled" m-for="format in {{details.meta.formats}}">
                        <li>{{format}}</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>Released:</th>
                <td>{{details.year}}</td>
            </tr>
            <tr>
                <th>Genre:</th>
                <td>{{details.meta.genres}}</td>
            </tr>
            <tr m-if="{{details.meta.styles}}">
                <th>Style:</th>
                <td>{{details.meta.styles}}</td>
            </tr>
            <tr>
                <th>Track list:</th>
                <td>
                    <ol m-if="{{details.meta.trackList}}">
                        <li m-for="track in {{details.meta.trackList}}">{{track}}</li>
                    </ol>
                </td>
            </tr>
            <tr>
                <th>External:</th>
                <td>
                    <a href="{{details.meta.discogsUrl}}">View on discogs</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>`;
