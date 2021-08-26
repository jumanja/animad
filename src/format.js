const format = (number, type) => {
	const minutes = Math.floor(number / 60);
	const secs = Math.floor(number % 60);
	if (type === 1){
		return `${number.toFixed()}`;
	} else {
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}
}

export default format;