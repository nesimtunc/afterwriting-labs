define('utils/decorator', function (require) {

	var d3 = require('d3');

	var decorator = function (func) {
		var _handlers = [],
			result;

		var runner = function () {
			var self = this;
			var args;

			args = Array.prototype.slice.call(arguments, 0);
			result = func.apply(self, args);

			if (runner.lock) {
				runner.lock = false;
			} else {
				_handlers.forEach(function (handler) {
					if (result instanceof Function && result.decorated) {
						result.add(handler);
					} else {
						handler.apply(self, [result, args]);
					}
				});
			}
			
			return result;
		};

		runner.add = function (handler) {
			_handlers.push(handler);
		};
		
		runner.remove = function(handler) {
			var index = _handlers.indexOf(handler);
			if (index) {
				_handlers.splice(index, 1);
			}
		};
		
		runner.decorated = true;

		return runner;
	};

	decorator.signal = function () {
		return decorator(function (value) {
			return value;
		});
	};
	
	decorator.property = function (setter) {
		var _value;
		var property = decorator(function(value) {
			if (arguments.length === 0) {
				property.lock = true;
				return _value;
			}
			else {
				_value = setter ? setter(value) : value;
				return _value;
			}
		});
		return property;
	};

	decorator.decorate = function (obj) {
		d3.keys(obj).forEach(function (property) {
			if (typeof (obj[property]) === "function" && ! (obj[property].decorated)) {
				obj[property] = decorator(obj[property]);
			}
		});
		return obj;
	};


	return decorator;

});