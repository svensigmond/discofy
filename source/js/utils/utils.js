class Utils {
	// Strip number between parentheses at the end of of string
	// 'Temples (4)' will return 'Temples'
	static stripNumber(value) {
		return value.replace(/ \([\d]+\)$/, '');
	}

	static isPictureDisc(album) {
		const [{ descriptions }] = album.formats;

		return descriptions && descriptions.indexOf('Picture Disc') > -1;
	}

	static formatDate(date) {
		const locale = 'en-US';
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};

		return new Intl.DateTimeFormat(locale, options).format(new Date(date));
	}

	static getYearShort(year) {
		if (!year) {
			return '';
		}

		const toString = year.toString();

		return toString.toString().substring(toString.length - 2);
	}

	static getVinylColor(album) {
		const [{ text }] = album.formats;
		let vinylColor;

		if (!text) {
			return false;
		}

		const colors = [
			'blue',
			'clear',
			'gold',
			'green',
			'orange',
			'pink',
			'red',
			'white',
			'yellow',
		];

		colors.forEach((color) => {
			if (text.toLowerCase().indexOf(color) > -1) {
				vinylColor = color;
			}
		});

		return vinylColor;
	}

	static getCssStyles(album) {
		return `background-image: url("${album.thumb}")`;
	}
}

export default Utils;
