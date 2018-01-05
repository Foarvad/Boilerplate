function isNeededPage (className) {
	if (typeof className !== 'string' || className === undefined) throw new Error('The classname is invalid or doesn\'t exist!');

	if ($('html').hasClass(className)) {
		return true;
	}
	else {
		return false;
	}
}