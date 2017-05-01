const template = `<div class="albums__account">
					<span><b>{{user.name}}</b></span>
					<span>{{user.location}}</span>
					<span>Joined on {{user.registered}}</span>
					<h1>{{user.username}}</h1>
					<span>{{user.num_collection}} in collection</span>
					<span>{{user.num_wantlist}} in wantlist</span>
				</div>`;

export default template;
