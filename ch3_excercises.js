console.log(countChar2("DDDDBB", 'D'));

function min(x, y) {
	if (x < y)
		return x;
	else return y;
}

function isEven(num) {
	if (num < 0) num = num * (-1);
	if (num === 0)
		return true;
	else if (num === 1)
		return false;
	else
		return isEven(num - 2);
}

function countBs(string_) {
	return countChar(string_, 'B');
}
function countChar(string_, char_) {
	if (string_ === "")
		return 0;
	if (string_.charAt(0) === char_)
		return 1 + countChar(string_.slice(1), char_);
	else return countChar(string_.slice(1), char_);
}
function countChar2(string_, char_) {
	var result = 0;
	for (var i=0; i < string_.length; i++) {
		if (string_.charAt(i) == char_)
			result++;
	}
	return result;
}