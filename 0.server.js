exports.ids = [0];
exports.modules = {

/***/ "./src/components/Dashboard.js":
/*!*************************************!*\
  !*** ./src/components/Dashboard.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/lib/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ \"./src/actions.js\");\n\n\n\n\n\nclass Dashboard extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\n\t\tthis.logout = () => {\n\t\t\tlocalStorage.removeItem('username');\n\t\t\tthis.props.history.push('login');\n\t\t};\n\n\t\tthis.user = null;\n\t\tprops.getUsers();\n\t}\n\n\tcomponentWillUpdate(newProps) {\n\t\tthis.user = newProps.users;\n\t}\n\n\trender() {\n\t\tif (this.user) {\n\t\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'h1',\n\t\t\t\t\tnull,\n\t\t\t\t\t'Hi, ',\n\t\t\t\t\tthis.user.firstname,\n\t\t\t\t\t' ',\n\t\t\t\t\tthis.user.lastname\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'lists' },\n\t\t\t\t\t'Users Information'\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\tnull,\n\t\t\t\t\t'Gender: ',\n\t\t\t\t\tthis.user.gender\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\tnull,\n\t\t\t\t\t'Country: ',\n\t\t\t\t\tthis.user.country\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'logout', onClick: this.logout },\n\t\t\t\t\t'Logout'\n\t\t\t\t)\n\t\t\t);\n\t\t} else {\n\t\t\treturn null;\n\t\t}\n\t}\n}\n\nconst mapStateToProps = state => ({\n\tusers: state.users\n});\n\nconst mapDispatchToProps = {\n\tgetUsers: _actions__WEBPACK_IMPORTED_MODULE_3__[\"getUsers\"]\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"withRouter\"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Dashboard)));\n\n//# sourceURL=webpack:///./src/components/Dashboard.js?");

/***/ })

};;