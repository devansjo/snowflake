(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _snowflakeRenderer = require('snowflake-renderer');

var _snowflakeRenderer2 = _interopRequireDefault(_snowflakeRenderer);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('buffer').Buffer;

document.addEventListener('DOMContentLoaded', function () {
  // do your setup here
  var query = _queryString2.default.parse(window.location.search);
  // console.log(query.p);
  // const params = JSON.parse(query.p.toString('utf8'));
  var params = {};
  (0, _snowflakeRenderer2.default)((0, _jquery2.default)('#snowflake_holder'), params);
  console.log('Initialized app');
});
});

require.register("snowflake-renderer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = buildSnowflake;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jquery2.default.fn.rotate = function (degrees) {
    (0, _jquery2.default)(this).css({ '-webkit-transform': 'rotate(' + degrees + 'deg)',
        '-moz-transform': 'rotate(' + degrees + 'deg)',
        '-ms-transform': 'rotate(' + degrees + 'deg)',
        'transform': 'rotate(' + degrees + 'deg)' });
    return (0, _jquery2.default)(this);
};

var defaultOptions = {
    name: 'Your Name',
    arms: 6,
    max_font: 200,
    min_font: 6,
    arm_length: 256
};

function buildSnowflake($target, options) {

    _lodash2.default.defaults(options, defaultOptions);

    (0, _jquery2.default)('.arm').remove();

    var name_text = options.name.length > 0 ? options.name : defaultOptions.name;
    var chars = [];

    for (var t = 0; t < name_text.length; t++) {
        var char = name_text.substr(t, 1);

        // step between the max and min font sizes
        var font_size = options.max_font - (options.max_font - options.min_font) / name_text.length * t;

        // space the fonts over the 'branch'
        var font_width = options.arm_length / name_text.length;

        // distance on 'branch'
        var font_left = options.arm_length / name_text.length * t;

        chars.push({ char: char, font_size: font_size });
    }

    var arm = chars.map(function (char) {
        return '<div class="char" style="font-size: ' + char.font_size + 'px">' + char.char + '</div>';
    }).join('');

    var primary_arm = '\n    <div class="arm rotate_pin" id="arm_0">\n        <div class="text_holder top">"' + arm + '</div>\n        <div class="text_holder bottom">"' + arm + '</div>\n    </div>\n    ';

    $target.append(primary_arm);
    (0, _jquery2.default)('#snowflake').append(primary_arm);

    // already made arm 0, just clone it into the remaining arms
    for (var i = 1; i < options.arms; i++) {
        var new_arm = (0, _jquery2.default)('#arm_0').clone();
        new_arm.attr('id', ' arm_' + i).rotate(360 / options.arms * i);
        $target.append(new_arm);
        (0, _jquery2.default)('#snowflake').append(new_arm);
    }

    (0, _jquery2.default)('.poster_framed_1_snowflake').html($target.clone().attr("class", "snowflake_static_1").attr("id", "").css({ 'color': '#' + options.text_colour }));
    (0, _jquery2.default)('.poster_framed_1_text').html("the snowflake of " + options.name);
    (0, _jquery2.default)('.mockup, .card_front').css({ 'background-color': '#' + options.background_colour });
    (0, _jquery2.default)('.snowflake_static_1 div').css({ 'color': '#' + options.text_colour });
    (0, _jquery2.default)('.poster_framed_1_text').css({ 'color': '#' + options.text_colour });

    // Copy styles and content into the static snowflake builder page
    (0, _jquery2.default)('#snowflake_background').css({ 'background-color': '#' + options.background_colour });
    (0, _jquery2.default)('#snowflake_background #snowflake_maker #snowflake_holder div').css({ 'color': '#' + options.text_colour });
    (0, _jquery2.default)('#name_text').html("the snowflake of " + options.name).css({ 'color': '#' + options.text_colour });
}
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map