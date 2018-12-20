/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/style.css":
/*!**************************!*\
  !*** ./assets/style.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/css-loader!./style.css */ \"./node_modules/css-loader/index.js!./assets/style.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./assets/style.css?");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./assets/style.css":
/*!****************************************************!*\
  !*** ./node_modules/css-loader!./assets/style.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"body {\\r\\n\\tmargin: 0;\\r\\n\\tpadding: 0;\\r\\n\\tfont-family: sans-serif;\\r\\n}\\r\\n\\r\\nh3 {\\r\\n\\tcolor: #d14b4b;\\r\\n\\tfont-size: 11px;\\r\\n}\\r\\n\\r\\nh1 {\\r\\n\\tfont-size: 20px;\\r\\n}\\r\\n\\r\\n#root {\\r\\n\\tfont-size: 12px;\\r\\n\\tmargin: 20px auto;\\r\\n\\twidth: 380px;\\r\\n\\tborder: 1px solid #ddd;\\r\\n\\tpadding: 10px;\\r\\n    border-radius: 2px;\\r\\n    box-shadow: 2px 10px 6px -6px rgb(0,0,0,0.2);\\r\\n}\\r\\n.card {\\r\\n\\tmargin: 10px 0;\\r\\n\\tbackground: #fff;  \\r\\n}\\r\\n.form-box .input-box {\\r\\n\\tdisplay: flex;\\r\\n\\tpadding:10px 0;\\r\\n\\talign-items: center;\\r\\n}\\r\\n.form-box label {\\r\\n\\tflex-basis: 25%;\\r\\n}\\r\\n.form-box button, button {\\r\\n\\tcolor: #fff;\\r\\n    background-color: #337ab7;\\r\\n    border-color: #2e6da4;\\r\\n    display: inline-block;\\r\\n    padding: 6px 12px;\\r\\n    margin-right: 20px;\\r\\n    font-size: 14px;\\r\\n    font-weight: 400;\\r\\n    line-height: 1.42857143;\\r\\n    text-align: center;\\r\\n    white-space: nowrap;\\r\\n    vertical-align: middle;\\r\\n    -ms-touch-action: manipulation;\\r\\n    touch-action: manipulation;\\r\\n    cursor: pointer;\\r\\n    -webkit-user-select: none;\\r\\n    -moz-user-select: none;\\r\\n    -ms-user-select: none;\\r\\n    user-select: none;\\r\\n    background-image: none;\\r\\n    border: 1px solid transparent;\\r\\n    border-radius: 4px;\\r\\n}\\r\\n.form-box .signup {\\r\\n\\tpadding: 10px 0 10px 0;\\r\\n}\\r\\n.form-box .signup a{\\r\\n\\tcolor: #00aeff;\\r\\n}\\r\\n.lists {\\r\\n\\tcolor: grey;\\r\\n    padding-bottom: 10px;\\r\\n}\\r\\n.logout {\\r\\n\\tcursor: pointer;\\r\\n\\tcolor: #00aeff;\\r\\n\\tpadding: 10px 0px 5px 0px;\\r\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./assets/style.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/*! exports provided: CREATE_USER_INFO, USERS_INFO, AUTHENTICATE, createUsersInfo, authenticateUser, getUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CREATE_USER_INFO\", function() { return CREATE_USER_INFO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"USERS_INFO\", function() { return USERS_INFO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AUTHENTICATE\", function() { return AUTHENTICATE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createUsersInfo\", function() { return createUsersInfo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"authenticateUser\", function() { return authenticateUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUsers\", function() { return getUsers; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/utils/config */ \"./src/components/utils/config.js\");\n\n\nconst CREATE_USER_INFO = 'CREATE_USER_INFO';\nconst USERS_INFO = 'USERS_INFO';\nconst AUTHENTICATE = 'AUTHENTICATE';\n\nconst createUsersInfo = (history, param) => {\n\treturn dispatch => {\n\t\taxios__WEBPACK_IMPORTED_MODULE_0___default.a.post(_components_utils_config__WEBPACK_IMPORTED_MODULE_1__[\"config\"].baseUrl + 'users', param).then(response => {\n\t\t\tlocalStorage.setItem('username', param.username);\n\t\t\thistory.push('/');\n\t\t});\n\t};\n};\n\nconst authenticateUser = (history, username, password) => {\n\treturn dispatch => {\n\t\taxios__WEBPACK_IMPORTED_MODULE_0___default.a.get(_components_utils_config__WEBPACK_IMPORTED_MODULE_1__[\"config\"].baseUrl + 'users?username=' + username + '&password=' + password).then(response => {\n\t\t\tconst data = response.data;\n\t\t\tif (data.length > 0) {\n\t\t\t\tlocalStorage.setItem('username', username);\n\t\t\t\thistory.push('/');\n\t\t\t} else {\n\t\t\t\tdispatch({\n\t\t\t\t\ttype: AUTHENTICATE,\n\t\t\t\t\tusers: 'invalid'\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t};\n};\n\nconst getUsers = () => {\n\treturn dispatch => {\n\t\taxios__WEBPACK_IMPORTED_MODULE_0___default.a.get(_components_utils_config__WEBPACK_IMPORTED_MODULE_1__[\"config\"].baseUrl + 'users?username=' + localStorage.getItem('username')).then(response => {\n\t\t\tconst data = response.data[0];\n\t\t\tdispatch({\n\t\t\t\ttype: USERS_INFO,\n\t\t\t\tusers: data\n\t\t\t});\n\t\t}).catch(err => {\n\t\t\tconsole.error(err);\n\t\t});\n\t};\n};\n\n//# sourceURL=webpack:///./src/actions.js?");

