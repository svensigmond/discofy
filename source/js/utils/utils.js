class Utils {
	// Strip number between parentheses at the end of of string
	// 'Temples (4)' will return 'Temples'
	static stripNumber(value) {
		return value.replace(/ \([\d]+\)$/, '');
	}
}

export default Utils;
