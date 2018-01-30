/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 359);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FETCH_URL = exports.FETCH_URL = "FETCH_URL";
var FETCH_COMMENTS = exports.FETCH_COMMENTS = "FETCH_COMMENTS";
var SET_TAB_URL = exports.SET_TAB_URL = "SET_TAB_URL";
var SUBREDDIT_SELECTED = exports.SUBREDDIT_SELECTED = "SUBREDDIT_SELECTED";
var COMMENT_COLLAPSED = exports.COMMENT_COLLAPSED = "COMMENT_COLLAPSED";
var FOUND_NODE = exports.FOUND_NODE = "FOUND_NODE";
var SET_BLACKLIST = exports.SET_BLACKLIST = "SET_BLACKLIST";
var CHANGE_BLACKLIST = exports.CHANGE_BLACKLIST = "CHANGE_BLACKLIST";

var APP_NAME = 'reddit-everywhere';

// TODO: Move these into a file/export from somewhere
var SUBREDDIT_WHITELIST = ['politics', 'news', 'worldnews'];

var fetchComments = exports.fetchComments = function fetchComments(permalink) {
  return function (dispatch, getState) {
    var request_url = "https://reddit.com" + permalink + ".json?app=" + APP_NAME + "&raw_json=1";
    fetch(request_url).then(function (response) {
      return response.json();
    }).then(function (body) {
      dispatch({
        type: FETCH_COMMENTS,
        payload: body
      });
    });
  };
};

var fetchURL = exports.fetchURL = function fetchURL(url) {
  return function (dispatch, getState) {
    fetch("https://reddit.com/api/info/.json?url=" + url + "&app=" + APP_NAME).then(function (response) {
      return response.json();
    }).then(function (body) {
      var posts = body.data.children;
      var whiteListedPosts = posts.filter(function (post) {
        return (
          // SUBREDDIT_WHITELIST.indexOf(post.data.subreddit) > -1
          true
        );
      } // NOTE: put the whitelist back in when it's a real thing
      );
      dispatch({ type: FETCH_URL, payload: whiteListedPosts, meta: url });
      if (whiteListedPosts.length > 0) {
        dispatch(fetchComments(whiteListedPosts[0].data.permalink));
      }
    }).catch(function (error) {
      return dispatch({ type: "REQUEST_FAILED", error: error });
    });
  };
};

var setTabURL = exports.setTabURL = function setTabURL(tabId, url) {
  return {
    type: SET_TAB_URL,
    payload: {
      tabId: tabId,
      url: url
    }
  };
};

var subredditChanged = exports.subredditChanged = function subredditChanged(postId) {
  return function (dispatch, getState) {
    dispatch({
      type: SUBREDDIT_SELECTED,
      payload: postId
    });

    var state = getState();

    if (!(postId in state.comments)) {
      var post = state.postIds[postId];
      dispatch(fetchComments(post.permalink));
    }
  };
};

var collapseComment = exports.collapseComment = function collapseComment(commentId) {
  return {
    type: COMMENT_COLLAPSED,
    payload: commentId
  };
};

var foundNode = exports.foundNode = function foundNode(node) {
  return {
    type: FOUND_NODE,
    payload: node
  };
};

var setBlacklist = exports.setBlacklist = function setBlacklist(object) {
  return {
    type: SET_BLACKLIST,
    payload: object
  };
};

var changeBlacklist = exports.changeBlacklist = function changeBlacklist(object) {
  return {
    type: CHANGE_BLACKLIST,
    payload: object
  };
};

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(109);

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = __webpack_require__(105);

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = __webpack_require__(246);

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = __webpack_require__(245);

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = __webpack_require__(244);

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = __webpack_require__(104);

var _compose2 = _interopRequireDefault(_compose);

