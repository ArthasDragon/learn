let arr = [2, 5, 65, 88, 99];
let iterator = function() {
	let i = 0;
	let self = this;
	return {
		next: function() {
			return { value: i++, done: i > self.length };
		}
	};
};
Array.prototype[Symbol.iterator] = iterator;
console.log([...arr]);
