function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animal = function Animal() {
  _classCallCheck(this, Animal);

  this.show = function () {
    console.log('animal');
  };
};

var Duck = function (_Animal) {
  _inherits(Duck, _Animal);

  function Duck() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Duck);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Duck.__proto__ || Object.getPrototypeOf(Duck)).call.apply(_ref, [this].concat(args))), _this), _this.show = function () {
      console.log('duck');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Duck;
}(Animal);

var Dog = function (_Animal2) {
  _inherits(Dog, _Animal2);

  function Dog() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, Dog);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = Dog.__proto__ || Object.getPrototypeOf(Dog)).call.apply(_ref2, [this].concat(args))), _this2), _this2.show = function () {
      console.log('dog');
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  return Dog;
}(Animal);

var Pig = function (_Animal3) {
  _inherits(Pig, _Animal3);

  function Pig() {
    _classCallCheck(this, Pig);

    return _possibleConstructorReturn(this, (Pig.__proto__ || Object.getPrototypeOf(Pig)).apply(this, arguments));
  }

  return Pig;
}(Animal);

new Duck().show();
new Dog().show();
new Pig().show();