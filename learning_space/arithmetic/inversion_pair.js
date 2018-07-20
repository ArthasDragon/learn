//求逆序对

let ache = [];
function paixu(left, right) {
	let arr = [];
	while (left.length > 0 && right.length > 0) {
		if (left[0] < right[0]) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
			left.forEach(le => {
				ache.push([le, arr[arr.length - 1]]);
			});
		}
	}
	return arr.concat(left).concat(right);
}
const arr = [21, 564, 231, 545, 21548, 2314, 213, 3215, 461, 646];
function getReverse(arr) {
	let len = arr.length;
	if (len < 2) {
		return arr;
	}
	let mid_index = Math.floor(len / 2);
	let left_arr = arr.slice(0, mid_index);
	let right_arr = arr.slice(mid_index, len);
	return paixu(getReverse(left_arr), getReverse(right_arr));
}

console.log(getReverse(arr), ache);
