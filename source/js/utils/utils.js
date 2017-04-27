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
}

export default Utils;