var _warning = __webpack_require__(106);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2.default)('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2.default;
exports.combineReducers = _combineReducers2.default;
exports.bindActionCreators = _bindActionCreators2.default;
exports.applyMiddleware = _applyMiddleware2.default;
exports.compose = _compose2.default;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const STORE_NAME = "REDDIT_EVERYWHERE";
/* harmony export (immutable) */ __webpack_exports__["d"] = STORE_NAME;

const COMPLETE = "complete";
/* harmony export (immutable) */ __webpack_exports__["h"] = COMPLETE;
 // Based on chrome spec. Don't change!
const URL_UPDATED_EVENT = "EVENT__URL_UPDATED";
/* harmony export (immutable) */ __webpack_exports__["i"] = URL_UPDATED_EVENT;

const BAD_WORDS = [
    'fuck',
    'shit',
    'damn',
    'bitch',
    'ass',
    'crap',
    'piss',
    'dick',
    'cock',
    'pussy',
];
/* harmony export (immutable) */ __webpack_exports__["c"] = BAD_WORDS;

const NODE_ACTIONS = {
    AFTER: 'after',
    APPEND: 'append',
    BEFORE: 'before',
    INSERT: 'insert',
    REPLACE: 'replace',
};
/* harmony export (immutable) */ __webpack_exports__["e"] = NODE_ACTIONS;

// Specific rules for popular websites
const PAGE_LOCATIONS = {
    'youtube.com': {
        name: '#ticket-shelf',
        type: NODE_ACTIONS.INSERT,
    },
    'gfycat.com': {
        name: '#controls-container',
        type: NODE_ACTIONS.AFTER,
    },
    'twitter.com': {
        name: '.permalink-tweet-container',
        type: NODE_ACTIONS.AFTER,
    },
    'streamable.com': {
        name: '.stickypush',
        type: NODE_ACTIONS.AFTER,
    },
    'al.com': {
        name: '#article__footer',
        type: NODE_ACTIONS.REPLACE,
    },
    'npr.com': {
        name: '#newsletter-acquisition-callout-data',
        type: NODE_ACTIONS.REPLACE,
    },
    'independent.co.uk': {
        name: '#commentsDiv',
        type: NODE_ACTIONS.REPLACE,
    },
    'imgur.com': {
        name: '#comments',
        type: NODE_ACTIONS.REPLACE,
    },
    'washingtonpost.com': {
        name: '#comments',
        type: NODE_ACTIONS.REPLACE,
    },
    'wikipedia.org': {
        name: '#References',
        type: NODE_ACTIONS.BEFORE,
    }
};
/* harmony export (immutable) */ __webpack_exports__["f"] = PAGE_LOCATIONS;

// what to try if the domain isn't in our specific list
const DEFAULT_LOCATIONS = [
    {
        name: '#comments',
        type: NODE_ACTIONS.REPLACE,
    },
    {
        name: '#disqus_thread',
        type: NODE_ACTIONS.REPLACE,
    },
    {
        name: '#fb-comments',
        type: NODE_ACTIONS.REPLACE,
    },
    {
        name: '#article__footer',
        type: NODE_ACTIONS.REPLACE,
    },
    {
        name: 'footer',
        type: NODE_ACTIONS.BEFORE,
    },
];
/* harmony export (immutable) */ __webpack_exports__["g"] = DEFAULT_LOCATIONS;

const results_data = {
    "kind": "Listing",
    "data": {
        "after": null,
        "dist": 2,
        "modhash": "hroyxo3ykgc9dbc9e417ef61caba5cf5a855da8fe2e2d4b474",
        "whitelist_status": "all_ads",
        "children": [
            {
                "kind": "t3",
                "data": {
                    "domain": "washingtonpost.com",
                    "approved_at_utc": null,
                    "author_flair_text_color": null,
                    "mod_reason_by": null,
                    "banned_by": null,
                    "num_reports": null,
                    "author_flair_type": "text",
                    "subreddit_id": "t5_2qh4j",
                    "thumbnail_width": 140,
                    "subreddit": "europe",
                    "selftext_html": null,
                    "selftext": "",
                    "likes": null,
                    "suggested_sort": null,
                    "user_reports": [],
                    "secure_media": null,
                    "is_reddit_media_domain": false,
                    "saved": false,
                    "id": "7q3wr0",
                    "banned_at_utc": null,
                    "mod_reason_title": null,
                    "view_count": 23698,
                    "archived": false,
                    "clicked": false,
                    "media_embed": {},
                    "report_reasons": null,
                    "author": "jimrosenz",
                    "num_crossposts": 0,
                    "link_flair_text": null,
                    "mod_reports": [],
                    "can_mod_post": false,
                    "link_flair_richtext": [],
                    "is_crosspostable": true,
                    "pinned": false,
                    "score": 887,
                    "approved_by": null,
                    "over_18": false,
                    "hidden": false,
                    "preview": {
                        "images": [
                            {
                                "source": {
                                    "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?s=bd74781535207b91c924b6edb1e1d358",
                                    "width": 1484,
                                    "height": 1414
                                },
                                "resolutions": [
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=a38a88ce03bd6de7a455d676b9d8deb9",
                                        "width": 108,
                                        "height": 102
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=216&amp;s=0e7e68c4c77f451128ee07e8d42a8bed",
                                        "width": 216,
                                        "height": 205
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=320&amp;s=2525da752f3e38e88d1a5a94c1da127f",
                                        "width": 320,
                                        "height": 304
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=640&amp;s=24e3df0b870d47e6e854bc24dd971b78",
                                        "width": 640,
                                        "height": 609
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=960&amp;s=dcc5a4ac2b7a2043b1ea5f45b6af77b8",
                                        "width": 960,
                                        "height": 914
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=1080&amp;s=a2558bff165cb86fbe54032253becffb",
                                        "width": 1080,
                                        "height": 1029
                                    }
                                ],
                                "variants": {},
                                "id": "wMWe-XHP5aq0FT5xjkh9XILP5Kj8LigIxL3zuWJ-mwg"
                            }
                        ],
                        "enabled": false
                    },
                    "thumbnail": "https://b.thumbs.redditmedia.com/MyNt7OfBCX6PCBkdkAVpngTmqIWiPuZPiMu7V_M7DWs.jpg",
                    "whitelist_status": "all_ads",
                    "edited": false,
                    "link_flair_css_class": null,
                    "author_flair_richtext": [],
                    "author_flair_css_class": null,
                    "contest_mode": false,
                    "gilded": 0,
                    "locked": false,
                    "downs": 0,
                    "brand_safe": true,
                    "secure_media_embed": {},
                    "removal_reason": null,
                    "post_hint": "link",
                    "author_flair_text": null,
                    "stickied": false,
                    "visited": false,
                    "can_gild": true,
                    "thumbnail_height": 133,
                    "name": "t3_7q3wr0",
                    "spoiler": false,
                    "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/",
                    "subreddit_type": "public",
                    "parent_whitelist_status": "all_ads",
                    "hide_score": false,
                    "created": 1515870355,
                    "url": "https://www.washingtonpost.com/news/worldviews/wp/2014/12/04/watch-how-europe-is-greener-now-than-100-years-ago/?utm_term=.7ffd7a92f44c",
                    "link_flair_type": "text",
                    "quarantine": false,
                    "rte_mode": "markdown",
                    "created_utc": 1515841555,
                    "subreddit_name_prefixed": "r/europe",
                    "ups": 887,
                    "media": null,
                    "link_flair_text_color": "dark",
                    "author_flair_background_color": null,
                    "num_comments": 212,
                    "is_self": false,
                    "title": "Watch: How Europe is greener now than 100 years ago",
                    "mod_note": null,
                    "is_video": false,
                    "distinguished": null
                }
            },
            {
                "kind": "t3",
                "data": {
                    "domain": "washingtonpost.com",
                    "approved_at_utc": null,
                    "author_flair_text_color": null,
                    "mod_reason_by": null,
                    "banned_by": null,
                    "num_reports": null,
                    "author_flair_type": "text",
                    "subreddit_id": "t5_2tyt1",
                    "thumbnail_width": 140,
                    "subreddit": "theworldnews",
                    "selftext_html": null,
                    "selftext": "",
                    "likes": null,
                    "suggested_sort": null,
                    "user_reports": [],
                    "secure_media": null,
                    "is_reddit_media_domain": false,
                    "saved": false,
                    "id": "7q4m72",
                    "banned_at_utc": null,
                    "mod_reason_title": null,
                    "view_count": 12,
                    "archived": false,
                    "clicked": false,
                    "media_embed": {},
                    "report_reasons": null,
                    "author": "worldnewsbot",
                    "num_crossposts": 0,
                    "link_flair_text": null,
                    "mod_reports": [],
                    "can_mod_post": false,
                    "link_flair_richtext": [],
                    "is_crosspostable": true,
                    "pinned": false,
                    "score": 2,
                    "approved_by": null,
                    "over_18": false,
                    "hidden": false,
                    "preview": {
                        "images": [
                            {
                                "source": {
                                    "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?s=bd74781535207b91c924b6edb1e1d358",
                                    "width": 1484,
                                    "height": 1414
                                },
                                "resolutions": [
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=a38a88ce03bd6de7a455d676b9d8deb9",
                                        "width": 108,
                                        "height": 102
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=216&amp;s=0e7e68c4c77f451128ee07e8d42a8bed",
                                        "width": 216,
                                        "height": 205
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=320&amp;s=2525da752f3e38e88d1a5a94c1da127f",
                                        "width": 320,
                                        "height": 304
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=640&amp;s=24e3df0b870d47e6e854bc24dd971b78",
                                        "width": 640,
                                        "height": 609
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=960&amp;s=dcc5a4ac2b7a2043b1ea5f45b6af77b8",
                                        "width": 960,
                                        "height": 914
                                    },
                                    {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=1080&amp;s=a2558bff165cb86fbe54032253becffb",
                                        "width": 1080,
                                        "height": 1029
                                    }
                                ],
                                "variants": {},
                                "id": "wMWe-XHP5aq0FT5xjkh9XILP5Kj8LigIxL3zuWJ-mwg"
                            }
                        ],
                        "enabled": false
                    },
                    "thumbnail": "default",
                    "whitelist_status": null,
                    "edited": false,
                    "link_flair_css_class": null,
                    "author_flair_richtext": [],
                    "author_flair_css_class": null,
                    "contest_mode": false,
                    "gilded": 0,
                    "locked": false,
                    "downs": 0,
                    "brand_safe": false,
                    "secure_media_embed": {},
                    "removal_reason": null,
                    "post_hint": "link",
                    "author_flair_text": null,
                    "stickied": false,
                    "visited": false,
                    "can_gild": true,
                    "thumbnail_height": 133,
                    "name": "t3_7q4m72",
                    "spoiler": false,
                    "permalink": "/r/theworldnews/comments/7q4m72/watch_how_europe_is_greener_now_than_100_years_ago/",
                    "subreddit_type": "public",
                    "parent_whitelist_status": null,
                    "hide_score": false,
                    "created": 1515881155,
                    "url": "https://www.washingtonpost.com/news/worldviews/wp/2014/12/04/watch-how-europe-is-greener-now-than-100-years-ago/?utm_term=.7ffd7a92f44c",
                    "link_flair_type": "text",
                    "quarantine": false,
                    "rte_mode": "markdown",
                    "created_utc": 1515852355,
                    "subreddit_name_prefixed": "r/theworldnews",
                    "ups": 2,
                    "media": null,
                    "link_flair_text_color": "dark",
                    "author_flair_background_color": null,
                    "num_comments": 0,
                    "is_self": false,
                    "title": "Watch: How Europe is greener now than 100 years ago",
                    "mod_note": null,
                    "is_video": false,
                    "distinguished": null
                }
            }
        ],
        "before": null
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = results_data;

const listing_data = [
    {
        "kind": "Listing",
        "data": {
            "after": null,
            "whitelist_status": "all_ads",
            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
            "dist": 1,
            "children": [
                {
                    "kind": "t3",
                    "data": {
                        "domain": "washingtonpost.com",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "text",
                        "subreddit_id": "t5_2qh4j",
                        "thumbnail_width": 140,
                        "subreddit": "europe",
                        "selftext_html": null,
                        "selftext": "",
                        "likes": null,
                        "suggested_sort": null,
                        "rte_mode": "markdown",
                        "mod_note": null,
                        "user_reports": [],
                        "secure_media": null,
                        "is_reddit_media_domain": false,
                        "saved": false,
                        "id": "7q3wr0",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "view_count": 23698,
                        "archived": false,
                        "clicked": false,
                        "report_reasons": null,
                        "author": "jimrosenz",
                        "num_crossposts": 0,
                        "link_flair_text": null,
                        "link_flair_type": "text",
                        "can_mod_post": false,
                        "link_flair_richtext": [],
                        "is_crosspostable": true,
                        "pinned": false,
                        "score": 886,
                        "approved_by": null,
                        "over_18": false,
                        "removal_reason": null,
                        "hidden": false,
                        "preview": {
                            "images": [
                                {
                                    "source": {
                                        "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?s=bd74781535207b91c924b6edb1e1d358",
                                        "width": 1484,
                                        "height": 1414
                                    },
                                    "resolutions": [
                                        {
                                            "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=108&s=a38a88ce03bd6de7a455d676b9d8deb9",
                                            "width": 108,
                                            "height": 102
                                        },
                                        {
                                            "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=216&s=0e7e68c4c77f451128ee07e8d42a8bed",
                                            "width": 216,
                                            "height": 205
                                        },
                                        {
                                            "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=320&s=2525da752f3e38e88d1a5a94c1da127f",
                                            "width": 320,
                                            "height": 304
                                        },
                                        {
                                            "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=640&s=24e3df0b870d47e6e854bc24dd971b78",
                                            "width": 640,
                                            "height": 609
                                        },
                                        {
                                            "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=960&s=dcc5a4ac2b7a2043b1ea5f45b6af77b8",
                                            "width": 960,
                                            "height": 914
                                        },
                                        {
                                            "url": "https://i.redditmedia.com/NxlxuJ3dIpkRYIHPLDucZgnppwQbXg5UR2gvJT-ZQZk.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=1080&s=a2558bff165cb86fbe54032253becffb",
                                            "width": 1080,
                                            "height": 1029
                                        }
                                    ],
                                    "variants": {},
                                    "id": "wMWe-XHP5aq0FT5xjkh9XILP5Kj8LigIxL3zuWJ-mwg"
                                }
                            ],
                            "enabled": false
                        },
                        "num_comments": 212,
                        "thumbnail": "https://b.thumbs.redditmedia.com/MyNt7OfBCX6PCBkdkAVpngTmqIWiPuZPiMu7V_M7DWs.jpg",
                        "hide_score": false,
                        "edited": false,
                        "link_flair_css_class": null,
                        "brand_safe": true,
                        "author_flair_css_class": null,
                        "contest_mode": false,
                        "gilded": 0,
                        "title": "Watch: How Europe is greener now than 100 years ago",
                        "downs": 0,
                        "author_flair_richtext": [],
                        "secure_media_embed": {},
                        "media_embed": {},
                        "post_hint": "link",
                        "can_gild": true,
                        "thumbnail_height": 133,
                        "name": "t3_7q3wr0",
                        "parent_whitelist_status": "all_ads",
                        "author_flair_text_color": null,
                        "spoiler": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/",
                        "subreddit_type": "public",
                        "locked": false,
                        "stickied": false,
                        "created": 1515870355,
                        "url": "https://www.washingtonpost.com/news/worldviews/wp/2014/12/04/watch-how-europe-is-greener-now-than-100-years-ago/?utm_term=.7ffd7a92f44c",
                        "author_flair_text": null,
                        "quarantine": false,
                        "whitelist_status": "all_ads",
                        "created_utc": 1515841555,
                        "subreddit_name_prefixed": "r/europe",
                        "distinguished": null,
                        "media": null,
                        "link_flair_text_color": "dark",
                        "upvote_ratio": 0.93,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "is_self": false,
                        "visited": false,
                        "num_reports": null,
                        "is_video": false,
                        "ups": 886
                    }
                }
            ],
            "before": null
        }
    },
    {
        "kind": "Listing",
        "data": {
            "after": null,
            "whitelist_status": "all_ads",
            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
            "dist": null,
            "children": [
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "text",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "richtext",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": {
                                                "kind": "Listing",
                                                "data": {
                                                    "after": null,
                                                    "whitelist_status": "all_ads",
                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                    "dist": null,
                                                    "children": [
                                                        {
                                                            "kind": "t1",
                                                            "data": {
                                                                "subreddit_id": "t5_2qh4j",
                                                                "approved_at_utc": null,
                                                                "mod_reason_by": null,
                                                                "banned_by": null,
                                                                "author_flair_type": "text",
                                                                "removal_reason": null,
                                                                "link_id": "t3_7q3wr0",
                                                                "likes": null,
                                                                "replies": {
                                                                    "kind": "Listing",
                                                                    "data": {
                                                                        "after": null,
                                                                        "whitelist_status": "all_ads",
                                                                        "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                        "dist": null,
                                                                        "children": [
                                                                            {
                                                                                "kind": "t1",
                                                                                "data": {
                                                                                    "subreddit_id": "t5_2qh4j",
                                                                                    "approved_at_utc": null,
                                                                                    "mod_reason_by": null,
                                                                                    "banned_by": null,
                                                                                    "author_flair_type": "richtext",
                                                                                    "removal_reason": null,
                                                                                    "link_id": "t3_7q3wr0",
                                                                                    "likes": null,
                                                                                    "replies": {
                                                                                        "kind": "Listing",
                                                                                        "data": {
                                                                                            "after": null,
                                                                                            "whitelist_status": "all_ads",
                                                                                            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                            "dist": null,
                                                                                            "children": [
                                                                                                {
                                                                                                    "kind": "t1",
                                                                                                    "data": {
                                                                                                        "subreddit_id": "t5_2qh4j",
                                                                                                        "approved_at_utc": null,
                                                                                                        "mod_reason_by": null,
                                                                                                        "banned_by": null,
                                                                                                        "author_flair_type": "richtext",
                                                                                                        "removal_reason": null,
                                                                                                        "link_id": "t3_7q3wr0",
                                                                                                        "likes": null,
                                                                                                        "replies": {
                                                                                                            "kind": "Listing",
                                                                                                            "data": {
                                                                                                                "after": null,
                                                                                                                "whitelist_status": "all_ads",
                                                                                                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                "dist": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "kind": "t1",
                                                                                                                        "data": {
                                                                                                                            "subreddit_id": "t5_2qh4j",
                                                                                                                            "approved_at_utc": null,
                                                                                                                            "mod_reason_by": null,
                                                                                                                            "banned_by": null,
                                                                                                                            "author_flair_type": "richtext",
                                                                                                                            "removal_reason": null,
                                                                                                                            "link_id": "t3_7q3wr0",
                                                                                                                            "likes": null,
                                                                                                                            "replies": {
                                                                                                                                "kind": "Listing",
                                                                                                                                "data": {
                                                                                                                                    "after": null,
                                                                                                                                    "whitelist_status": "all_ads",
                                                                                                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                                    "dist": null,
                                                                                                                                    "children": [
                                                                                                                                        {
                                                                                                                                            "kind": "more",
                                                                                                                                            "data": {
                                                                                                                                                "count": 10,
                                                                                                                                                "name": "t1_dsmmbv2",
                                                                                                                                                "id": "dsmmbv2",
                                                                                                                                                "parent_id": "t1_dsm8po3",
                                                                                                                                                "depth": 6,
                                                                                                                                                "children": [
                                                                                                                                                    "dsmmbv2"
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    ],
                                                                                                                                    "before": null
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "user_reports": [],
                                                                                                                            "saved": false,
                                                                                                                            "id": "dsm8po3",
                                                                                                                            "banned_at_utc": null,
                                                                                                                            "mod_reason_title": null,
                                                                                                                            "gilded": 0,
                                                                                                                            "archived": false,
                                                                                                                            "report_reasons": null,
                                                                                                                            "author": "Tossal",
                                                                                                                            "can_mod_post": false,
                                                                                                                            "ups": 29,
                                                                                                                            "parent_id": "t1_dsm7tht",
                                                                                                                            "score": 29,
                                                                                                                            "approved_by": null,
                                                                                                                            "downs": 0,
                                                                                                                            "body": "Red squirrels returned here a few years ago, after 30-100 years of absence in most places. They've been gone for so long that lots of people actually think they're an invasive species. Now let's wait for their predators to catch up and fix the ecosystem, but so far they've already displaced the massive rats that had taken up their niche in the meantime, which is an improvement.",
                                                                                                                            "edited": false,
                                                                                                                            "author_flair_css_class": "EART",
                                                                                                                            "collapsed": false,
                                                                                                                            "author_flair_richtext": [
                                                                                                                                {
                                                                                                                                    "e": "text",
                                                                                                                                    "t": "Valencian Country"
                                                                                                                                }
                                                                                                                            ],
                                                                                                                            "is_submitter": false,
                                                                                                                            "collapsed_reason": null,
                                                                                                                            "body_html": "<div class=\"md\"><p>Red squirrels returned here a few years ago, after 30-100 years of absence in most places. They&#39;ve been gone for so long that lots of people actually think they&#39;re an invasive species. Now let&#39;s wait for their predators to catch up and fix the ecosystem, but so far they&#39;ve already displaced the massive rats that had taken up their niche in the meantime, which is an improvement.</p>\n</div>",
                                                                                                                            "stickied": false,
                                                                                                                            "subreddit_type": "public",
                                                                                                                            "can_gild": true,
                                                                                                                            "subreddit": "europe",
                                                                                                                            "author_flair_text_color": "dark",
                                                                                                                            "score_hidden": false,
                                                                                                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm8po3/",
                                                                                                                            "num_reports": null,
                                                                                                                            "name": "t1_dsm8po3",
                                                                                                                            "created": 1515876845,
                                                                                                                            "author_flair_text": "Valencian Country",
                                                                                                                            "rte_mode": "markdown",
                                                                                                                            "created_utc": 1515848045,
                                                                                                                            "subreddit_name_prefixed": "r/europe",
                                                                                                                            "controversiality": 0,
                                                                                                                            "depth": 5,
                                                                                                                            "author_flair_background_color": "#dadada",
                                                                                                                            "mod_reports": [],
                                                                                                                            "mod_note": null,
                                                                                                                            "distinguished": null
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "kind": "t1",
                                                                                                                        "data": {
                                                                                                                            "subreddit_id": "t5_2qh4j",
                                                                                                                            "approved_at_utc": null,
                                                                                                                            "mod_reason_by": null,
                                                                                                                            "banned_by": null,
                                                                                                                            "author_flair_type": "text",
                                                                                                                            "removal_reason": null,
                                                                                                                            "link_id": "t3_7q3wr0",
                                                                                                                            "likes": null,
                                                                                                                            "replies": {
                                                                                                                                "kind": "Listing",
                                                                                                                                "data": {
                                                                                                                                    "after": null,
                                                                                                                                    "whitelist_status": "all_ads",
                                                                                                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                                    "dist": null,
                                                                                                                                    "children": [
                                                                                                                                        {
                                                                                                                                            "kind": "more",
                                                                                                                                            "data": {
                                                                                                                                                "count": 1,
                                                                                                                                                "name": "t1_dsmbocc",
                                                                                                                                                "id": "dsmbocc",
                                                                                                                                                "parent_id": "t1_dsmbg8a",
                                                                                                                                                "depth": 6,
                                                                                                                                                "children": [
                                                                                                                                                    "dsmbocc"
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    ],
                                                                                                                                    "before": null
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "user_reports": [],
                                                                                                                            "saved": false,
                                                                                                                            "id": "dsmbg8a",
                                                                                                                            "banned_at_utc": null,
                                                                                                                            "mod_reason_title": null,
                                                                                                                            "gilded": 0,
                                                                                                                            "archived": false,
                                                                                                                            "report_reasons": null,
                                                                                                                            "author": "kurtchen11",
                                                                                                                            "can_mod_post": false,
                                                                                                                            "ups": 18,
                                                                                                                            "parent_id": "t1_dsm7tht",
                                                                                                                            "score": 18,
                                                                                                                            "approved_by": null,
                                                                                                                            "downs": 0,
                                                                                                                            "body": "An amazing comeback for me is the wisent.\nThats the european bison.\nIt was basically extinct in 1920, only a few individuals survived in captivity.\n\nSince then the wisent slowly got reintroduced into several countries in Europe.\n\nIn 2004 a small herd was brought to germany, not far from where i was born. Thats a pretty huge deal because the wisent was extinct in germany for over 500 years.\n\nPart of why this is so awesome for lots of us is simply the size of those bisons: we are only used to rabbits and boars, sometimes small deer. \n",
                                                                                                                            "edited": false,
                                                                                                                            "author_flair_css_class": null,
                                                                                                                            "collapsed": false,
                                                                                                                            "author_flair_richtext": [],
                                                                                                                            "is_submitter": false,
                                                                                                                            "collapsed_reason": null,
                                                                                                                            "body_html": "<div class=\"md\"><p>An amazing comeback for me is the wisent.\nThats the european bison.\nIt was basically extinct in 1920, only a few individuals survived in captivity.</p>\n\n<p>Since then the wisent slowly got reintroduced into several countries in Europe.</p>\n\n<p>In 2004 a small herd was brought to germany, not far from where i was born. Thats a pretty huge deal because the wisent was extinct in germany for over 500 years.</p>\n\n<p>Part of why this is so awesome for lots of us is simply the size of those bisons: we are only used to rabbits and boars, sometimes small deer. </p>\n</div>",
                                                                                                                            "stickied": false,
                                                                                                                            "subreddit_type": "public",
                                                                                                                            "can_gild": true,
                                                                                                                            "subreddit": "europe",
                                                                                                                            "author_flair_text_color": null,
                                                                                                                            "score_hidden": false,
                                                                                                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmbg8a/",
                                                                                                                            "num_reports": null,
                                                                                                                            "name": "t1_dsmbg8a",
                                                                                                                            "created": 1515882261,
                                                                                                                            "author_flair_text": null,
                                                                                                                            "rte_mode": "markdown",
                                                                                                                            "created_utc": 1515853461,
                                                                                                                            "subreddit_name_prefixed": "r/europe",
                                                                                                                            "controversiality": 0,
                                                                                                                            "depth": 5,
                                                                                                                            "author_flair_background_color": null,
                                                                                                                            "mod_reports": [],
                                                                                                                            "mod_note": null,
                                                                                                                            "distinguished": null
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "kind": "t1",
                                                                                                                        "data": {
                                                                                                                            "subreddit_id": "t5_2qh4j",
                                                                                                                            "approved_at_utc": null,
                                                                                                                            "mod_reason_by": null,
                                                                                                                            "banned_by": null,
                                                                                                                            "author_flair_type": "richtext",
                                                                                                                            "removal_reason": null,
                                                                                                                            "link_id": "t3_7q3wr0",
                                                                                                                            "likes": null,
                                                                                                                            "replies": {
                                                                                                                                "kind": "Listing",
                                                                                                                                "data": {
                                                                                                                                    "after": null,
                                                                                                                                    "whitelist_status": "all_ads",
                                                                                                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                                    "dist": null,
                                                                                                                                    "children": [
                                                                                                                                        {
                                                                                                                                            "kind": "t1",
                                                                                                                                            "data": {
                                                                                                                                                "subreddit_id": "t5_2qh4j",
                                                                                                                                                "approved_at_utc": null,
                                                                                                                                                "mod_reason_by": null,
                                                                                                                                                "banned_by": null,
                                                                                                                                                "author_flair_type": "richtext",
                                                                                                                                                "removal_reason": null,
                                                                                                                                                "link_id": "t3_7q3wr0",
                                                                                                                                                "likes": null,
                                                                                                                                                "replies": "",
                                                                                                                                                "user_reports": [],
                                                                                                                                                "saved": false,
                                                                                                                                                "id": "dsmb968",
                                                                                                                                                "banned_at_utc": null,
                                                                                                                                                "mod_reason_title": null,
                                                                                                                                                "gilded": 0,
                                                                                                                                                "archived": false,
                                                                                                                                                "report_reasons": null,
                                                                                                                                                "author": "NuruYetu",
                                                                                                                                                "can_mod_post": false,
                                                                                                                                                "ups": 10,
                                                                                                                                                "parent_id": "t1_dsm9s1r",
                                                                                                                                                "score": 10,
                                                                                                                                                "approved_by": null,
                                                                                                                                                "downs": 0,
                                                                                                                                                "body": "Flanders*, Wallonia has had sightings of wolves for a while now :)",
                                                                                                                                                "edited": false,
                                                                                                                                                "author_flair_css_class": "BELG",
                                                                                                                                                "collapsed": false,
                                                                                                                                                "author_flair_richtext": [
                                                                                                                                                    {
                                                                                                                                                        "e": "text",
                                                                                                                                                        "t": "Black Romania"
                                                                                                                                                    }
                                                                                                                                                ],
                                                                                                                                                "is_submitter": false,
                                                                                                                                                "collapsed_reason": null,
                                                                                                                                                "body_html": "<div class=\"md\"><p>Flanders*, Wallonia has had sightings of wolves for a while now :)</p>\n</div>",
                                                                                                                                                "stickied": false,
                                                                                                                                                "subreddit_type": "public",
                                                                                                                                                "can_gild": true,
                                                                                                                                                "subreddit": "europe",
                                                                                                                                                "author_flair_text_color": null,
                                                                                                                                                "score_hidden": false,
                                                                                                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmb968/",
                                                                                                                                                "num_reports": null,
                                                                                                                                                "name": "t1_dsmb968",
                                                                                                                                                "created": 1515881925,
                                                                                                                                                "author_flair_text": "Black Romania",
                                                                                                                                                "rte_mode": "markdown",
                                                                                                                                                "created_utc": 1515853125,
                                                                                                                                                "subreddit_name_prefixed": "r/europe",
                                                                                                                                                "controversiality": 0,
                                                                                                                                                "depth": 6,
                                                                                                                                                "author_flair_background_color": null,
                                                                                                                                                "mod_reports": [],
                                                                                                                                                "mod_note": null,
                                                                                                                                                "distinguished": null
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            "kind": "more",
                                                                                                                                            "data": {
                                                                                                                                                "count": 1,
                                                                                                                                                "name": "t1_dsmu8l3",
                                                                                                                                                "id": "dsmu8l3",
                                                                                                                                                "parent_id": "t1_dsm9s1r",
                                                                                                                                                "depth": 6,
                                                                                                                                                "children": [
                                                                                                                                                    "dsmu8l3"
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    ],
                                                                                                                                    "before": null
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "user_reports": [],
                                                                                                                            "saved": false,
                                                                                                                            "id": "dsm9s1r",
                                                                                                                            "banned_at_utc": null,
                                                                                                                            "mod_reason_title": null,
                                                                                                                            "gilded": 0,
                                                                                                                            "archived": false,
                                                                                                                            "report_reasons": null,
                                                                                                                            "author": "Bororum",
                                                                                                                            "can_mod_post": false,
                                                                                                                            "ups": 11,
                                                                                                                            "parent_id": "t1_dsm7tht",
                                                                                                                            "score": 11,
                                                                                                                            "approved_by": null,
                                                                                                                            "downs": 0,
                                                                                                                            "body": "Belgium just got its first visit from a wolf in a hundred years! ",
                                                                                                                            "edited": false,
                                                                                                                            "author_flair_css_class": "BELG",
                                                                                                                            "collapsed": false,
                                                                                                                            "author_flair_richtext": [
                                                                                                                                {
                                                                                                                                    "e": "text",
                                                                                                                                    "t": "Belgium"
                                                                                                                                }
                                                                                                                            ],
                                                                                                                            "is_submitter": false,
                                                                                                                            "collapsed_reason": null,
                                                                                                                            "body_html": "<div class=\"md\"><p>Belgium just got its first visit from a wolf in a hundred years! </p>\n</div>",
                                                                                                                            "stickied": false,
                                                                                                                            "subreddit_type": "public",
                                                                                                                            "can_gild": true,
                                                                                                                            "subreddit": "europe",
                                                                                                                            "author_flair_text_color": null,
                                                                                                                            "score_hidden": false,
                                                                                                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9s1r/",
                                                                                                                            "num_reports": null,
                                                                                                                            "name": "t1_dsm9s1r",
                                                                                                                            "created": 1515879162,
                                                                                                                            "author_flair_text": "Belgium",
                                                                                                                            "rte_mode": "markdown",
                                                                                                                            "created_utc": 1515850362,
                                                                                                                            "subreddit_name_prefixed": "r/europe",
                                                                                                                            "controversiality": 0,
                                                                                                                            "depth": 5,
                                                                                                                            "author_flair_background_color": null,
                                                                                                                            "mod_reports": [],
                                                                                                                            "mod_note": null,
                                                                                                                            "distinguished": null
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "kind": "more",
                                                                                                                        "data": {
                                                                                                                            "count": 6,
                                                                                                                            "name": "t1_dsma7yl",
                                                                                                                            "id": "dsma7yl",
                                                                                                                            "parent_id": "t1_dsm7tht",
                                                                                                                            "depth": 5,
                                                                                                                            "children": [
                                                                                                                                "dsma7yl"
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    }
                                                                                                                ],
                                                                                                                "before": null
                                                                                                            }
                                                                                                        },
                                                                                                        "user_reports": [],
                                                                                                        "saved": false,
                                                                                                        "id": "dsm7tht",
                                                                                                        "banned_at_utc": null,
                                                                                                        "mod_reason_title": null,
                                                                                                        "gilded": 0,
                                                                                                        "archived": false,
                                                                                                        "report_reasons": null,
                                                                                                        "author": "zek997",
                                                                                                        "can_mod_post": false,
                                                                                                        "ups": 56,
                                                                                                        "parent_id": "t1_dsm7p6m",
                                                                                                        "score": 56,
                                                                                                        "approved_by": null,
                                                                                                        "downs": 0,
                                                                                                        "body": "Wild animals are making a comeback too, from what I heard. Population of wolves, lynxes, bears, etc, is increasing all throughout Europe. More forests and grassland mean more habitat for them.",
                                                                                                        "edited": false,
                                                                                                        "author_flair_css_class": "PORT",
                                                                                                        "collapsed": false,
                                                                                                        "author_flair_richtext": [
                                                                                                            {
                                                                                                                "e": "text",
                                                                                                                "t": "Portugal"
                                                                                                            }
                                                                                                        ],
                                                                                                        "is_submitter": false,
                                                                                                        "collapsed_reason": null,
                                                                                                        "body_html": "<div class=\"md\"><p>Wild animals are making a comeback too, from what I heard. Population of wolves, lynxes, bears, etc, is increasing all throughout Europe. More forests and grassland mean more habitat for them.</p>\n</div>",
                                                                                                        "stickied": false,
                                                                                                        "subreddit_type": "public",
                                                                                                        "can_gild": true,
                                                                                                        "subreddit": "europe",
                                                                                                        "author_flair_text_color": "dark",
                                                                                                        "score_hidden": false,
                                                                                                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7tht/",
                                                                                                        "num_reports": null,
                                                                                                        "name": "t1_dsm7tht",
                                                                                                        "created": 1515874636,
                                                                                                        "author_flair_text": "Portugal",
                                                                                                        "rte_mode": "markdown",
                                                                                                        "created_utc": 1515845836,
                                                                                                        "subreddit_name_prefixed": "r/europe",
                                                                                                        "controversiality": 0,
                                                                                                        "depth": 4,
                                                                                                        "author_flair_background_color": "",
                                                                                                        "mod_reports": [],
                                                                                                        "mod_note": null,
                                                                                                        "distinguished": null
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "kind": "t1",
                                                                                                    "data": {
                                                                                                        "subreddit_id": "t5_2qh4j",
                                                                                                        "approved_at_utc": null,
                                                                                                        "mod_reason_by": null,
                                                                                                        "banned_by": null,
                                                                                                        "author_flair_type": "richtext",
                                                                                                        "removal_reason": null,
                                                                                                        "link_id": "t3_7q3wr0",
                                                                                                        "likes": null,
                                                                                                        "replies": {
                                                                                                            "kind": "Listing",
                                                                                                            "data": {
                                                                                                                "after": null,
                                                                                                                "whitelist_status": "all_ads",
                                                                                                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                "dist": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "kind": "t1",
                                                                                                                        "data": {
                                                                                                                            "subreddit_id": "t5_2qh4j",
                                                                                                                            "approved_at_utc": null,
                                                                                                                            "mod_reason_by": null,
                                                                                                                            "banned_by": null,
                                                                                                                            "author_flair_type": "richtext",
                                                                                                                            "removal_reason": null,
                                                                                                                            "link_id": "t3_7q3wr0",
                                                                                                                            "likes": null,
                                                                                                                            "replies": "",
                                                                                                                            "user_reports": [],
                                                                                                                            "saved": false,
                                                                                                                            "id": "dsma740",
                                                                                                                            "banned_at_utc": null,
                                                                                                                            "mod_reason_title": null,
                                                                                                                            "gilded": 0,
                                                                                                                            "archived": false,
                                                                                                                            "report_reasons": null,
                                                                                                                            "author": "YoSoyUnPayaso",
                                                                                                                            "can_mod_post": false,
                                                                                                                            "ups": 7,
                                                                                                                            "parent_id": "t1_dsm9bvq",
                                                                                                                            "score": 7,
                                                                                                                            "approved_by": null,
                                                                                                                            "downs": 0,
                                                                                                                            "body": "They should push through with the Natuurnetwerk though.",
                                                                                                                            "edited": false,
                                                                                                                            "author_flair_css_class": "NETH",
                                                                                                                            "collapsed": false,
                                                                                                                            "author_flair_richtext": [
                                                                                                                                {
                                                                                                                                    "e": "text",
                                                                                                                                    "t": "The Netherlands"
                                                                                                                                }
                                                                                                                            ],
                                                                                                                            "is_submitter": false,
                                                                                                                            "collapsed_reason": null,
                                                                                                                            "body_html": "<div class=\"md\"><p>They should push through with the Natuurnetwerk though.</p>\n</div>",
                                                                                                                            "stickied": false,
                                                                                                                            "subreddit_type": "public",
                                                                                                                            "can_gild": true,
                                                                                                                            "subreddit": "europe",
                                                                                                                            "author_flair_text_color": null,
                                                                                                                            "score_hidden": false,
                                                                                                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsma740/",
                                                                                                                            "num_reports": null,
                                                                                                                            "name": "t1_dsma740",
                                                                                                                            "created": 1515879984,
                                                                                                                            "author_flair_text": "The Netherlands",
                                                                                                                            "rte_mode": "markdown",
                                                                                                                            "created_utc": 1515851184,
                                                                                                                            "subreddit_name_prefixed": "r/europe",
                                                                                                                            "controversiality": 0,
                                                                                                                            "depth": 5,
                                                                                                                            "author_flair_background_color": null,
                                                                                                                            "mod_reports": [],
                                                                                                                            "mod_note": null,
                                                                                                                            "distinguished": null
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "kind": "more",
                                                                                                                        "data": {
                                                                                                                            "count": 3,
                                                                                                                            "name": "t1_dsn7m8y",
                                                                                                                            "id": "dsn7m8y",
                                                                                                                            "parent_id": "t1_dsm9bvq",
                                                                                                                            "depth": 5,
                                                                                                                            "children": [
                                                                                                                                "dsn7m8y",
                                                                                                                                "dsmu9tr"
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    }
                                                                                                                ],
                                                                                                                "before": null
                                                                                                            }
                                                                                                        },
                                                                                                        "user_reports": [],
                                                                                                        "saved": false,
                                                                                                        "id": "dsm9bvq",
                                                                                                        "banned_at_utc": null,
                                                                                                        "mod_reason_title": null,
                                                                                                        "gilded": 0,
                                                                                                        "archived": false,
                                                                                                        "report_reasons": null,
                                                                                                        "author": "itsgonnabeanofromme",
                                                                                                        "can_mod_post": false,
                                                                                                        "ups": 24,
                                                                                                        "parent_id": "t1_dsm7p6m",
                                                                                                        "score": 24,
                                                                                                        "approved_by": null,
                                                                                                        "downs": 0,
                                                                                                        "body": "Our government is currently exploring the possibility of spending ~4 billion euros to increase the amount of trees in the country by 25%. The plan is to surround all highways with 300m wide forestry. \n\nI’m here for it. ",
                                                                                                        "edited": false,
                                                                                                        "author_flair_css_class": "NETH",
                                                                                                        "collapsed": false,
                                                                                                        "author_flair_richtext": [
                                                                                                            {
                                                                                                                "e": "text",
                                                                                                                "t": "The Netherlands"
                                                                                                            }
                                                                                                        ],
                                                                                                        "is_submitter": false,
                                                                                                        "collapsed_reason": null,
                                                                                                        "body_html": "<div class=\"md\"><p>Our government is currently exploring the possibility of spending ~4 billion euros to increase the amount of trees in the country by 25%. The plan is to surround all highways with 300m wide forestry. </p>\n\n<p>I’m here for it. </p>\n</div>",
                                                                                                        "stickied": false,
                                                                                                        "subreddit_type": "public",
                                                                                                        "can_gild": true,
                                                                                                        "subreddit": "europe",
                                                                                                        "author_flair_text_color": null,
                                                                                                        "score_hidden": false,
                                                                                                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9bvq/",
                                                                                                        "num_reports": null,
                                                                                                        "name": "t1_dsm9bvq",
                                                                                                        "created": 1515878238,
                                                                                                        "author_flair_text": "The Netherlands",
                                                                                                        "rte_mode": "markdown",
                                                                                                        "created_utc": 1515849438,
                                                                                                        "subreddit_name_prefixed": "r/europe",
                                                                                                        "controversiality": 0,
                                                                                                        "depth": 4,
                                                                                                        "author_flair_background_color": null,
                                                                                                        "mod_reports": [],
                                                                                                        "mod_note": null,
                                                                                                        "distinguished": null
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    "kind": "more",
                                                                                                    "data": {
                                                                                                        "count": 2,
                                                                                                        "name": "t1_dsn6vl8",
                                                                                                        "id": "dsn6vl8",
                                                                                                        "parent_id": "t1_dsm7p6m",
                                                                                                        "depth": 4,
                                                                                                        "children": [
                                                                                                            "dsn6vl8",
                                                                                                            "dsmdd1b"
                                                                                                        ]
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "before": null
                                                                                        }
                                                                                    },
                                                                                    "user_reports": [],
                                                                                    "saved": false,
                                                                                    "id": "dsm7p6m",
                                                                                    "banned_at_utc": null,
                                                                                    "mod_reason_title": null,
                                                                                    "gilded": 0,
                                                                                    "archived": false,
                                                                                    "report_reasons": null,
                                                                                    "author": "umnikos",
                                                                                    "can_mod_post": false,
                                                                                    "ups": 95,
                                                                                    "parent_id": "t1_dsm7iyx",
                                                                                    "score": 95,
                                                                                    "approved_by": null,
                                                                                    "downs": 0,
                                                                                    "body": "Forests are good in all ways possible. You get more awesome forests to explore, you get cleaner air, you get more building material, you get a bigger habitat for wild animals.",
                                                                                    "edited": false,
                                                                                    "author_flair_css_class": "BULG",
                                                                                    "collapsed": false,
                                                                                    "author_flair_richtext": [
                                                                                        {
                                                                                            "e": "text",
                                                                                            "t": "Bulgaria"
                                                                                        }
                                                                                    ],
                                                                                    "is_submitter": false,
                                                                                    "collapsed_reason": null,
                                                                                    "body_html": "<div class=\"md\"><p>Forests are good in all ways possible. You get more awesome forests to explore, you get cleaner air, you get more building material, you get a bigger habitat for wild animals.</p>\n</div>",
                                                                                    "stickied": false,
                                                                                    "subreddit_type": "public",
                                                                                    "can_gild": true,
                                                                                    "subreddit": "europe",
                                                                                    "author_flair_text_color": null,
                                                                                    "score_hidden": false,
                                                                                    "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7p6m/",
                                                                                    "num_reports": null,
                                                                                    "name": "t1_dsm7p6m",
                                                                                    "created": 1515874323,
                                                                                    "author_flair_text": "Bulgaria",
                                                                                    "rte_mode": "markdown",
                                                                                    "created_utc": 1515845523,
                                                                                    "subreddit_name_prefixed": "r/europe",
                                                                                    "controversiality": 0,
                                                                                    "depth": 3,
                                                                                    "author_flair_background_color": null,
                                                                                    "mod_reports": [],
                                                                                    "mod_note": null,
                                                                                    "distinguished": null
                                                                                }
                                                                            },
                                                                            {
                                                                                "kind": "t1",
                                                                                "data": {
                                                                                    "subreddit_id": "t5_2qh4j",
                                                                                    "approved_at_utc": null,
                                                                                    "mod_reason_by": null,
                                                                                    "banned_by": null,
                                                                                    "author_flair_type": "text",
                                                                                    "removal_reason": null,
                                                                                    "link_id": "t3_7q3wr0",
                                                                                    "likes": null,
                                                                                    "replies": {
                                                                                        "kind": "Listing",
                                                                                        "data": {
                                                                                            "after": null,
                                                                                            "whitelist_status": "all_ads",
                                                                                            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                            "dist": null,
                                                                                            "children": [
                                                                                                {
                                                                                                    "kind": "more",
                                                                                                    "data": {
                                                                                                        "count": 3,
                                                                                                        "name": "t1_dsm8wsd",
                                                                                                        "id": "dsm8wsd",
                                                                                                        "parent_id": "t1_dsm8f22",
                                                                                                        "depth": 4,
                                                                                                        "children": [
                                                                                                            "dsm8wsd"
                                                                                                        ]
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "before": null
                                                                                        }
                                                                                    },
                                                                                    "user_reports": [],
                                                                                    "saved": false,
                                                                                    "id": "dsm8f22",
                                                                                    "banned_at_utc": null,
                                                                                    "mod_reason_title": null,
                                                                                    "gilded": 0,
                                                                                    "archived": false,
                                                                                    "report_reasons": null,
                                                                                    "author": "IgnorantPlebs",
                                                                                    "can_mod_post": false,
                                                                                    "ups": 17,
                                                                                    "parent_id": "t1_dsm7iyx",
                                                                                    "score": 17,
                                                                                    "approved_by": null,
                                                                                    "downs": 0,
                                                                                    "body": "It's funny how genuinely caring about the environment has been branded as something negative. I guess by the efforts of \"environmentally friendly\" big corporations?",
                                                                                    "edited": false,
                                                                                    "author_flair_css_class": null,
                                                                                    "collapsed": false,
                                                                                    "author_flair_richtext": [],
                                                                                    "is_submitter": false,
                                                                                    "collapsed_reason": null,
                                                                                    "body_html": "<div class=\"md\"><p>It&#39;s funny how genuinely caring about the environment has been branded as something negative. I guess by the efforts of &quot;environmentally friendly&quot; big corporations?</p>\n</div>",
                                                                                    "stickied": false,
                                                                                    "subreddit_type": "public",
                                                                                    "can_gild": true,
                                                                                    "subreddit": "europe",
                                                                                    "author_flair_text_color": null,
                                                                                    "score_hidden": false,
                                                                                    "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm8f22/",
                                                                                    "num_reports": null,
                                                                                    "name": "t1_dsm8f22",
                                                                                    "created": 1515876136,
                                                                                    "author_flair_text": null,
                                                                                    "rte_mode": "markdown",
                                                                                    "created_utc": 1515847336,
                                                                                    "subreddit_name_prefixed": "r/europe",
                                                                                    "controversiality": 0,
                                                                                    "depth": 3,
                                                                                    "author_flair_background_color": null,
                                                                                    "mod_reports": [],
                                                                                    "mod_note": null,
                                                                                    "distinguished": null
                                                                                }
                                                                            }
                                                                        ],
                                                                        "before": null
                                                                    }
                                                                },
                                                                "user_reports": [],
                                                                "saved": false,
                                                                "id": "dsm7iyx",
                                                                "banned_at_utc": null,
                                                                "mod_reason_title": null,
                                                                "gilded": 0,
                                                                "archived": false,
                                                                "report_reasons": null,
                                                                "author": "Bregvist",
                                                                "can_mod_post": false,
                                                                "ups": 66,
                                                                "parent_id": "t1_dsm785d",
                                                                "score": 66,
                                                                "approved_by": null,
                                                                "downs": 0,
                                                                "body": "Well, it was a more \"treehugger\" kind of irrational happy but, yes, you're right :)",
                                                                "edited": false,
                                                                "author_flair_css_class": null,
                                                                "collapsed": false,
                                                                "author_flair_richtext": [],
                                                                "is_submitter": false,
                                                                "collapsed_reason": null,
                                                                "body_html": "<div class=\"md\"><p>Well, it was a more &quot;treehugger&quot; kind of irrational happy but, yes, you&#39;re right :)</p>\n</div>",
                                                                "stickied": false,
                                                                "subreddit_type": "public",
                                                                "can_gild": true,
                                                                "subreddit": "europe",
                                                                "author_flair_text_color": null,
                                                                "score_hidden": false,
                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7iyx/",
                                                                "num_reports": null,
                                                                "name": "t1_dsm7iyx",
                                                                "created": 1515873874,
                                                                "author_flair_text": null,
                                                                "rte_mode": "markdown",
                                                                "created_utc": 1515845074,
                                                                "subreddit_name_prefixed": "r/europe",
                                                                "controversiality": 0,
                                                                "depth": 2,
                                                                "author_flair_background_color": null,
                                                                "mod_reports": [],
                                                                "mod_note": null,
                                                                "distinguished": null
                                                            }
                                                        },
                                                        {
                                                            "kind": "more",
                                                            "data": {
                                                                "count": 5,
                                                                "name": "t1_dsmp2ht",
                                                                "id": "dsmp2ht",
                                                                "parent_id": "t1_dsm785d",
                                                                "depth": 2,
                                                                "children": [
                                                                    "dsmp2ht",
                                                                    "dsn1ojr",
                                                                    "dsm9vj8",
                                                                    "dsmagrl"
                                                                ]
                                                            }
                                                        }
                                                    ],
                                                    "before": null
                                                }
                                            },
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsm785d",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "bruker12",
                                            "can_mod_post": false,
                                            "ups": 123,
                                            "parent_id": "t1_dsm6vn8",
                                            "score": 123,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "Me too. From an environmental standpoint this is great news, since more forests means more carbon gets captured and removed from the atmosphere.",
                                            "edited": false,
                                            "author_flair_css_class": "NORW",
                                            "collapsed": false,
                                            "author_flair_richtext": [
                                                {
                                                    "e": "text",
                                                    "t": "Norway"
                                                }
                                            ],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>Me too. From an environmental standpoint this is great news, since more forests means more carbon gets captured and removed from the atmosphere.</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": "dark",
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm785d/",
                                            "num_reports": null,
                                            "name": "t1_dsm785d",
                                            "created": 1515873084,
                                            "author_flair_text": "Norway",
                                            "rte_mode": "markdown",
                                            "created_utc": 1515844284,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": "",
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "text",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": {
                                                "kind": "Listing",
                                                "data": {
                                                    "after": null,
                                                    "whitelist_status": "all_ads",
                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                    "dist": null,
                                                    "children": [
                                                        {
                                                            "kind": "more",
                                                            "data": {
                                                                "count": 5,
                                                                "name": "t1_dsny5un",
                                                                "id": "dsny5un",
                                                                "parent_id": "t1_dsme8iu",
                                                                "depth": 2,
                                                                "children": [
                                                                    "dsny5un",
                                                                    "dsmn702",
                                                                    "dsmzlzr",
                                                                    "dsmesxr"
                                                                ]
                                                            }
                                                        }
                                                    ],
                                                    "before": null
                                                }
                                            },
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsme8iu",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "anyonesany",
                                            "can_mod_post": false,
                                            "ups": 12,
                                            "parent_id": "t1_dsm6vn8",
                                            "score": 12,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "While it's great to see the forests in europe growing, the map shows that this means we have a lot less farmland here than we did in the past. I'm sure that now a lot more food is being imported than 100 years ago. So more forests here might just mean fewer forests elsewhere. It would be interesting to see similar maps for other parts of the world.",
                                            "edited": false,
                                            "author_flair_css_class": null,
                                            "collapsed": false,
                                            "author_flair_richtext": [],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>While it&#39;s great to see the forests in europe growing, the map shows that this means we have a lot less farmland here than we did in the past. I&#39;m sure that now a lot more food is being imported than 100 years ago. So more forests here might just mean fewer forests elsewhere. It would be interesting to see similar maps for other parts of the world.</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsme8iu/",
                                            "num_reports": null,
                                            "name": "t1_dsme8iu",
                                            "created": 1515886552,
                                            "author_flair_text": null,
                                            "rte_mode": "markdown",
                                            "created_utc": 1515857752,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 4,
                                            "name": "t1_dsmy0v7",
                                            "id": "dsmy0v7",
                                            "parent_id": "t1_dsm6vn8",
                                            "depth": 1,
                                            "children": [
                                                "dsmy0v7",
                                                "dsmjp9g",
                                                "dsmffcl"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm6vn8",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "Bregvist",
                        "can_mod_post": false,
                        "ups": 352,
                        "parent_id": "t3_7q3wr0",
                        "score": 352,
                        "approved_by": null,
                        "downs": 0,
                        "body": "This makes me happy.",
                        "edited": false,
                        "author_flair_css_class": null,
                        "collapsed": false,
                        "author_flair_richtext": [],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>This makes me happy.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm6vn8/",
                        "num_reports": null,
                        "name": "t1_dsm6vn8",
                        "created": 1515872143,
                        "author_flair_text": null,
                        "rte_mode": "markdown",
                        "created_utc": 1515843343,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "text",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": {
                                                "kind": "Listing",
                                                "data": {
                                                    "after": null,
                                                    "whitelist_status": "all_ads",
                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                    "dist": null,
                                                    "children": [
                                                        {
                                                            "kind": "t1",
                                                            "data": {
                                                                "subreddit_id": "t5_2qh4j",
                                                                "approved_at_utc": null,
                                                                "mod_reason_by": null,
                                                                "banned_by": null,
                                                                "author_flair_type": "text",
                                                                "removal_reason": null,
                                                                "link_id": "t3_7q3wr0",
                                                                "likes": null,
                                                                "replies": {
                                                                    "kind": "Listing",
                                                                    "data": {
                                                                        "after": null,
                                                                        "whitelist_status": "all_ads",
                                                                        "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                        "dist": null,
                                                                        "children": [
                                                                            {
                                                                                "kind": "t1",
                                                                                "data": {
                                                                                    "subreddit_id": "t5_2qh4j",
                                                                                    "approved_at_utc": null,
                                                                                    "mod_reason_by": null,
                                                                                    "banned_by": null,
                                                                                    "author_flair_type": "text",
                                                                                    "removal_reason": null,
                                                                                    "link_id": "t3_7q3wr0",
                                                                                    "likes": null,
                                                                                    "replies": {
                                                                                        "kind": "Listing",
                                                                                        "data": {
                                                                                            "after": null,
                                                                                            "whitelist_status": "all_ads",
                                                                                            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                            "dist": null,
                                                                                            "children": [
                                                                                                {
                                                                                                    "kind": "t1",
                                                                                                    "data": {
                                                                                                        "subreddit_id": "t5_2qh4j",
                                                                                                        "approved_at_utc": null,
                                                                                                        "mod_reason_by": null,
                                                                                                        "banned_by": null,
                                                                                                        "author_flair_type": "text",
                                                                                                        "removal_reason": null,
                                                                                                        "link_id": "t3_7q3wr0",
                                                                                                        "likes": null,
                                                                                                        "replies": {
                                                                                                            "kind": "Listing",
                                                                                                            "data": {
                                                                                                                "after": null,
                                                                                                                "whitelist_status": "all_ads",
                                                                                                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                "dist": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "kind": "more",
                                                                                                                        "data": {
                                                                                                                            "count": 2,
                                                                                                                            "name": "t1_dsmd5ra",
                                                                                                                            "id": "dsmd5ra",
                                                                                                                            "parent_id": "t1_dsm9pbz",
                                                                                                                            "depth": 5,
                                                                                                                            "children": [
                                                                                                                                "dsmd5ra"
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    }
                                                                                                                ],
                                                                                                                "before": null
                                                                                                            }
                                                                                                        },
                                                                                                        "user_reports": [],
                                                                                                        "saved": false,
                                                                                                        "id": "dsm9pbz",
                                                                                                        "banned_at_utc": null,
                                                                                                        "mod_reason_title": null,
                                                                                                        "gilded": 0,
                                                                                                        "archived": false,
                                                                                                        "report_reasons": null,
                                                                                                        "author": "Tankfranker",
                                                                                                        "can_mod_post": false,
                                                                                                        "ups": 14,
                                                                                                        "parent_id": "t1_dsm9i4m",
                                                                                                        "score": 14,
                                                                                                        "approved_by": null,
                                                                                                        "downs": 0,
                                                                                                        "body": "We need to invade the North Sea, that will show em!! ",
                                                                                                        "edited": false,
                                                                                                        "author_flair_css_class": null,
                                                                                                        "collapsed": false,
                                                                                                        "author_flair_richtext": [],
                                                                                                        "is_submitter": false,
                                                                                                        "collapsed_reason": null,
                                                                                                        "body_html": "<div class=\"md\"><p>We need to invade the North Sea, that will show em!! </p>\n</div>",
                                                                                                        "stickied": false,
                                                                                                        "subreddit_type": "public",
                                                                                                        "can_gild": true,
                                                                                                        "subreddit": "europe",
                                                                                                        "author_flair_text_color": null,
                                                                                                        "score_hidden": false,
                                                                                                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9pbz/",
                                                                                                        "num_reports": null,
                                                                                                        "name": "t1_dsm9pbz",
                                                                                                        "created": 1515879022,
                                                                                                        "author_flair_text": null,
                                                                                                        "rte_mode": "markdown",
                                                                                                        "created_utc": 1515850222,
                                                                                                        "subreddit_name_prefixed": "r/europe",
                                                                                                        "controversiality": 0,
                                                                                                        "depth": 4,
                                                                                                        "author_flair_background_color": null,
                                                                                                        "mod_reports": [],
                                                                                                        "mod_note": null,
                                                                                                        "distinguished": null
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "before": null
                                                                                        }
                                                                                    },
                                                                                    "user_reports": [],
                                                                                    "saved": false,
                                                                                    "id": "dsm9i4m",
                                                                                    "banned_at_utc": null,
                                                                                    "mod_reason_title": null,
                                                                                    "gilded": 0,
                                                                                    "archived": false,
                                                                                    "report_reasons": null,
                                                                                    "author": "Sleek_",
                                                                                    "can_mod_post": false,
                                                                                    "ups": 29,
                                                                                    "parent_id": "t1_dsm8m3p",
                                                                                    "score": 29,
                                                                                    "approved_by": null,
                                                                                    "downs": 0,
                                                                                    "body": "Let's build a dam, a big beautiful dam ! And we will call it Waterdam !\n\nAnd North sea will pay for it !",
                                                                                    "edited": false,
                                                                                    "author_flair_css_class": null,
                                                                                    "collapsed": false,
                                                                                    "author_flair_richtext": [],
                                                                                    "is_submitter": false,
                                                                                    "collapsed_reason": null,
                                                                                    "body_html": "<div class=\"md\"><p>Let&#39;s build a dam, a big beautiful dam ! And we will call it Waterdam !</p>\n\n<p>And North sea will pay for it !</p>\n</div>",
                                                                                    "stickied": false,
                                                                                    "subreddit_type": "public",
                                                                                    "can_gild": true,
                                                                                    "subreddit": "europe",
                                                                                    "author_flair_text_color": null,
                                                                                    "score_hidden": false,
                                                                                    "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9i4m/",
                                                                                    "num_reports": null,
                                                                                    "name": "t1_dsm9i4m",
                                                                                    "created": 1515878610,
                                                                                    "author_flair_text": null,
                                                                                    "rte_mode": "markdown",
                                                                                    "created_utc": 1515849810,
                                                                                    "subreddit_name_prefixed": "r/europe",
                                                                                    "controversiality": 0,
                                                                                    "depth": 3,
                                                                                    "author_flair_background_color": null,
                                                                                    "mod_reports": [],
                                                                                    "mod_note": null,
                                                                                    "distinguished": null
                                                                                }
                                                                            },
                                                                            {
                                                                                "kind": "more",
                                                                                "data": {
                                                                                    "count": 2,
                                                                                    "name": "t1_dsmfsf7",
                                                                                    "id": "dsmfsf7",
                                                                                    "parent_id": "t1_dsm8m3p",
                                                                                    "depth": 3,
                                                                                    "children": [
                                                                                        "dsmfsf7"
                                                                                    ]
                                                                                }
                                                                            }
                                                                        ],
                                                                        "before": null
                                                                    }
                                                                },
                                                                "user_reports": [],
                                                                "saved": false,
                                                                "id": "dsm8m3p",
                                                                "banned_at_utc": null,
                                                                "mod_reason_title": null,
                                                                "gilded": 0,
                                                                "archived": false,
                                                                "report_reasons": null,
                                                                "author": "Tankfranker",
                                                                "can_mod_post": false,
                                                                "ups": 49,
                                                                "parent_id": "t1_dsm8i97",
                                                                "score": 49,
                                                                "approved_by": null,
                                                                "downs": 0,
                                                                "body": "Water is our national enemy, those bloody bodies of water trying to invade our lands! ",
                                                                "edited": false,
                                                                "author_flair_css_class": null,
                                                                "collapsed": false,
                                                                "author_flair_richtext": [],
                                                                "is_submitter": false,
                                                                "collapsed_reason": null,
                                                                "body_html": "<div class=\"md\"><p>Water is our national enemy, those bloody bodies of water trying to invade our lands! </p>\n</div>",
                                                                "stickied": false,
                                                                "subreddit_type": "public",
                                                                "can_gild": true,
                                                                "subreddit": "europe",
                                                                "author_flair_text_color": null,
                                                                "score_hidden": false,
                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm8m3p/",
                                                                "num_reports": null,
                                                                "name": "t1_dsm8m3p",
                                                                "created": 1515876612,
                                                                "author_flair_text": null,
                                                                "rte_mode": "markdown",
                                                                "created_utc": 1515847812,
                                                                "subreddit_name_prefixed": "r/europe",
                                                                "controversiality": 0,
                                                                "depth": 2,
                                                                "author_flair_background_color": null,
                                                                "mod_reports": [],
                                                                "mod_note": null,
                                                                "distinguished": null
                                                            }
                                                        },
                                                        {
                                                            "kind": "t1",
                                                            "data": {
                                                                "subreddit_id": "t5_2qh4j",
                                                                "approved_at_utc": null,
                                                                "mod_reason_by": null,
                                                                "banned_by": null,
                                                                "author_flair_type": "richtext",
                                                                "removal_reason": null,
                                                                "link_id": "t3_7q3wr0",
                                                                "likes": null,
                                                                "replies": "",
                                                                "user_reports": [],
                                                                "saved": false,
                                                                "id": "dsm9czq",
                                                                "banned_at_utc": null,
                                                                "mod_reason_title": null,
                                                                "gilded": 0,
                                                                "archived": false,
                                                                "report_reasons": null,
                                                                "author": "itsgonnabeanofromme",
                                                                "can_mod_post": false,
                                                                "ups": 7,
                                                                "parent_id": "t1_dsm8i97",
                                                                "score": 7,
                                                                "approved_by": null,
                                                                "downs": 0,
                                                                "body": "And making Poseidon pay for it. ",
                                                                "edited": false,
                                                                "author_flair_css_class": "NETH",
                                                                "collapsed": false,
                                                                "author_flair_richtext": [
                                                                    {
                                                                        "e": "text",
                                                                        "t": "The Netherlands"
                                                                    }
                                                                ],
                                                                "is_submitter": false,
                                                                "collapsed_reason": null,
                                                                "body_html": "<div class=\"md\"><p>And making Poseidon pay for it. </p>\n</div>",
                                                                "stickied": false,
                                                                "subreddit_type": "public",
                                                                "can_gild": true,
                                                                "subreddit": "europe",
                                                                "author_flair_text_color": null,
                                                                "score_hidden": false,
                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9czq/",
                                                                "num_reports": null,
                                                                "name": "t1_dsm9czq",
                                                                "created": 1515878303,
                                                                "author_flair_text": "The Netherlands",
                                                                "rte_mode": "markdown",
                                                                "created_utc": 1515849503,
                                                                "subreddit_name_prefixed": "r/europe",
                                                                "controversiality": 0,
                                                                "depth": 2,
                                                                "author_flair_background_color": null,
                                                                "mod_reports": [],
                                                                "mod_note": null,
                                                                "distinguished": null
                                                            }
                                                        }
                                                    ],
                                                    "before": null
                                                }
                                            },
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsm8i97",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "Sleek_",
                                            "can_mod_post": false,
                                            "ups": 68,
                                            "parent_id": "t1_dsm6zjo",
                                            "score": 68,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "Drain the swamp !",
                                            "edited": false,
                                            "author_flair_css_class": null,
                                            "collapsed": false,
                                            "author_flair_richtext": [],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>Drain the swamp !</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm8i97/",
                                            "num_reports": null,
                                            "name": "t1_dsm8i97",
                                            "created": 1515876354,
                                            "author_flair_text": null,
                                            "rte_mode": "markdown",
                                            "created_utc": 1515847554,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "richtext",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": "",
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsmbcfa",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "Rediwed",
                                            "can_mod_post": false,
                                            "ups": 10,
                                            "parent_id": "t1_dsm6zjo",
                                            "score": 10,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "Land is like time, if you don't have enough of it you should create more!",
                                            "edited": false,
                                            "author_flair_css_class": "NETH",
                                            "collapsed": false,
                                            "author_flair_richtext": [
                                                {
                                                    "e": "text",
                                                    "t": "The Netherlands"
                                                }
                                            ],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>Land is like time, if you don&#39;t have enough of it you should create more!</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmbcfa/",
                                            "num_reports": null,
                                            "name": "t1_dsmbcfa",
                                            "created": 1515882080,
                                            "author_flair_text": "The Netherlands",
                                            "rte_mode": "markdown",
                                            "created_utc": 1515853280,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 4,
                                            "name": "t1_dsmhwma",
                                            "id": "dsmhwma",
                                            "parent_id": "t1_dsm6zjo",
                                            "depth": 1,
                                            "children": [
                                                "dsmhwma",
                                                "dsmc2rg"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm6zjo",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "Historyissuper",
                        "can_mod_post": false,
                        "ups": 187,
                        "parent_id": "t3_7q3wr0",
                        "score": 187,
                        "approved_by": null,
                        "downs": 0,
                        "body": "I just see the poor water being massacred in Netherlands",
                        "edited": false,
                        "author_flair_css_class": "MRVA",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "Moravia (Czech Rep.)"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>I just see the poor water being massacred in Netherlands</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm6zjo/",
                        "num_reports": null,
                        "name": "t1_dsm6zjo",
                        "created": 1515872441,
                        "author_flair_text": "Moravia (Czech Rep.)",
                        "rte_mode": "markdown",
                        "created_utc": 1515843641,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "text",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "text",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": {
                                                "kind": "Listing",
                                                "data": {
                                                    "after": null,
                                                    "whitelist_status": "all_ads",
                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                    "dist": null,
                                                    "children": [
                                                        {
                                                            "kind": "t1",
                                                            "data": {
                                                                "subreddit_id": "t5_2qh4j",
                                                                "approved_at_utc": null,
                                                                "mod_reason_by": null,
                                                                "banned_by": null,
                                                                "author_flair_type": "text",
                                                                "removal_reason": null,
                                                                "link_id": "t3_7q3wr0",
                                                                "likes": null,
                                                                "replies": {
                                                                    "kind": "Listing",
                                                                    "data": {
                                                                        "after": null,
                                                                        "whitelist_status": "all_ads",
                                                                        "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                        "dist": null,
                                                                        "children": [
                                                                            {
                                                                                "kind": "t1",
                                                                                "data": {
                                                                                    "subreddit_id": "t5_2qh4j",
                                                                                    "approved_at_utc": null,
                                                                                    "mod_reason_by": null,
                                                                                    "banned_by": null,
                                                                                    "author_flair_type": "text",
                                                                                    "removal_reason": null,
                                                                                    "link_id": "t3_7q3wr0",
                                                                                    "likes": null,
                                                                                    "replies": {
                                                                                        "kind": "Listing",
                                                                                        "data": {
                                                                                            "after": null,
                                                                                            "whitelist_status": "all_ads",
                                                                                            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                            "dist": null,
                                                                                            "children": [
                                                                                                {
                                                                                                    "kind": "more",
                                                                                                    "data": {
                                                                                                        "count": 3,
                                                                                                        "name": "t1_dsm9q54",
                                                                                                        "id": "dsm9q54",
                                                                                                        "parent_id": "t1_dsm7n0l",
                                                                                                        "depth": 4,
                                                                                                        "children": [
                                                                                                            "dsm9q54",
                                                                                                            "dsmuoh0"
                                                                                                        ]
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "before": null
                                                                                        }
                                                                                    },
                                                                                    "user_reports": [],
                                                                                    "saved": false,
                                                                                    "id": "dsm7n0l",
                                                                                    "banned_at_utc": null,
                                                                                    "mod_reason_title": null,
                                                                                    "gilded": 0,
                                                                                    "archived": false,
                                                                                    "report_reasons": null,
                                                                                    "author": "JFokkeC",
                                                                                    "can_mod_post": false,
                                                                                    "ups": 7,
                                                                                    "parent_id": "t1_dsm7kxg",
                                                                                    "score": 7,
                                                                                    "approved_by": null,
                                                                                    "downs": 0,
                                                                                    "body": "I think it is, I once googled it, betonstop can't come soon enough, the whole country is turning into a suburb",
                                                                                    "edited": false,
                                                                                    "author_flair_css_class": null,
                                                                                    "collapsed": false,
                                                                                    "author_flair_richtext": [],
                                                                                    "is_submitter": false,
                                                                                    "collapsed_reason": null,
                                                                                    "body_html": "<div class=\"md\"><p>I think it is, I once googled it, betonstop can&#39;t come soon enough, the whole country is turning into a suburb</p>\n</div>",
                                                                                    "stickied": false,
                                                                                    "subreddit_type": "public",
                                                                                    "can_gild": true,
                                                                                    "subreddit": "europe",
                                                                                    "author_flair_text_color": null,
                                                                                    "score_hidden": false,
                                                                                    "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7n0l/",
                                                                                    "num_reports": null,
                                                                                    "name": "t1_dsm7n0l",
                                                                                    "created": 1515874169,
                                                                                    "author_flair_text": null,
                                                                                    "rte_mode": "markdown",
                                                                                    "created_utc": 1515845369,
                                                                                    "subreddit_name_prefixed": "r/europe",
                                                                                    "controversiality": 0,
                                                                                    "depth": 3,
                                                                                    "author_flair_background_color": null,
                                                                                    "mod_reports": [],
                                                                                    "mod_note": null,
                                                                                    "distinguished": null
                                                                                }
                                                                            },
                                                                            {
                                                                                "kind": "more",
                                                                                "data": {
                                                                                    "count": 3,
                                                                                    "name": "t1_dsm8awr",
                                                                                    "id": "dsm8awr",
                                                                                    "parent_id": "t1_dsm7kxg",
                                                                                    "depth": 3,
                                                                                    "children": [
                                                                                        "dsm8awr"
                                                                                    ]
                                                                                }
                                                                            }
                                                                        ],
                                                                        "before": null
                                                                    }
                                                                },
                                                                "user_reports": [],
                                                                "saved": false,
                                                                "id": "dsm7kxg",
                                                                "banned_at_utc": null,
                                                                "mod_reason_title": null,
                                                                "gilded": 0,
                                                                "archived": false,
                                                                "report_reasons": null,
                                                                "author": "SumRegaliss",
                                                                "can_mod_post": false,
                                                                "ups": 12,
                                                                "parent_id": "t1_dsm7icl",
                                                                "score": 12,
                                                                "approved_by": null,
                                                                "downs": 0,
                                                                "body": "Is that the proper English translation of 'lintbebouwing'? I've always wondered how to say that in English. Damn Belgian ribbon building :( It's a disgrace.",
                                                                "edited": false,
                                                                "author_flair_css_class": null,
                                                                "collapsed": false,
                                                                "author_flair_richtext": [],
                                                                "is_submitter": false,
                                                                "collapsed_reason": null,
                                                                "body_html": "<div class=\"md\"><p>Is that the proper English translation of &#39;lintbebouwing&#39;? I&#39;ve always wondered how to say that in English. Damn Belgian ribbon building :( It&#39;s a disgrace.</p>\n</div>",
                                                                "stickied": false,
                                                                "subreddit_type": "public",
                                                                "can_gild": true,
                                                                "subreddit": "europe",
                                                                "author_flair_text_color": null,
                                                                "score_hidden": false,
                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7kxg/",
                                                                "num_reports": null,
                                                                "name": "t1_dsm7kxg",
                                                                "created": 1515874022,
                                                                "author_flair_text": null,
                                                                "rte_mode": "markdown",
                                                                "created_utc": 1515845222,
                                                                "subreddit_name_prefixed": "r/europe",
                                                                "controversiality": 0,
                                                                "depth": 2,
                                                                "author_flair_background_color": null,
                                                                "mod_reports": [],
                                                                "mod_note": null,
                                                                "distinguished": null
                                                            }
                                                        }
                                                    ],
                                                    "before": null
                                                }
                                            },
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsm7icl",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "JFokkeC",
                                            "can_mod_post": false,
                                            "ups": 24,
                                            "parent_id": "t1_dsm6wps",
                                            "score": 24,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "The vegetation is still there, its just hidden behind the ribbon building x(",
                                            "edited": false,
                                            "author_flair_css_class": null,
                                            "collapsed": false,
                                            "author_flair_richtext": [],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>The vegetation is still there, its just hidden behind the ribbon building x(</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7icl/",
                                            "num_reports": null,
                                            "name": "t1_dsm7icl",
                                            "created": 1515873830,
                                            "author_flair_text": null,
                                            "rte_mode": "markdown",
                                            "created_utc": 1515845030,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 12,
                                            "name": "t1_dsmf068",
                                            "id": "dsmf068",
                                            "parent_id": "t1_dsm6wps",
                                            "depth": 1,
                                            "children": [
                                                "dsmf068",
                                                "dsnugz5",
                                                "dsmfe42",
                                                "dsm8umb",
                                                "dsm85xx"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm6wps",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "SumRegaliss",
                        "can_mod_post": false,
                        "ups": 66,
                        "parent_id": "t3_7q3wr0",
                        "score": 66,
                        "approved_by": null,
                        "downs": 0,
                        "body": "Belgium just got more and more towns and less and less vegitation. Why am I not surprised. Damnit Belgium.",
                        "edited": false,
                        "author_flair_css_class": null,
                        "collapsed": false,
                        "author_flair_richtext": [],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>Belgium just got more and more towns and less and less vegitation. Why am I not surprised. Damnit Belgium.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm6wps/",
                        "num_reports": null,
                        "name": "t1_dsm6wps",
                        "created": 1515872230,
                        "author_flair_text": null,
                        "rte_mode": "markdown",
                        "created_utc": 1515843430,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "text",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "richtext",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": {
                                                "kind": "Listing",
                                                "data": {
                                                    "after": null,
                                                    "whitelist_status": "all_ads",
                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                    "dist": null,
                                                    "children": [
                                                        {
                                                            "kind": "t1",
                                                            "data": {
                                                                "subreddit_id": "t5_2qh4j",
                                                                "approved_at_utc": null,
                                                                "mod_reason_by": null,
                                                                "banned_by": null,
                                                                "author_flair_type": "richtext",
                                                                "removal_reason": null,
                                                                "link_id": "t3_7q3wr0",
                                                                "likes": null,
                                                                "replies": {
                                                                    "kind": "Listing",
                                                                    "data": {
                                                                        "after": null,
                                                                        "whitelist_status": "all_ads",
                                                                        "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                        "dist": null,
                                                                        "children": [
                                                                            {
                                                                                "kind": "t1",
                                                                                "data": {
                                                                                    "subreddit_id": "t5_2qh4j",
                                                                                    "approved_at_utc": null,
                                                                                    "mod_reason_by": null,
                                                                                    "banned_by": null,
                                                                                    "author_flair_type": "richtext",
                                                                                    "removal_reason": null,
                                                                                    "link_id": "t3_7q3wr0",
                                                                                    "likes": null,
                                                                                    "replies": {
                                                                                        "kind": "Listing",
                                                                                        "data": {
                                                                                            "after": null,
                                                                                            "whitelist_status": "all_ads",
                                                                                            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                            "dist": null,
                                                                                            "children": [
                                                                                                {
                                                                                                    "kind": "t1",
                                                                                                    "data": {
                                                                                                        "subreddit_id": "t5_2qh4j",
                                                                                                        "approved_at_utc": null,
                                                                                                        "mod_reason_by": null,
                                                                                                        "banned_by": null,
                                                                                                        "author_flair_type": "richtext",
                                                                                                        "removal_reason": null,
                                                                                                        "link_id": "t3_7q3wr0",
                                                                                                        "likes": null,
                                                                                                        "replies": {
                                                                                                            "kind": "Listing",
                                                                                                            "data": {
                                                                                                                "after": null,
                                                                                                                "whitelist_status": "all_ads",
                                                                                                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                "dist": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "kind": "t1",
                                                                                                                        "data": {
                                                                                                                            "subreddit_id": "t5_2qh4j",
                                                                                                                            "approved_at_utc": null,
                                                                                                                            "mod_reason_by": null,
                                                                                                                            "banned_by": null,
                                                                                                                            "author_flair_type": "richtext",
                                                                                                                            "removal_reason": null,
                                                                                                                            "link_id": "t3_7q3wr0",
                                                                                                                            "likes": null,
                                                                                                                            "replies": {
                                                                                                                                "kind": "Listing",
                                                                                                                                "data": {
                                                                                                                                    "after": null,
                                                                                                                                    "whitelist_status": "all_ads",
                                                                                                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                                                                    "dist": null,
                                                                                                                                    "children": [
                                                                                                                                        {
                                                                                                                                            "kind": "t1",
                                                                                                                                            "data": {
                                                                                                                                                "subreddit_id": "t5_2qh4j",
                                                                                                                                                "approved_at_utc": null,
                                                                                                                                                "mod_reason_by": null,
                                                                                                                                                "banned_by": null,
                                                                                                                                                "author_flair_type": "richtext",
                                                                                                                                                "removal_reason": null,
                                                                                                                                                "link_id": "t3_7q3wr0",
                                                                                                                                                "likes": null,
                                                                                                                                                "replies": "",
                                                                                                                                                "user_reports": [],
                                                                                                                                                "saved": false,
                                                                                                                                                "id": "dsmidqn",
                                                                                                                                                "banned_at_utc": null,
                                                                                                                                                "mod_reason_title": null,
                                                                                                                                                "gilded": 0,
                                                                                                                                                "archived": false,
                                                                                                                                                "report_reasons": null,
                                                                                                                                                "author": "harassercat",
                                                                                                                                                "can_mod_post": false,
                                                                                                                                                "ups": 7,
                                                                                                                                                "parent_id": "t1_dsmesdn",
                                                                                                                                                "score": 7,
                                                                                                                                                "approved_by": null,
                                                                                                                                                "downs": 0,
                                                                                                                                                "body": "About 1.3 - 1.5% (growing slowly), but anyway you're right.",
                                                                                                                                                "edited": false,
                                                                                                                                                "author_flair_css_class": "ICEL",
                                                                                                                                                "collapsed": false,
                                                                                                                                                "author_flair_richtext": [
                                                                                                                                                    {
                                                                                                                                                        "e": "text",
                                                                                                                                                        "t": "Iceland"
                                                                                                                                                    }
                                                                                                                                                ],
                                                                                                                                                "is_submitter": false,
                                                                                                                                                "collapsed_reason": null,
                                                                                                                                                "body_html": "<div class=\"md\"><p>About 1.3 - 1.5% (growing slowly), but anyway you&#39;re right.</p>\n</div>",
                                                                                                                                                "stickied": false,
                                                                                                                                                "subreddit_type": "public",
                                                                                                                                                "can_gild": true,
                                                                                                                                                "subreddit": "europe",
                                                                                                                                                "author_flair_text_color": null,
                                                                                                                                                "score_hidden": false,
                                                                                                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmidqn/",
                                                                                                                                                "num_reports": null,
                                                                                                                                                "name": "t1_dsmidqn",
                                                                                                                                                "created": 1515891798,
                                                                                                                                                "author_flair_text": "Iceland",
                                                                                                                                                "rte_mode": "markdown",
                                                                                                                                                "created_utc": 1515862998,
                                                                                                                                                "subreddit_name_prefixed": "r/europe",
                                                                                                                                                "controversiality": 0,
                                                                                                                                                "depth": 6,
                                                                                                                                                "author_flair_background_color": null,
                                                                                                                                                "mod_reports": [],
                                                                                                                                                "mod_note": null,
                                                                                                                                                "distinguished": null
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    ],
                                                                                                                                    "before": null
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "user_reports": [],
                                                                                                                            "saved": false,
                                                                                                                            "id": "dsmesdn",
                                                                                                                            "banned_at_utc": null,
                                                                                                                            "mod_reason_title": null,
                                                                                                                            "gilded": 0,
                                                                                                                            "archived": false,
                                                                                                                            "report_reasons": null,
                                                                                                                            "author": "blubb444",
                                                                                                                            "can_mod_post": false,
                                                                                                                            "ups": 15,
                                                                                                                            "parent_id": "t1_dsme1ft",
                                                                                                                            "score": 15,
                                                                                                                            "approved_by": null,
                                                                                                                            "downs": 0,
                                                                                                                            "body": "Eh, relatively spoken I'd say it is, because right now it's likely less than 1%",
                                                                                                                            "edited": false,
                                                                                                                            "author_flair_css_class": "GERM",
                                                                                                                            "collapsed": false,
                                                                                                                            "author_flair_richtext": [
                                                                                                                                {
                                                                                                                                    "e": "text",
                                                                                                                                    "t": "Germany"
                                                                                                                                }
                                                                                                                            ],
                                                                                                                            "is_submitter": false,
                                                                                                                            "collapsed_reason": null,
                                                                                                                            "body_html": "<div class=\"md\"><p>Eh, relatively spoken I&#39;d say it is, because right now it&#39;s likely less than 1%</p>\n</div>",
                                                                                                                            "stickied": false,
                                                                                                                            "subreddit_type": "public",
                                                                                                                            "can_gild": true,
                                                                                                                            "subreddit": "europe",
                                                                                                                            "author_flair_text_color": null,
                                                                                                                            "score_hidden": false,
                                                                                                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmesdn/",
                                                                                                                            "num_reports": null,
                                                                                                                            "name": "t1_dsmesdn",
                                                                                                                            "created": 1515887302,
                                                                                                                            "author_flair_text": "Germany",
                                                                                                                            "rte_mode": "markdown",
                                                                                                                            "created_utc": 1515858502,
                                                                                                                            "subreddit_name_prefixed": "r/europe",
                                                                                                                            "controversiality": 0,
                                                                                                                            "depth": 5,
                                                                                                                            "author_flair_background_color": null,
                                                                                                                            "mod_reports": [],
                                                                                                                            "mod_note": null,
                                                                                                                            "distinguished": null
                                                                                                                        }
                                                                                                                    }
                                                                                                                ],
                                                                                                                "before": null
                                                                                                            }
                                                                                                        },
                                                                                                        "user_reports": [],
                                                                                                        "saved": false,
                                                                                                        "id": "dsme1ft",
                                                                                                        "banned_at_utc": null,
                                                                                                        "mod_reason_title": null,
                                                                                                        "gilded": 0,
                                                                                                        "archived": false,
                                                                                                        "report_reasons": null,
                                                                                                        "author": "Steinson",
                                                                                                        "can_mod_post": false,
                                                                                                        "ups": 9,
                                                                                                        "parent_id": "t1_dsmd33l",
                                                                                                        "score": 9,
                                                                                                        "approved_by": null,
                                                                                                        "downs": 0,
                                                                                                        "body": "That’s still not very much",
                                                                                                        "edited": false,
                                                                                                        "author_flair_css_class": "SWED",
                                                                                                        "collapsed": false,
                                                                                                        "author_flair_richtext": [
                                                                                                            {
                                                                                                                "e": "text",
                                                                                                                "t": "Sweden"
                                                                                                            }
                                                                                                        ],
                                                                                                        "is_submitter": false,
                                                                                                        "collapsed_reason": null,
                                                                                                        "body_html": "<div class=\"md\"><p>That’s still not very much</p>\n</div>",
                                                                                                        "stickied": false,
                                                                                                        "subreddit_type": "public",
                                                                                                        "can_gild": true,
                                                                                                        "subreddit": "europe",
                                                                                                        "author_flair_text_color": "dark",
                                                                                                        "score_hidden": false,
                                                                                                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsme1ft/",
                                                                                                        "num_reports": null,
                                                                                                        "name": "t1_dsme1ft",
                                                                                                        "created": 1515886277,
                                                                                                        "author_flair_text": "Sweden",
                                                                                                        "rte_mode": "markdown",
                                                                                                        "created_utc": 1515857477,
                                                                                                        "subreddit_name_prefixed": "r/europe",
                                                                                                        "controversiality": 0,
                                                                                                        "depth": 4,
                                                                                                        "author_flair_background_color": "",
                                                                                                        "mod_reports": [],
                                                                                                        "mod_note": null,
                                                                                                        "distinguished": null
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "before": null
                                                                                        }
                                                                                    },
                                                                                    "user_reports": [],
                                                                                    "saved": false,
                                                                                    "id": "dsmd33l",
                                                                                    "banned_at_utc": null,
                                                                                    "mod_reason_title": null,
                                                                                    "gilded": 0,
                                                                                    "archived": false,
                                                                                    "report_reasons": null,
                                                                                    "author": "blubb444",
                                                                                    "can_mod_post": false,
                                                                                    "ups": 21,
                                                                                    "parent_id": "t1_dsmcdlo",
                                                                                    "score": 21,
                                                                                    "approved_by": null,
                                                                                    "downs": 0,
                                                                                    "body": "Before it was settled, it's assumed that it was actually covered by forests up to 25%. ",
                                                                                    "edited": false,
                                                                                    "author_flair_css_class": "GERM",
                                                                                    "collapsed": false,
                                                                                    "author_flair_richtext": [
                                                                                        {
                                                                                            "e": "text",
                                                                                            "t": "Germany"
                                                                                        }
                                                                                    ],
                                                                                    "is_submitter": false,
                                                                                    "collapsed_reason": null,
                                                                                    "body_html": "<div class=\"md\"><p>Before it was settled, it&#39;s assumed that it was actually covered by forests up to 25%. </p>\n</div>",
                                                                                    "stickied": false,
                                                                                    "subreddit_type": "public",
                                                                                    "can_gild": true,
                                                                                    "subreddit": "europe",
                                                                                    "author_flair_text_color": null,
                                                                                    "score_hidden": false,
                                                                                    "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmd33l/",
                                                                                    "num_reports": null,
                                                                                    "name": "t1_dsmd33l",
                                                                                    "created": 1515884887,
                                                                                    "author_flair_text": "Germany",
                                                                                    "rte_mode": "markdown",
                                                                                    "created_utc": 1515856087,
                                                                                    "subreddit_name_prefixed": "r/europe",
                                                                                    "controversiality": 0,
                                                                                    "depth": 3,
                                                                                    "author_flair_background_color": null,
                                                                                    "mod_reports": [],
                                                                                    "mod_note": null,
                                                                                    "distinguished": null
                                                                                }
                                                                            },
                                                                            {
                                                                                "kind": "t1",
                                                                                "data": {
                                                                                    "subreddit_id": "t5_2qh4j",
                                                                                    "approved_at_utc": null,
                                                                                    "mod_reason_by": null,
                                                                                    "banned_by": null,
                                                                                    "author_flair_type": "richtext",
                                                                                    "removal_reason": null,
                                                                                    "link_id": "t3_7q3wr0",
                                                                                    "likes": null,
                                                                                    "replies": {
                                                                                        "kind": "Listing",
                                                                                        "data": {
                                                                                            "after": null,
                                                                                            "whitelist_status": "all_ads",
                                                                                            "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                                            "dist": null,
                                                                                            "children": [
                                                                                                {
                                                                                                    "kind": "more",
                                                                                                    "data": {
                                                                                                        "count": 2,
                                                                                                        "name": "t1_dsmxh1x",
                                                                                                        "id": "dsmxh1x",
                                                                                                        "parent_id": "t1_dsmiavn",
                                                                                                        "depth": 4,
                                                                                                        "children": [
                                                                                                            "dsmxh1x"
                                                                                                        ]
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "before": null
                                                                                        }
                                                                                    },
                                                                                    "user_reports": [],
                                                                                    "saved": false,
                                                                                    "id": "dsmiavn",
                                                                                    "banned_at_utc": null,
                                                                                    "mod_reason_title": null,
                                                                                    "gilded": 0,
                                                                                    "archived": false,
                                                                                    "report_reasons": null,
                                                                                    "author": "harassercat",
                                                                                    "can_mod_post": false,
                                                                                    "ups": 10,
                                                                                    "parent_id": "t1_dsmcdlo",
                                                                                    "score": 10,
                                                                                    "approved_by": null,
                                                                                    "downs": 0,
                                                                                    "body": "That's false, Iceland can grow trees just fine. The country is deforested for the same historical reason as other countries: farming, specifically very extensive pastoral farming.",
                                                                                    "edited": false,
                                                                                    "author_flair_css_class": "ICEL",
                                                                                    "collapsed": false,
                                                                                    "author_flair_richtext": [
                                                                                        {
                                                                                            "e": "text",
                                                                                            "t": "Iceland"
                                                                                        }
                                                                                    ],
                                                                                    "is_submitter": false,
                                                                                    "collapsed_reason": null,
                                                                                    "body_html": "<div class=\"md\"><p>That&#39;s false, Iceland can grow trees just fine. The country is deforested for the same historical reason as other countries: farming, specifically very extensive pastoral farming.</p>\n</div>",
                                                                                    "stickied": false,
                                                                                    "subreddit_type": "public",
                                                                                    "can_gild": true,
                                                                                    "subreddit": "europe",
                                                                                    "author_flair_text_color": null,
                                                                                    "score_hidden": false,
                                                                                    "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmiavn/",
                                                                                    "num_reports": null,
                                                                                    "name": "t1_dsmiavn",
                                                                                    "created": 1515891702,
                                                                                    "author_flair_text": "Iceland",
                                                                                    "rte_mode": "markdown",
                                                                                    "created_utc": 1515862902,
                                                                                    "subreddit_name_prefixed": "r/europe",
                                                                                    "controversiality": 0,
                                                                                    "depth": 3,
                                                                                    "author_flair_background_color": null,
                                                                                    "mod_reports": [],
                                                                                    "mod_note": null,
                                                                                    "distinguished": null
                                                                                }
                                                                            }
                                                                        ],
                                                                        "before": null
                                                                    }
                                                                },
                                                                "user_reports": [],
                                                                "saved": false,
                                                                "id": "dsmcdlo",
                                                                "banned_at_utc": null,
                                                                "mod_reason_title": null,
                                                                "gilded": 0,
                                                                "archived": false,
                                                                "report_reasons": null,
                                                                "author": "Steinson",
                                                                "can_mod_post": false,
                                                                "ups": 20,
                                                                "parent_id": "t1_dsmc6zq",
                                                                "score": 20,
                                                                "approved_by": null,
                                                                "downs": 0,
                                                                "body": "And Iceland can barely even grow trees, so they don’t really count",
                                                                "edited": false,
                                                                "author_flair_css_class": "SWED",
                                                                "collapsed": false,
                                                                "author_flair_richtext": [
                                                                    {
                                                                        "e": "text",
                                                                        "t": "Sweden"
                                                                    }
                                                                ],
                                                                "is_submitter": false,
                                                                "collapsed_reason": null,
                                                                "body_html": "<div class=\"md\"><p>And Iceland can barely even grow trees, so they don’t really count</p>\n</div>",
                                                                "stickied": false,
                                                                "subreddit_type": "public",
                                                                "can_gild": true,
                                                                "subreddit": "europe",
                                                                "author_flair_text_color": "dark",
                                                                "score_hidden": false,
                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmcdlo/",
                                                                "num_reports": null,
                                                                "name": "t1_dsmcdlo",
                                                                "created": 1515883786,
                                                                "author_flair_text": "Sweden",
                                                                "rte_mode": "markdown",
                                                                "created_utc": 1515854986,
                                                                "subreddit_name_prefixed": "r/europe",
                                                                "controversiality": 0,
                                                                "depth": 2,
                                                                "author_flair_background_color": "",
                                                                "mod_reports": [],
                                                                "mod_note": null,
                                                                "distinguished": null
                                                            }
                                                        },
                                                        {
                                                            "kind": "more",
                                                            "data": {
                                                                "count": 7,
                                                                "name": "t1_dsmxqw2",
                                                                "id": "dsmxqw2",
                                                                "parent_id": "t1_dsmc6zq",
                                                                "depth": 2,
                                                                "children": [
                                                                    "dsmxqw2",
                                                                    "dsmx267"
                                                                ]
                                                            }
                                                        }
                                                    ],
                                                    "before": null
                                                }
                                            },
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsmc6zq",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "Halbaras",
                                            "can_mod_post": false,
                                            "ups": 28,
                                            "parent_id": "t1_dsm9qyu",
                                            "score": 28,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "Sadly, Britain is still one of the most deforested places in Europe even with the plantations. Only the Netherlands, Iceland and Ireland beat us. ",
                                            "edited": false,
                                            "author_flair_css_class": "SCOT",
                                            "collapsed": false,
                                            "author_flair_richtext": [
                                                {
                                                    "e": "text",
                                                    "t": "Make Sealand Great Again!"
                                                }
                                            ],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>Sadly, Britain is still one of the most deforested places in Europe even with the plantations. Only the Netherlands, Iceland and Ireland beat us. </p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmc6zq/",
                                            "num_reports": null,
                                            "name": "t1_dsmc6zq",
                                            "created": 1515883492,
                                            "author_flair_text": "Make Sealand Great Again!",
                                            "rte_mode": "markdown",
                                            "created_utc": 1515854692,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 4,
                                            "name": "t1_dsm9wny",
                                            "id": "dsm9wny",
                                            "parent_id": "t1_dsm9qyu",
                                            "depth": 1,
                                            "children": [
                                                "dsm9wny",
                                                "dsmc89j"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm9qyu",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "rascar26",
                        "can_mod_post": false,
                        "ups": 51,
                        "parent_id": "t3_7q3wr0",
                        "score": 51,
                        "approved_by": null,
                        "downs": 0,
                        "body": "In a UK context, most of that growth is from conifer plantations, which from a ecological point of view are far less biodiverse than older growth forests (generally oak and beech woodland in England and Scots pine forest in Scotland).\n\nIt's better than nothing, and conifer planatations that used to be ancient woodland can be reverted over time as they will still hold more woodland plants than arable fields.",
                        "edited": false,
                        "author_flair_css_class": null,
                        "collapsed": false,
                        "author_flair_richtext": [],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>In a UK context, most of that growth is from conifer plantations, which from a ecological point of view are far less biodiverse than older growth forests (generally oak and beech woodland in England and Scots pine forest in Scotland).</p>\n\n<p>It&#39;s better than nothing, and conifer planatations that used to be ancient woodland can be reverted over time as they will still hold more woodland plants than arable fields.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9qyu/",
                        "num_reports": null,
                        "name": "t1_dsm9qyu",
                        "created": 1515879116,
                        "author_flair_text": null,
                        "rte_mode": "markdown",
                        "created_utc": 1515850316,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "text",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": {
                                                "kind": "Listing",
                                                "data": {
                                                    "after": null,
                                                    "whitelist_status": "all_ads",
                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                    "dist": null,
                                                    "children": [
                                                        {
                                                            "kind": "t1",
                                                            "data": {
                                                                "subreddit_id": "t5_2qh4j",
                                                                "approved_at_utc": null,
                                                                "mod_reason_by": null,
                                                                "banned_by": null,
                                                                "author_flair_type": "richtext",
                                                                "removal_reason": null,
                                                                "link_id": "t3_7q3wr0",
                                                                "likes": null,
                                                                "replies": "",
                                                                "user_reports": [],
                                                                "saved": false,
                                                                "id": "dsmdxsz",
                                                                "banned_at_utc": null,
                                                                "mod_reason_title": null,
                                                                "gilded": 0,
                                                                "archived": false,
                                                                "report_reasons": null,
                                                                "author": "McDutchy",
                                                                "can_mod_post": false,
                                                                "ups": 8,
                                                                "parent_id": "t1_dsmdc1m",
                                                                "score": 8,
                                                                "approved_by": null,
                                                                "downs": 0,
                                                                "body": "The problem is the scale of the forest fires and the arid conditions. The ecosystems might not get time to recover. Small controllable forest fires indeed do generally bring benefits in the longer term.",
                                                                "edited": false,
                                                                "author_flair_css_class": "NETH",
                                                                "collapsed": false,
                                                                "author_flair_richtext": [
                                                                    {
                                                                        "e": "text",
                                                                        "t": "The Netherlands"
                                                                    }
                                                                ],
                                                                "is_submitter": false,
                                                                "collapsed_reason": null,
                                                                "body_html": "<div class=\"md\"><p>The problem is the scale of the forest fires and the arid conditions. The ecosystems might not get time to recover. Small controllable forest fires indeed do generally bring benefits in the longer term.</p>\n</div>",
                                                                "stickied": false,
                                                                "subreddit_type": "public",
                                                                "can_gild": true,
                                                                "subreddit": "europe",
                                                                "author_flair_text_color": null,
                                                                "score_hidden": false,
                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmdxsz/",
                                                                "num_reports": null,
                                                                "name": "t1_dsmdxsz",
                                                                "created": 1515886135,
                                                                "author_flair_text": "The Netherlands",
                                                                "rte_mode": "markdown",
                                                                "created_utc": 1515857335,
                                                                "subreddit_name_prefixed": "r/europe",
                                                                "controversiality": 0,
                                                                "depth": 2,
                                                                "author_flair_background_color": null,
                                                                "mod_reports": [],
                                                                "mod_note": null,
                                                                "distinguished": null
                                                            }
                                                        },
                                                        {
                                                            "kind": "more",
                                                            "data": {
                                                                "count": 3,
                                                                "name": "t1_dsmf42u",
                                                                "id": "dsmf42u",
                                                                "parent_id": "t1_dsmdc1m",
                                                                "depth": 2,
                                                                "children": [
                                                                    "dsmf42u",
                                                                    "dsmdpav"
                                                                ]
                                                            }
                                                        }
                                                    ],
                                                    "before": null
                                                }
                                            },
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsmdc1m",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "Craishton",
                                            "can_mod_post": false,
                                            "ups": 12,
                                            "parent_id": "t1_dsm7ta5",
                                            "score": 12,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "Well, forest fires can be good for the long term health of the forest.",
                                            "edited": false,
                                            "author_flair_css_class": null,
                                            "collapsed": false,
                                            "author_flair_richtext": [],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>Well, forest fires can be good for the long term health of the forest.</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmdc1m/",
                                            "num_reports": null,
                                            "name": "t1_dsmdc1m",
                                            "created": 1515885259,
                                            "author_flair_text": null,
                                            "rte_mode": "markdown",
                                            "created_utc": 1515856459,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "text",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": "",
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsm8ky5",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "Sleek_",
                                            "can_mod_post": false,
                                            "ups": 17,
                                            "parent_id": "t1_dsm7ta5",
                                            "score": 17,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "Condoleances for your loss of lives and forests.",
                                            "edited": false,
                                            "author_flair_css_class": null,
                                            "collapsed": false,
                                            "author_flair_richtext": [],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>Condoleances for your loss of lives and forests.</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm8ky5/",
                                            "num_reports": null,
                                            "name": "t1_dsm8ky5",
                                            "created": 1515876535,
                                            "author_flair_text": null,
                                            "rte_mode": "markdown",
                                            "created_utc": 1515847735,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 3,
                                            "name": "t1_dsmeuo8",
                                            "id": "dsmeuo8",
                                            "parent_id": "t1_dsm7ta5",
                                            "depth": 1,
                                            "children": [
                                                "dsmeuo8"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm7ta5",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "PedsBeast",
                        "can_mod_post": false,
                        "ups": 27,
                        "parent_id": "t3_7q3wr0",
                        "score": 27,
                        "approved_by": null,
                        "downs": 0,
                        "body": "Well, not last year for us. FeelsBadMan",
                        "edited": false,
                        "author_flair_css_class": "PORT",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "Portugal"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>Well, not last year for us. FeelsBadMan</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7ta5/",
                        "num_reports": null,
                        "name": "t1_dsm7ta5",
                        "created": 1515874623,
                        "author_flair_text": "Portugal",
                        "rte_mode": "markdown",
                        "created_utc": 1515845823,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "richtext",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": {
                                                "kind": "Listing",
                                                "data": {
                                                    "after": null,
                                                    "whitelist_status": "all_ads",
                                                    "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                    "dist": null,
                                                    "children": [
                                                        {
                                                            "kind": "t1",
                                                            "data": {
                                                                "subreddit_id": "t5_2qh4j",
                                                                "approved_at_utc": null,
                                                                "mod_reason_by": null,
                                                                "banned_by": null,
                                                                "author_flair_type": "richtext",
                                                                "removal_reason": null,
                                                                "link_id": "t3_7q3wr0",
                                                                "likes": null,
                                                                "replies": {
                                                                    "kind": "Listing",
                                                                    "data": {
                                                                        "after": null,
                                                                        "whitelist_status": "all_ads",
                                                                        "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                                                        "dist": null,
                                                                        "children": [
                                                                            {
                                                                                "kind": "more",
                                                                                "data": {
                                                                                    "count": 3,
                                                                                    "name": "t1_dsmxw50",
                                                                                    "id": "dsmxw50",
                                                                                    "parent_id": "t1_dsmexmr",
                                                                                    "depth": 3,
                                                                                    "children": [
                                                                                        "dsmxw50"
                                                                                    ]
                                                                                }
                                                                            }
                                                                        ],
                                                                        "before": null
                                                                    }
                                                                },
                                                                "user_reports": [],
                                                                "saved": false,
                                                                "id": "dsmexmr",
                                                                "banned_at_utc": null,
                                                                "mod_reason_title": null,
                                                                "gilded": 0,
                                                                "archived": false,
                                                                "report_reasons": null,
                                                                "author": "NegroDeLanusEnLorena",
                                                                "can_mod_post": false,
                                                                "ups": 9,
                                                                "parent_id": "t1_dsm972f",
                                                                "score": 9,
                                                                "approved_by": null,
                                                                "downs": 0,
                                                                "body": "So celts started deforestation? ",
                                                                "edited": false,
                                                                "author_flair_css_class": "FR-LORR",
                                                                "collapsed": false,
                                                                "author_flair_richtext": [
                                                                    {
                                                                        "e": "text",
                                                                        "t": "Lorraine (France)"
                                                                    }
                                                                ],
                                                                "is_submitter": false,
                                                                "collapsed_reason": null,
                                                                "body_html": "<div class=\"md\"><p>So celts started deforestation? </p>\n</div>",
                                                                "stickied": false,
                                                                "subreddit_type": "public",
                                                                "can_gild": true,
                                                                "subreddit": "europe",
                                                                "author_flair_text_color": "dark",
                                                                "score_hidden": false,
                                                                "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmexmr/",
                                                                "num_reports": null,
                                                                "name": "t1_dsmexmr",
                                                                "created": 1515887497,
                                                                "author_flair_text": "Lorraine (France)",
                                                                "rte_mode": "markdown",
                                                                "created_utc": 1515858697,
                                                                "subreddit_name_prefixed": "r/europe",
                                                                "controversiality": 0,
                                                                "depth": 2,
                                                                "author_flair_background_color": "",
                                                                "mod_reports": [],
                                                                "mod_note": null,
                                                                "distinguished": null
                                                            }
                                                        }
                                                    ],
                                                    "before": null
                                                }
                                            },
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsm972f",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "Airstuff",
                                            "can_mod_post": false,
                                            "ups": 29,
                                            "parent_id": "t1_dsm80hj",
                                            "score": 29,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "France nowadays has more trees than during the roman conquest !",
                                            "edited": false,
                                            "author_flair_css_class": "EURO",
                                            "collapsed": false,
                                            "author_flair_richtext": [
                                                {
                                                    "e": "text",
                                                    "t": "Europe"
                                                }
                                            ],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>France nowadays has more trees than during the roman conquest !</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": "light",
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm972f/",
                                            "num_reports": null,
                                            "name": "t1_dsm972f",
                                            "created": 1515877949,
                                            "author_flair_text": "Europe",
                                            "rte_mode": "markdown",
                                            "created_utc": 1515849149,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": "#003399",
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 1,
                                            "name": "t1_dsm8xyl",
                                            "id": "dsm8xyl",
                                            "parent_id": "t1_dsm80hj",
                                            "depth": 1,
                                            "children": [
                                                "dsm8xyl"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm80hj",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "Volesprit31",
                        "can_mod_post": false,
                        "ups": 24,
                        "parent_id": "t3_7q3wr0",
                        "score": 24,
                        "approved_by": null,
                        "downs": 0,
                        "body": "I learnt that during the middle ages, France was just a huge field. That's nice to see it growing back!",
                        "edited": false,
                        "author_flair_css_class": "FR-RHAL",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "Rhône-Alpes (France)"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>I learnt that during the middle ages, France was just a huge field. That&#39;s nice to see it growing back!</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm80hj/",
                        "num_reports": null,
                        "name": "t1_dsm80hj",
                        "created": 1515875134,
                        "author_flair_text": "Rhône-Alpes (France)",
                        "rte_mode": "markdown",
                        "created_utc": 1515846334,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": "",
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm71g7",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "zzzzzzzzzzzzzzzzspaf",
                        "can_mod_post": false,
                        "ups": 37,
                        "parent_id": "t3_7q3wr0",
                        "score": 37,
                        "approved_by": null,
                        "downs": 0,
                        "body": "that's a really intresting gif\n\n[direct link to the gif for the lazy](https://img.washingtonpost.com/pbox.php?url=https://www.washingtonpost.com/blogs/worldviews/files/2014/12/land-changes-1900-2010-forward_50perc_res.gif&op=noop)\n",
                        "edited": false,
                        "author_flair_css_class": "BELG",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "Belgium"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>that&#39;s a really intresting gif</p>\n\n<p><a href=\"https://img.washingtonpost.com/pbox.php?url=https://www.washingtonpost.com/blogs/worldviews/files/2014/12/land-changes-1900-2010-forward_50perc_res.gif&amp;op=noop\">direct link to the gif for the lazy</a></p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm71g7/",
                        "num_reports": null,
                        "name": "t1_dsm71g7",
                        "created": 1515872586,
                        "author_flair_text": "Belgium",
                        "rte_mode": "markdown",
                        "created_utc": 1515843786,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "text",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": "",
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsm80ti",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "PrincipledProphet",
                                            "can_mod_post": false,
                                            "ups": 31,
                                            "parent_id": "t1_dsm7cmq",
                                            "score": 31,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "But that ikea furniture tho",
                                            "edited": false,
                                            "author_flair_css_class": null,
                                            "collapsed": false,
                                            "author_flair_richtext": [],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>But that ikea furniture tho</p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm80ti/",
                                            "num_reports": null,
                                            "name": "t1_dsm80ti",
                                            "created": 1515875158,
                                            "author_flair_text": null,
                                            "rte_mode": "markdown",
                                            "created_utc": 1515846358,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 3,
                                            "name": "t1_dsm8v1d",
                                            "id": "dsm8v1d",
                                            "parent_id": "t1_dsm7cmq",
                                            "depth": 1,
                                            "children": [
                                                "dsm8v1d"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm7cmq",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "Yrvaa",
                        "can_mod_post": false,
                        "ups": 27,
                        "parent_id": "t3_7q3wr0",
                        "score": 27,
                        "approved_by": null,
                        "downs": 0,
                        "body": "Except for Romania. where rampart theft, corruption and illegal cutting has seemed destroy the forest for most part.",
                        "edited": false,
                        "author_flair_css_class": "EURO",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "Europe"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>Except for Romania. where rampart theft, corruption and illegal cutting has seemed destroy the forest for most part.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm7cmq/",
                        "num_reports": null,
                        "name": "t1_dsm7cmq",
                        "created": 1515873416,
                        "author_flair_text": "Europe",
                        "rte_mode": "markdown",
                        "created_utc": 1515844616,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "text",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 1,
                                            "name": "t1_dsmk9m2",
                                            "id": "dsmk9m2",
                                            "parent_id": "t1_dsmayxe",
                                            "depth": 1,
                                            "children": [
                                                "dsmk9m2"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsmayxe",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "flarpblarp",
                        "can_mod_post": false,
                        "ups": 12,
                        "parent_id": "t3_7q3wr0",
                        "score": 12,
                        "approved_by": null,
                        "downs": 0,
                        "body": "I was unaware that forest coverage had actually been increasing. \n\nDoes anyone know about the quality of these forests though? Is the newer growth all uniformly planted for logging, or are we getting back forests that can support a greater biodiversity?",
                        "edited": false,
                        "author_flair_css_class": null,
                        "collapsed": false,
                        "author_flair_richtext": [],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>I was unaware that forest coverage had actually been increasing. </p>\n\n<p>Does anyone know about the quality of these forests though? Is the newer growth all uniformly planted for logging, or are we getting back forests that can support a greater biodiversity?</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmayxe/",
                        "num_reports": null,
                        "name": "t1_dsmayxe",
                        "created": 1515881428,
                        "author_flair_text": null,
                        "rte_mode": "markdown",
                        "created_utc": 1515852628,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "t1",
                                        "data": {
                                            "subreddit_id": "t5_2qh4j",
                                            "approved_at_utc": null,
                                            "mod_reason_by": null,
                                            "banned_by": null,
                                            "author_flair_type": "richtext",
                                            "removal_reason": null,
                                            "link_id": "t3_7q3wr0",
                                            "likes": null,
                                            "replies": "",
                                            "user_reports": [],
                                            "saved": false,
                                            "id": "dsmov9p",
                                            "banned_at_utc": null,
                                            "mod_reason_title": null,
                                            "gilded": 0,
                                            "archived": false,
                                            "report_reasons": null,
                                            "author": "4_5_6",
                                            "can_mod_post": false,
                                            "ups": 13,
                                            "parent_id": "t1_dsm9440",
                                            "score": 13,
                                            "approved_by": null,
                                            "downs": 0,
                                            "body": "I'd say it's emptier today in the sense that areas that used to have large rural populations are now empty due to the growth of cities. ",
                                            "edited": false,
                                            "author_flair_css_class": "IREL",
                                            "collapsed": false,
                                            "author_flair_richtext": [
                                                {
                                                    "e": "text",
                                                    "t": "Ireland"
                                                }
                                            ],
                                            "is_submitter": false,
                                            "collapsed_reason": null,
                                            "body_html": "<div class=\"md\"><p>I&#39;d say it&#39;s emptier today in the sense that areas that used to have large rural populations are now empty due to the growth of cities. </p>\n</div>",
                                            "stickied": false,
                                            "subreddit_type": "public",
                                            "can_gild": true,
                                            "subreddit": "europe",
                                            "author_flair_text_color": null,
                                            "score_hidden": false,
                                            "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmov9p/",
                                            "num_reports": null,
                                            "name": "t1_dsmov9p",
                                            "created": 1515899279,
                                            "author_flair_text": "Ireland",
                                            "rte_mode": "markdown",
                                            "created_utc": 1515870479,
                                            "subreddit_name_prefixed": "r/europe",
                                            "controversiality": 0,
                                            "depth": 1,
                                            "author_flair_background_color": null,
                                            "mod_reports": [],
                                            "mod_note": null,
                                            "distinguished": null
                                        }
                                    },
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 2,
                                            "name": "t1_dsn0ew2",
                                            "id": "dsn0ew2",
                                            "parent_id": "t1_dsm9440",
                                            "depth": 1,
                                            "children": [
                                                "dsn0ew2"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm9440",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "kodalife",
                        "can_mod_post": false,
                        "ups": 12,
                        "parent_id": "t3_7q3wr0",
                        "score": 12,
                        "approved_by": null,
                        "downs": 0,
                        "body": "It's interesting to see how empty Europe was 100 years ago.",
                        "edited": false,
                        "author_flair_css_class": "NETH",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "The Netherlands"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>It&#39;s interesting to see how empty Europe was 100 years ago.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9440/",
                        "num_reports": null,
                        "name": "t1_dsm9440",
                        "created": 1515877770,
                        "author_flair_text": "The Netherlands",
                        "rte_mode": "markdown",
                        "created_utc": 1515848970,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 4,
                                            "name": "t1_dsmgmkz",
                                            "id": "dsmgmkz",
                                            "parent_id": "t1_dsmawp2",
                                            "depth": 1,
                                            "children": [
                                                "dsmgmkz",
                                                "dsmg8x9",
                                                "dsmljni"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsmawp2",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "lEatSand",
                        "can_mod_post": false,
                        "ups": 19,
                        "parent_id": "t3_7q3wr0",
                        "score": 19,
                        "approved_by": null,
                        "downs": 0,
                        "body": "We are Europeans too God dammit. ",
                        "edited": false,
                        "author_flair_css_class": "NORW",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "Norway"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>We are Europeans too God dammit. </p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmawp2/",
                        "num_reports": null,
                        "name": "t1_dsmawp2",
                        "created": 1515881315,
                        "author_flair_text": "Norway",
                        "rte_mode": "markdown",
                        "created_utc": 1515852515,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": "",
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm98dc",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "YoSoyUnPayaso",
                        "can_mod_post": false,
                        "ups": 9,
                        "parent_id": "t3_7q3wr0",
                        "score": 9,
                        "approved_by": null,
                        "downs": 0,
                        "body": "Awesome! It's also going well with much of European wildlife. Bears, Lynxes, Wolves and Wolverines are all in the lift in Europe. Populations of Eurasian Beaver has increased by 53000% over the last century, White-tailed Eagles are expanding all over Europe, European Bison roam the plains in a dozen countries again. Lets hope this trend continues! Check out [this publication](https://www.rewildingeurope.com/news/wildlife-comeback-in-europe-study-released/) for more info.",
                        "edited": false,
                        "author_flair_css_class": "NETH",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "The Netherlands"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>Awesome! It&#39;s also going well with much of European wildlife. Bears, Lynxes, Wolves and Wolverines are all in the lift in Europe. Populations of Eurasian Beaver has increased by 53000% over the last century, White-tailed Eagles are expanding all over Europe, European Bison roam the plains in a dozen countries again. Lets hope this trend continues! Check out <a href=\"https://www.rewildingeurope.com/news/wildlife-comeback-in-europe-study-released/\">this publication</a> for more info.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm98dc/",
                        "num_reports": null,
                        "name": "t1_dsm98dc",
                        "created": 1515878031,
                        "author_flair_text": "The Netherlands",
                        "rte_mode": "markdown",
                        "created_utc": 1515849231,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "text",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 6,
                                            "name": "t1_dsm9vd7",
                                            "id": "dsm9vd7",
                                            "parent_id": "t1_dsm9l34",
                                            "depth": 1,
                                            "children": [
                                                "dsm9vd7",
                                                "dsnqr5h",
                                                "dsmcsr3"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsm9l34",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "Keurnaonsia",
                        "can_mod_post": false,
                        "ups": 18,
                        "parent_id": "t3_7q3wr0",
                        "score": 18,
                        "approved_by": null,
                        "downs": 0,
                        "body": "You mean the western part of Europe? Because in Romania for example the forests are shrinking very fast with the help of Austrian logging companies.",
                        "edited": false,
                        "author_flair_css_class": null,
                        "collapsed": false,
                        "author_flair_richtext": [],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>You mean the western part of Europe? Because in Romania for example the forests are shrinking very fast with the help of Austrian logging companies.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsm9l34/",
                        "num_reports": null,
                        "name": "t1_dsm9l34",
                        "created": 1515878781,
                        "author_flair_text": null,
                        "rte_mode": "markdown",
                        "created_utc": 1515849981,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "text",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 1,
                                            "name": "t1_dsmf12u",
                                            "id": "dsmf12u",
                                            "parent_id": "t1_dsma8fs",
                                            "depth": 1,
                                            "children": [
                                                "dsmf12u"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsma8fs",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "Doggettx",
                        "can_mod_post": false,
                        "ups": 7,
                        "parent_id": "t3_7q3wr0",
                        "score": 7,
                        "approved_by": null,
                        "downs": 0,
                        "body": "Most people don't realize this but increased CO2 levels is actually good for trees/plants, just less so for humans.",
                        "edited": false,
                        "author_flair_css_class": null,
                        "collapsed": false,
                        "author_flair_richtext": [],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p>Most people don&#39;t realize this but increased CO2 levels is actually good for trees/plants, just less so for humans.</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsma8fs/",
                        "num_reports": null,
                        "name": "t1_dsma8fs",
                        "created": 1515880053,
                        "author_flair_text": null,
                        "rte_mode": "markdown",
                        "created_utc": 1515851253,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "t1",
                    "data": {
                        "subreddit_id": "t5_2qh4j",
                        "approved_at_utc": null,
                        "mod_reason_by": null,
                        "banned_by": null,
                        "author_flair_type": "richtext",
                        "removal_reason": null,
                        "link_id": "t3_7q3wr0",
                        "likes": null,
                        "replies": {
                            "kind": "Listing",
                            "data": {
                                "after": null,
                                "whitelist_status": "all_ads",
                                "modhash": "u3c11wxozdca637c0f9b5fc16ce974d85abd0fca496f0d71dc",
                                "dist": null,
                                "children": [
                                    {
                                        "kind": "more",
                                        "data": {
                                            "count": 1,
                                            "name": "t1_dsmcw2g",
                                            "id": "dsmcw2g",
                                            "parent_id": "t1_dsmakpm",
                                            "depth": 1,
                                            "children": [
                                                "dsmcw2g"
                                            ]
                                        }
                                    }
                                ],
                                "before": null
                            }
                        },
                        "user_reports": [],
                        "saved": false,
                        "id": "dsmakpm",
                        "banned_at_utc": null,
                        "mod_reason_title": null,
                        "gilded": 0,
                        "archived": false,
                        "report_reasons": null,
                        "author": "shreditorOG",
                        "can_mod_post": false,
                        "ups": 6,
                        "parent_id": "t3_7q3wr0",
                        "score": 6,
                        "approved_by": null,
                        "downs": 0,
                        "body": "https://www.rewildingeurope.com\n\nSomething cool I came across",
                        "edited": false,
                        "author_flair_css_class": "UNSA",
                        "collapsed": false,
                        "author_flair_richtext": [
                            {
                                "e": "text",
                                "t": "United States of America"
                            }
                        ],
                        "is_submitter": false,
                        "collapsed_reason": null,
                        "body_html": "<div class=\"md\"><p><a href=\"https://www.rewildingeurope.com\">https://www.rewildingeurope.com</a></p>\n\n<p>Something cool I came across</p>\n</div>",
                        "stickied": false,
                        "subreddit_type": "public",
                        "can_gild": true,
                        "subreddit": "europe",
                        "author_flair_text_color": null,
                        "score_hidden": false,
                        "permalink": "/r/europe/comments/7q3wr0/watch_how_europe_is_greener_now_than_100_years_ago/dsmakpm/",
                        "num_reports": null,
                        "name": "t1_dsmakpm",
                        "created": 1515880703,
                        "author_flair_text": "United States of America",
                        "rte_mode": "markdown",
                        "created_utc": 1515851903,
                        "subreddit_name_prefixed": "r/europe",
                        "controversiality": 0,
                        "depth": 0,
                        "author_flair_background_color": null,
                        "mod_reports": [],
                        "mod_note": null,
                        "distinguished": null
                    }
                },
                {
                    "kind": "more",
                    "data": {
                        "count": 62,
                        "name": "t1_dsmqoow",
                        "id": "dsmqoow",
                        "parent_id": "t3_7q3wr0",
                        "depth": 0,
                        "children": [
                            "dsmqoow",
                            "dsmc7zp",
                            "dsmd9fu",
                            "dsmcc5r",
                            "dsm77rj",
                            "dsmj8np",
                            "dsmxhp5",
                            "dsmbpr3",
                            "dsnmw4k",
                            "dsm88py",
                            "dsmsm5k",
                            "dsmh9kg",
                            "dsmdhgx",
                            "dsmw5wf",
                            "dsmkqwt",
                            "dsmygjj",
                            "dsmdp6p",
                            "dsmgipw",
                            "dsmildz",
                            "dsns4wa",
                            "dsmidhn",
                            "dsm7ozy",
                            "dsmaa8g",
                            "dsma193",
                            "dsmu7h5",
                            "dsm8s0q",
                            "dsng8rf",
                            "dsmrmxr",
                            "dsm9eau",
                            "dsmfv8n",
                            "dsm6y5k",
                            "dsmdpif",
                            "dsmbhth",
                            "dsmvrpb"
                        ]
                    }
                }
            ],
            "before": null
        }
    }
];
/* harmony export (immutable) */ __webpack_exports__["b"] = listing_data;



/***/ }),
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(61),
    getRawTag = __webpack_require__(144),
    objectToString = __webpack_require__(148);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseGetTag = __webpack_require__(132);

var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

var _getPrototype = __webpack_require__(134);

var _getPrototype2 = _interopRequireDefault(_getPrototype);

var _isObjectLike = __webpack_require__(139);

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!(0, _isObjectLike2.default)(value) || (0, _baseGetTag2.default)(value) != objectTag) {
    return false;
  }
  var proto = (0, _getPrototype2.default)(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

exports.default = isPlainObject;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(36);

/** Built-in value references. */
var _Symbol = root.Symbol;

module.exports = _Symbol;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isObjectLike;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(138);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var _Symbol = _root2.default.Symbol;

exports.default = _Symbol;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsNative = __webpack_require__(141),
    getValue = __webpack_require__(145);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createStore;

var _isPlainObject = __webpack_require__(60);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = __webpack_require__(249);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2.default)(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2.default] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2.default] = observable, _ref2;
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(41),
    isObject = __webpack_require__(37);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),
/* 111 */,
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Message type used for dispatch events
// from the Proxy Stores to background
var DISPATCH_TYPE = exports.DISPATCH_TYPE = 'chromex.dispatch';

// Message type for state update events from
// background to Proxy Stores
var STATE_TYPE = exports.STATE_TYPE = 'chromex.state';

// Message type for state patch events from
// background to Proxy Stores
var PATCH_STATE_TYPE = exports.PATCH_STATE_TYPE = 'chromex.patch_state';

// The `change` value for updated or inserted fields resulting from shallow diff
var DIFF_STATUS_UPDATED = exports.DIFF_STATUS_UPDATED = 'updated';

// The `change` value for removed fields resulting from shallow diff
var DIFF_STATUS_REMOVED = exports.DIFF_STATUS_REMOVED = 'removed';

/***/ }),
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(72);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _getRawTag = __webpack_require__(135);

var _getRawTag2 = _interopRequireDefault(_getRawTag);

var _objectToString = __webpack_require__(136);

var _objectToString2 = _interopRequireDefault(_objectToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? (0, _getRawTag2.default)(value) : (0, _objectToString2.default)(value);
}

exports.default = baseGetTag;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

exports.default = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overArg = __webpack_require__(137);

var _overArg2 = _interopRequireDefault(_overArg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var getPrototype = (0, _overArg2.default)(Object.getPrototypeOf, Object);

exports.default = getPrototype;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(72);

var _Symbol3 = _interopRequireDefault(_Symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

exports.default = getRawTag;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

exports.default = objectToString;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

exports.default = overArg;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _freeGlobal = __webpack_require__(133);

var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal2.default || freeSelf || Function('return this')();

exports.default = root;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

exports.default = isObjectLike;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = __webpack_require__(143);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(110),
    isMasked = __webpack_require__(147),
    isObject = __webpack_require__(37),
    toSource = __webpack_require__(149);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(36);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(73);

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(61);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreJsData = __webpack_require__(142);

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

/***/ }),
/* 150 */,
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(110),
    isLength = __webpack_require__(153);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyMiddleware;

var _compose = __webpack_require__(104);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2.default.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineReducers;

var _createStore = __webpack_require__(105);

var _isPlainObject = __webpack_require__(60);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = __webpack_require__(106);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2.default)(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2.default)('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2.default)(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 247 */,
/* 248 */,
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(250);

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(251);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var root; /* global window */

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26), __webpack_require__(64)(module)))

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 252 */,
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alias = exports.wrapStore = exports.Store = undefined;

var _Store = __webpack_require__(315);

var _Store2 = _interopRequireDefault(_Store);

var _wrapStore = __webpack_require__(317);

var _wrapStore2 = _interopRequireDefault(_wrapStore);

var _alias = __webpack_require__(314);

var _alias2 = _interopRequireDefault(_alias);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.Store = _Store2.default;
exports.wrapStore = _wrapStore2.default;
exports.alias = _alias2.default;

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;

/***/ }),
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseTimes = __webpack_require__(272),
    isArguments = __webpack_require__(307),
    isArray = __webpack_require__(62),
    isBuffer = __webpack_require__(308),
    isIndex = __webpack_require__(146),
    isTypedArray = __webpack_require__(309);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

/***/ }),
/* 264 */,
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseAssignValue = __webpack_require__(140),
    eq = __webpack_require__(74);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

/***/ }),
/* 266 */,
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(41),
    isObjectLike = __webpack_require__(63);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(41),
    isLength = __webpack_require__(153),
    isObjectLike = __webpack_require__(63);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(37),
    isPrototype = __webpack_require__(286),
    nativeKeysIn = __webpack_require__(298);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var identity = __webpack_require__(151),
    overRest = __webpack_require__(300),
    setToString = __webpack_require__(301);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constant = __webpack_require__(306),
    defineProperty = __webpack_require__(143),
    identity = __webpack_require__(151);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

/***/ }),
/* 273 */,
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),
/* 275 */,
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignValue = __webpack_require__(265),
    baseAssignValue = __webpack_require__(140);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseRest = __webpack_require__(270),
    isIterateeCall = __webpack_require__(283);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

/***/ }),
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var eq = __webpack_require__(74),
    isArrayLike = __webpack_require__(152),
    isIndex = __webpack_require__(146),
    isObject = __webpack_require__(37);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

/***/ }),
/* 284 */,
/* 285 */,
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

  return value === proto;
}

module.exports = isPrototype;

/***/ }),
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(109);

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)(module)))

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(262);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseSetToString = __webpack_require__(271),
    shortOut = __webpack_require__(302);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

/***/ }),
/* 303 */,
/* 304 */,
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(276),
    createAssigner = __webpack_require__(277),
    keysIn = __webpack_require__(310);

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var assignIn = createAssigner(function (object, source) {
  copyObject(source, keysIn(source), object);
});

module.exports = assignIn;

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

module.exports = constant;

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsArguments = __webpack_require__(267),
    isObjectLike = __webpack_require__(63);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function () {
    return arguments;
}()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var root = __webpack_require__(36),
    stubFalse = __webpack_require__(312);

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)(module)))

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsTypedArray = __webpack_require__(268),
    baseUnary = __webpack_require__(274),
    nodeUtil = __webpack_require__(299);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayLikeKeys = __webpack_require__(263),
    baseKeysIn = __webpack_require__(269),
    isArrayLike = __webpack_require__(152);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

/***/ }),
/* 311 */,
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 313 */,
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Simple middleware intercepts actions and replaces with
 * another by calling an alias function with the original action
 * @type {object} aliases an object that maps action types (keys) to alias functions (values) (e.g. { SOME_ACTION: newActionAliasFunc })
 */
exports.default = function (aliases) {
  return function () {
    return function (next) {
      return function (action) {
        var alias = aliases[action.type];

        if (alias) {
          return next(alias(action));
        }

        return next(action);
      };
    };
  };
};

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _assignIn = __webpack_require__(305);

var _assignIn2 = _interopRequireDefault(_assignIn);

var _constants = __webpack_require__(112);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var backgroundErrPrefix = '\nLooks like there is an error in the background page. ' + 'You might want to inspect your background page for more details.\n';

var Store = function () {
  /**
   * Creates a new Proxy store
   * @param  {object} options An object of form {portName, state, extensionId}, where `portName` is a required string and defines the name of the port for state transition changes, `state` is the initial state of this store (default `{}`) `extensionId` is the extension id as defined by chrome when extension is loaded (default `''`)
   */
  function Store(_ref) {
    var _this = this;

    var portName = _ref.portName,
        _ref$state = _ref.state,
        state = _ref$state === undefined ? {} : _ref$state,
        _ref$extensionId = _ref.extensionId,
        extensionId = _ref$extensionId === undefined ? '' : _ref$extensionId;

    _classCallCheck(this, Store);

    if (!portName) {
      throw new Error('portName is required in options');
    }

    this.portName = portName;
    this.readyResolved = false;
    this.readyPromise = new Promise(function (resolve) {
      return _this.readyResolve = resolve;
    });

    this.extensionId = extensionId; // keep the extensionId as an instance variable
    this.port = chrome.runtime.connect(this.extensionId, { name: portName });
    this.listeners = [];
    this.state = state;

    this.port.onMessage.addListener(function (message) {
      switch (message.type) {
        case _constants.STATE_TYPE:
          _this.replaceState(message.payload);

          if (!_this.readyResolved) {
            _this.readyResolved = true;
            _this.readyResolve();
          }
          break;

        case _constants.PATCH_STATE_TYPE:
          _this.patchState(message.payload);
          break;

        default:
        // do nothing
      }
    });

    this.dispatch = this.dispatch.bind(this); // add this context to dispatch
  }

  /**
  * Returns a promise that resolves when the store is ready. Optionally a callback may be passed in instead.
  * @param [function] callback An optional callback that may be passed in and will fire when the store is ready.
  * @return {object} promise A promise that resolves when the store has established a connection with the background page.
  */

  _createClass(Store, [{
    key: 'ready',
    value: function ready() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (cb !== null) {
        return this.readyPromise.then(cb);
      }

      return this.readyPromise;
    }

    /**
     * Subscribes a listener function for all state changes
     * @param  {function} listener A listener function to be called when store state changes
     * @return {function}          An unsubscribe function which can be called to remove the listener from state updates
     */

  }, {
    key: 'subscribe',
    value: function subscribe(listener) {
      var _this2 = this;

      this.listeners.push(listener);

      return function () {
        _this2.listeners = _this2.listeners.filter(function (l) {
          return l !== listener;
        });
      };
    }

    /**
     * Replaces the state for only the keys in the updated state. Notifies all listeners of state change.
     * @param {object} state the new (partial) redux state
     */

  }, {
    key: 'patchState',
    value: function patchState(difference) {
      var state = Object.assign({}, this.state);

      difference.forEach(function (_ref2) {
        var change = _ref2.change,
            key = _ref2.key,
            value = _ref2.value;

        switch (change) {
          case _constants.DIFF_STATUS_UPDATED:
            state[key] = value;
            break;

          case _constants.DIFF_STATUS_REMOVED:
            Reflect.deleteProperty(state, key);
            break;

          default:
          // do nothing
        }
      });

      this.state = state;

      this.listeners.forEach(function (l) {
        return l();
      });
    }

    /**
     * Replace the current state with a new state. Notifies all listeners of state change.
     * @param  {object} state The new state for the store
     */

  }, {
    key: 'replaceState',
    value: function replaceState(state) {
      this.state = state;

      this.listeners.forEach(function (l) {
        return l();
      });
    }

    /**
     * Get the current state of the store
     * @return {object} the current store state
     */

  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }

    /**
     * Dispatch an action to the background using messaging passing
     * @param  {object} data The action data to dispatch
     * @return {Promise}     Promise that will resolve/reject based on the action response from the background
     */

  }, {
    key: 'dispatch',
    value: function dispatch(data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(_this3.extensionId, {
          type: _constants.DISPATCH_TYPE,
          portName: _this3.portName,
          payload: data
        }, function (resp) {
          var error = resp.error,
              value = resp.value;

          if (error) {
            var bgErr = new Error('' + backgroundErrPrefix + error);

            reject((0, _assignIn2.default)(bgErr, error));
          } else {
            resolve(value && value.payload);
          }
        });
      });
    }
  }]);

  return Store;
}();

exports.default = Store;

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowDiff;

var _constants = __webpack_require__(112);

/**
 * Returns a new Object containing only the fields in `new` that differ from `old`
 *
 * @param {Object} old
 * @param {Object} new
 * @return {Array} An array of changes. The changes have a `key`, `value`, and `change`.
 *   The change is either `updated`, which is if the value has changed or been added,
 *   or `removed`.
 */
function shallowDiff(oldObj, newObj) {
  var difference = [];

  Object.keys(newObj).forEach(function (key) {
    if (oldObj[key] !== newObj[key]) {
      difference.push({
        key: key,
        value: newObj[key],
        change: _constants.DIFF_STATUS_UPDATED
      });
    }
  });

  Object.keys(oldObj).forEach(function (key) {
    if (!newObj[key]) {
      difference.push({
        key: key,
        change: _constants.DIFF_STATUS_REMOVED
      });
    }
  });

  return difference;
}

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(112);

var _shallowDiff = __webpack_require__(316);

var _shallowDiff2 = _interopRequireDefault(_shallowDiff);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Responder for promisified results
 * @param  {object} dispatchResult The result from `store.dispatch()`
 * @param  {function} send         The function used to respond to original message
 * @return {undefined}
 */
var promiseResponder = function promiseResponder(dispatchResult, send) {
  Promise.resolve(dispatchResult).then(function (res) {
    send({
      error: null,
      value: res
    });
  }).catch(function (err) {
    console.error('error dispatching result:', err);
    send({
      error: err.message,
      value: null
    });
  });
};

exports.default = function (store, _ref) {
  var portName = _ref.portName,
      dispatchResponder = _ref.dispatchResponder;

  if (!portName) {
    throw new Error('portName is required in options');
  }

  // set dispatch responder as promise responder
  if (!dispatchResponder) {
    dispatchResponder = promiseResponder;
  }

  /**
   * Respond to dispatches from UI components
   */
  var dispatchResponse = function dispatchResponse(request, sender, sendResponse) {
    if (request.type === _constants.DISPATCH_TYPE && request.portName === portName) {
      var action = Object.assign({}, request.payload, {
        _sender: sender
      });

      var dispatchResult = null;

      try {
        dispatchResult = store.dispatch(action);
      } catch (e) {
        dispatchResult = Promise.reject(e.message);
        console.error(e);
      }

      dispatchResponder(dispatchResult, sendResponse);
      return true;
    }
  };

  /**
  * Setup for state updates
  */
  var connectState = function connectState(port) {
    if (port.name !== portName) {
      return;
    }

    var prevState = store.getState();

    var patchState = function patchState() {
      var state = store.getState();
      var diff = (0, _shallowDiff2.default)(prevState, state);

      if (diff.length) {
        prevState = state;

        port.postMessage({
          type: _constants.PATCH_STATE_TYPE,
          payload: diff
        });
      }
    };

    // Send patched state down connected port on every redux store state change
    var unsubscribe = store.subscribe(patchState);

    // when the port disconnects, unsubscribe the sendState listener
    port.onDisconnect.addListener(unsubscribe);

    // Send store's initial state through port
    port.postMessage({
      type: _constants.STATE_TYPE,
      payload: prevState
    });
  };

  /**
   * Setup action handler
   */
  chrome.runtime.onMessage.addListener(dispatchResponse);

  /**
   * Setup external action handler
   */
  if (chrome.runtime.onMessageExternal) {
    chrome.runtime.onMessageExternal.addListener(dispatchResponse);
  } else {
    console.warn('runtime.onMessageExternal is not supported');
  }

  /**
   * Setup extended connection
   */
  chrome.runtime.onConnect.addListener(connectState);

  /**
   * Setup extended external connection
   */
  if (chrome.runtime.onConnectExternal) {
    chrome.runtime.onConnectExternal.addListener(connectState);
  } else {
    console.warn('runtime.onConnectExternal is not supported');
  }
};

/***/ }),
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(38);

var _blacklist_reducer = __webpack_require__(348);

var _blacklist_reducer2 = _interopRequireDefault(_blacklist_reducer);

var _tabs_reducer = __webpack_require__(349);

var _tabs_reducer2 = _interopRequireDefault(_tabs_reducer);

var _url_post_reducer = __webpack_require__(350);

var _url_post_reducer2 = _interopRequireDefault(_url_post_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  posts: _url_post_reducer2.default,
  tabs: _tabs_reducer2.default,
  blacklist: _blacklist_reducer2.default
});

exports.default = rootReducer;

/***/ }),
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.SET_BLACKLIST:
      return _extends({}, action.payload);
    case _actions.CHANGE_BLACKLIST:
      return _extends({}, state, action.payload);
    default:
      return state;
  }
};

