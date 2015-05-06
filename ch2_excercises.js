console.log(print_hashes());

function print_hashes(i) {
	var result = "";
	for (var i = 1; i < 8; i++) {
		for (var j = 0; j < i; j++) {
			result += "#";
		}
		result += "\n";
	}
	return result;
}

function chess_board() {
	var result = "";
	for (var i = 1; i < 73; i++) {
		if (i % 9 === 0) {
			result += "\n";
		} else if (i%2 === 0) {
			result += " ";
		} else {
			result += "#";
		}
	}
	return result;
}