/***/ }),

/***/ "./src/components/utils/config.js":
/*!****************************************!*\
  !*** ./src/components/utils/config.js ***!
  \****************************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"config\", function() { return config; });\nconst config = {\n\tbaseUrl: 'http://localhost:3004/'\n};\n\n//# sourceURL=webpack:///./src/components/utils/config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/style.css */ \"./assets/style.css\");\n/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_style_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/lib/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\n\nconst store = Object(_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(window.__REDUX_STATE__ || {});\n\nwindow.main = () => {\n\treact_loadable__WEBPACK_IMPORTED_MODULE_3___default.a.preloadReady().then(() => {\n\t\tObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"hydrate\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\treact_redux__WEBPACK_IMPORTED_MODULE_7__[\"Provider\"],\n\t\t\t{ store: store },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\treact_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"BrowserRouter\"],\n\t\t\t\tnull,\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_router__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null)\n\t\t\t)\n\t\t), document.getElementById('root'));\n\t});\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/reducers.js":
/*!*************************!*\
  !*** ./src/reducers.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./src/actions.js\");\n//import { combineReducers } from 'redux'\n\n/* reducers */\n\n\nfunction makeRootReducer(state = [], action) {\n  switch (action.type) {\n\n    case _actions__WEBPACK_IMPORTED_MODULE_0__[\"AUTHENTICATE\"]:\n      return Object.assign({}, state, { users: action.users });\n\n    case _actions__WEBPACK_IMPORTED_MODULE_0__[\"USERS_INFO\"]:\n      return Object.assign({}, state, { users: action.users });\n\n  }\n  return state;\n}\n\n/*export const makeRootReducer = (asyncReducers) => {\r\n  return combineReducers({\r\n    ...asyncReducers\r\n  })\r\n}\r\n\r\nexport const injectReducer = (asyncReducers, { key, reducer }) => {\r\n  if (Object.hasOwnProperty.call(asyncReducers, key)) return\r\n\r\n  asyncReducers[key] = reducer\r\n  makeRootReducer(asyncReducers)\r\n}*/\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (makeRootReducer);\n\n//# sourceURL=webpack:///./src/reducers.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\n\n\n\n\n//import asyncComponent from \"../asyncComponent\";\n//import LoadingComponent from \"../LoadingComponent\";\n\n//const AsyncLogin = asyncComponent(() => import(\"../components/Login\"), LoadingComponent);\nconst AsyncLogin = react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\n  loader: () => __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ../components/Login */ \"./src/components/Login.js\")),\n  loading: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n    'div',\n    null,\n    'loading page...'\n  )\n  //modules: ['Login'],\n});\n//const AsyncRegister = asyncComponent(() => import(\"../components/Register\"), LoadingComponent);\nconst AsyncRegister = react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\n  loader: () => __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../components/Register */ \"./src/components/Register.js\")),\n  loading: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n    'div',\n    null,\n    'loading page...'\n  )\n  //modules: ['Register'],\n});\n//const AsyncDashboard = asyncComponent(() => import(\"../components/Dashboard\"), LoadingComponent);\nconst AsyncDashboard = react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\n  loader: () => __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../components/Dashboard */ \"./src/components/Dashboard.js\")),\n  loading: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n    'div',\n    null,\n    'loading page...'\n  )\n  //modules: ['Dashboard'],\n});\nconst GLOBAL_WINDOW = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global || undefined;\n\nconst PrivateRoute = (_ref) => {\n  let { component: Component } = _ref,\n      rest = _objectWithoutProperties(_ref, ['component']);\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], _extends({}, rest, {\n    render: props => GLOBAL_WINDOW.localStorage && GLOBAL_WINDOW.localStorage.getItem('username') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, props) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Redirect\"], {\n      to: {\n        pathname: \"/login\",\n        state: { from: props.location }\n      }\n    })\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n    'div',\n    null,\n    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n      react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"],\n      null,\n      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], { path: '/login', component: AsyncLogin }),\n      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], { path: '/register', component: AsyncRegister }),\n      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PrivateRoute, { exact: true, path: '/', component: AsyncDashboard })\n    )\n  );\n});\n/*export default [\r\n  {\r\n    component: AsyncDashboard,\r\n    path: '/',\r\n    exact: true\r\n  },\r\n  {\r\n    component: AsyncLogin,\r\n    path: '/login'\r\n  },\r\n  {\r\n    component: AsyncRegister,\r\n    path: '/register'\r\n  }\r\n];*/\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return configureStore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/index.js\");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ \"./src/reducers.js\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n\n\n\n\n\n\n// if you're also using redux-thunk, add it as a middleware\nconst createStoreWithMiddleware = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2__[\"default\"]))(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"]);\n\nconst rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n    reducers: _reducers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\nfunction configureStore(initialState = {}) {\n    return createStoreWithMiddleware(rootReducer, initialState);\n};\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ })

/******/ });