var _actions = __webpack_require__(27);

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.SET_TAB_URL:
      state[action.payload.tabId] = action.payload.url;
      return _extends({}, state);
    default:
      return state;
  }
};

var _actions = __webpack_require__(27);

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.FETCH_URL:
      var posts = action.payload;
      posts.sort(function (a, b) {
        return b.data.score - a.data.score;
      });
      var url = action.meta;
      state[url] = posts;
      return _extends({}, state);
    default:
      return state;
  }
};

var _actions = __webpack_require__(27);

/***/ }),
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_chrome_redux__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_chrome_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_chrome_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__actions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__background_reducers__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__background_reducers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__background_reducers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(39);






console.log('Background.html starting!');
/*Put page action icon on all tabs*/
const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_4__background_reducers___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_2_redux_thunk___default.a)); // a normal Redux store
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_chrome_redux__["wrapStore"])(store, { portName: __WEBPACK_IMPORTED_MODULE_5__constants__["d" /* STORE_NAME */] }); // make sure portName matches
// read user settings from local storage
chrome.storage.sync.get(null, object => {
    store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions__["setBlacklist"])(object));
});
// update on URL update
chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
    if (change && change.status === __WEBPACK_IMPORTED_MODULE_5__constants__["h" /* COMPLETE */]) {
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions__["setTabURL"])(tabId, tab.url));
        getPosts(tab);
        chrome.tabs.sendMessage(tabId, {
            data: tab,
            name: __WEBPACK_IMPORTED_MODULE_5__constants__["i" /* URL_UPDATED_EVENT */],
        }, null);
    }
});
// update on tab selection change
chrome.tabs.onSelectionChanged.addListener(function (tabId, info) {
    chrome.tabs.getSelected(null, function (tab) {
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions__["setTabURL"])(tabId, tab.url));
        getPosts(tab);
    });
});
const getPosts = function (tab) {
    const posts = store.getState().posts;
    if (!(tab.url in posts)) {
        console.log("making a network request");
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions__["fetchURL"])(tab.url));
    }
    else {
        updateBadge(posts[tab.url].length, tab);
    }
};
function updateBadge(numPosts, tab) {
    const text = numPosts ? numPosts.toString() : '';
    const badgeColor = '#3770A5';
    setBadge(text, badgeColor, tab);
}
function setBadge(text, badgeColor, tab) {
    const tabId = tab.id;
    chrome.browserAction.setBadgeBackgroundColor({
        color: badgeColor,
        tabId,
    });
    chrome.browserAction.setBadgeText({
        text,
        tabId,
    });
}
console.log('Background.html done.');


/***/ })
/******/ ]);