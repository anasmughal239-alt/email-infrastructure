"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "./action-async-storage.external?8652":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?0211":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?137c":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_PC_Documents_trae_projects_Email_Infra_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\PC\\\\Documents\\\\trae_projects\\\\Email Infra\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_PC_Documents_trae_projects_Email_Infra_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNQQyU1Q0RvY3VtZW50cyU1Q3RyYWVfcHJvamVjdHMlNUNFbWFpbCUyMEluZnJhJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNQQyU1Q0RvY3VtZW50cyU1Q3RyYWVfcHJvamVjdHMlNUNFbWFpbCUyMEluZnJhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PXN0YW5kYWxvbmUmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNrRDtBQUMvSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL21vZGVybi1zYWFzLXRoZW1lLz8wMzgwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFBDXFxcXERvY3VtZW50c1xcXFx0cmFlX3Byb2plY3RzXFxcXEVtYWlsIEluZnJhXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJzdGFuZGFsb25lXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcUENcXFxcRG9jdW1lbnRzXFxcXHRyYWVfcHJvamVjdHNcXFxcRW1haWwgSW5mcmFcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth-config */ \"(rsc)/./src/lib/auth-config.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth_config__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBZ0M7QUFDZTtBQUUvQyxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0MseURBQVdBO0FBRU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2Rlcm4tc2Fhcy10aGVtZS8uL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz8wMDk4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgtY29uZmlnJ1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfSJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth-config.ts":
/*!********************************!*\
  !*** ./src/lib/auth-config.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth */ \"(rsc)/./src/lib/auth.ts\");\n\n// OAuth providers temporarily disabled for initial GitHub upload\n// import GoogleProvider from 'next-auth/providers/google'\n// import GitHubProvider from 'next-auth/providers/github'\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_db__WEBPACK_IMPORTED_MODULE_2__.db),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await (0,_auth__WEBPACK_IMPORTED_MODULE_3__.getUserByEmail)(credentials.email);\n                if (!user || !user.hashedPassword) {\n                    return null;\n                }\n                const isPasswordValid = await (0,_auth__WEBPACK_IMPORTED_MODULE_3__.verifyPassword)(credentials.password, user.hashedPassword);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                // Check if email is verified\n                if (!user.isEmailVerified) {\n                    throw new Error(\"Please verify your email address before signing in.\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    subscriptionStatus: user.subscriptionStatus\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60,\n        updateAge: 24 * 60 * 60\n    },\n    useSecureCookies: \"development\" === \"production\",\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.subscriptionStatus = user.subscriptionStatus;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n                session.user.subscriptionStatus = token.subscriptionStatus;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\",\n        signUp: \"/auth/signup\"\n    },\n    cookies: {\n        sessionToken: {\n            name: \"next-auth.session-token\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\",\n                domain:  false ? 0 : undefined\n            }\n        },\n        callbackUrl: {\n            name: \"next-auth.callback-url\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        },\n        csrfToken: {\n            name: \"next-auth.csrf-token\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2s6Ly9tb2Rlcm4tc2Fhcy10aGVtZS8uL3NyYy9saWIvYXV0aC1jb25maWcudHM/MDYzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJ1xuLy8gT0F1dGggcHJvdmlkZXJzIHRlbXBvcmFyaWx5IGRpc2FibGVkIGZvciBpbml0aWFsIEdpdEh1YiB1cGxvYWRcbi8vIGltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSdcbi8vIGltcG9ydCBHaXRIdWJQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dpdGh1YidcbmltcG9ydCB7IFByaXNtYUFkYXB0ZXIgfSBmcm9tICdAbmV4dC1hdXRoL3ByaXNtYS1hZGFwdGVyJ1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL2RiJ1xuaW1wb3J0IHsgdmVyaWZ5UGFzc3dvcmQsIGdldFVzZXJCeUVtYWlsIH0gZnJvbSAnLi9hdXRoJ1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgYWRhcHRlcjogUHJpc21hQWRhcHRlcihkYiksXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ2NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH1cbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0VXNlckJ5RW1haWwoY3JlZGVudGlhbHMuZW1haWwpXG4gICAgICAgIGlmICghdXNlciB8fCAhdXNlci5oYXNoZWRQYXNzd29yZCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCB2ZXJpZnlQYXNzd29yZChcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLmhhc2hlZFBhc3N3b3JkXG4gICAgICAgIClcblxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBlbWFpbCBpcyB2ZXJpZmllZFxuICAgICAgICBpZiAoIXVzZXIuaXNFbWFpbFZlcmlmaWVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgdmVyaWZ5IHlvdXIgZW1haWwgYWRkcmVzcyBiZWZvcmUgc2lnbmluZyBpbi4nKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgIHN1YnNjcmlwdGlvblN0YXR1czogdXNlci5zdWJzY3JpcHRpb25TdGF0dXMsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICAvLyBPQXV0aCBwcm92aWRlcnMgdGVtcG9yYXJpbHkgZGlzYWJsZWQgZm9yIGluaXRpYWwgR2l0SHViIHVwbG9hZFxuICAgIC8vIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAvLyAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEIHx8ICcnLFxuICAgIC8vICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcbiAgICAvLyB9KSxcbiAgICAvLyBHaXRIdWJQcm92aWRlcih7XG4gICAgLy8gICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR0lUSFVCX0NMSUVOVF9JRCB8fCAnJyxcbiAgICAvLyAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR0lUSFVCX0NMSUVOVF9TRUNSRVQgfHwgJycsXG4gICAgLy8gfSlcbiAgXSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiAnand0JyxcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXG4gICAgdXBkYXRlQWdlOiAyNCAqIDYwICogNjAsIC8vIDI0IGhvdXJzXG4gIH0sXG4gIHVzZVNlY3VyZUNvb2tpZXM6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGVcbiAgICAgICAgdG9rZW4uc3Vic2NyaXB0aW9uU3RhdHVzID0gdXNlci5zdWJzY3JpcHRpb25TdGF0dXNcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5zdWIhXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmdcbiAgICAgICAgc2Vzc2lvbi51c2VyLnN1YnNjcmlwdGlvblN0YXR1cyA9IHRva2VuLnN1YnNjcmlwdGlvblN0YXR1cyBhcyBzdHJpbmdcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvYXV0aC9zaWduaW4nLFxuICAgIHNpZ25VcDogJy9hdXRoL3NpZ251cCcsXG4gIH0sXG4gIGNvb2tpZXM6IHtcbiAgICBzZXNzaW9uVG9rZW46IHtcbiAgICAgIG5hbWU6ICduZXh0LWF1dGguc2Vzc2lvbi10b2tlbicsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzYW1lU2l0ZTogJ2xheCcsXG4gICAgICAgIHBhdGg6ICcvJyxcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgICBkb21haW46IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgJiYgcHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMIFxuICAgICAgICAgID8gbmV3IFVSTChwcm9jZXNzLmVudi5ORVhUQVVUSF9VUkwpLmhvc3RuYW1lIFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhbGxiYWNrVXJsOiB7XG4gICAgICBuYW1lOiAnbmV4dC1hdXRoLmNhbGxiYWNrLXVybCcsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzYW1lU2l0ZTogJ2xheCcsXG4gICAgICAgIHBhdGg6ICcvJyxcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzcmZUb2tlbjoge1xuICAgICAgbmFtZTogJ25leHQtYXV0aC5jc3JmLXRva2VuJyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIHNhbWVTaXRlOiAnbGF4JyxcbiAgICAgICAgcGF0aDogJy8nLFxuICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59Il0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwiZGIiLCJ2ZXJpZnlQYXNzd29yZCIsImdldFVzZXJCeUVtYWlsIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJoYXNoZWRQYXNzd29yZCIsImlzUGFzc3dvcmRWYWxpZCIsImlzRW1haWxWZXJpZmllZCIsIkVycm9yIiwiaWQiLCJyb2xlIiwic3Vic2NyaXB0aW9uU3RhdHVzIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwibWF4QWdlIiwidXBkYXRlQWdlIiwidXNlU2VjdXJlQ29va2llcyIsInByb2Nlc3MiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInN1YiIsInBhZ2VzIiwic2lnbkluIiwic2lnblVwIiwiY29va2llcyIsInNlc3Npb25Ub2tlbiIsIm9wdGlvbnMiLCJodHRwT25seSIsInNhbWVTaXRlIiwicGF0aCIsInNlY3VyZSIsImRvbWFpbiIsImVudiIsIk5FWFRBVVRIX1VSTCIsIlVSTCIsImhvc3RuYW1lIiwidW5kZWZpbmVkIiwiY2FsbGJhY2tVcmwiLCJjc3JmVG9rZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth-config.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createUser: () => (/* binding */ createUser),\n/* harmony export */   getAllUsers: () => (/* binding */ getAllUsers),\n/* harmony export */   getUserByEmail: () => (/* binding */ getUserByEmail),\n/* harmony export */   getUserById: () => (/* binding */ getUserById),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   updateUserSubscription: () => (/* binding */ updateUserSubscription),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function hashPassword(password) {\n    const saltRounds = 12;\n    return bcrypt__WEBPACK_IMPORTED_MODULE_0___default().hash(password, saltRounds);\n}\nasync function verifyPassword(password, hashedPassword) {\n    return bcrypt__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hashedPassword);\n}\nasync function createUser(email, password, name) {\n    const hashedPassword = await hashPassword(password);\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.create({\n        data: {\n            email,\n            hashedPassword,\n            name,\n            role: _prisma_client__WEBPACK_IMPORTED_MODULE_2__.Role.USER,\n            subscriptionStatus: _prisma_client__WEBPACK_IMPORTED_MODULE_2__.SubscriptionStatus.FREE,\n            isEmailVerified: true\n        }\n    });\n}\nasync function getUserByEmail(email) {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n        where: {\n            email\n        }\n    });\n}\nasync function getUserById(id) {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n        where: {\n            id\n        }\n    });\n}\nasync function updateUserSubscription(userId, subscriptionStatus) {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.update({\n        where: {\n            id: userId\n        },\n        data: {\n            subscriptionStatus\n        }\n    });\n}\nasync function getAllUsers() {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findMany({\n        select: {\n            id: true,\n            email: true,\n            name: true,\n            role: true,\n            subscriptionStatus: true,\n            createdAt: true,\n            updatedAt: true\n        },\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTJCO0FBQ0Y7QUFDZ0M7QUFFbEQsZUFBZUksYUFBYUMsUUFBZ0I7SUFDakQsTUFBTUMsYUFBYTtJQUNuQixPQUFPTixrREFBVyxDQUFDSyxVQUFVQztBQUMvQjtBQUVPLGVBQWVFLGVBQWVILFFBQWdCLEVBQUVJLGNBQXNCO0lBQzNFLE9BQU9ULHFEQUFjLENBQUNLLFVBQVVJO0FBQ2xDO0FBRU8sZUFBZUUsV0FBV0MsS0FBYSxFQUFFUCxRQUFnQixFQUFFUSxJQUFhO0lBQzdFLE1BQU1KLGlCQUFpQixNQUFNTCxhQUFhQztJQUUxQyxPQUFPSixtQ0FBRUEsQ0FBQ2EsSUFBSSxDQUFDQyxNQUFNLENBQUM7UUFDcEJDLE1BQU07WUFDSko7WUFDQUg7WUFDQUk7WUFDQUksTUFBTWYsZ0RBQUlBLENBQUNnQixJQUFJO1lBQ2ZDLG9CQUFvQmhCLDhEQUFrQkEsQ0FBQ2lCLElBQUk7WUFDM0NDLGlCQUFpQjtRQUNuQjtJQUNGO0FBQ0Y7QUFFTyxlQUFlQyxlQUFlVixLQUFhO0lBQ2hELE9BQU9YLG1DQUFFQSxDQUFDYSxJQUFJLENBQUNTLFVBQVUsQ0FBQztRQUN4QkMsT0FBTztZQUFFWjtRQUFNO0lBQ2pCO0FBQ0Y7QUFFTyxlQUFlYSxZQUFZQyxFQUFVO0lBQzFDLE9BQU96QixtQ0FBRUEsQ0FBQ2EsSUFBSSxDQUFDUyxVQUFVLENBQUM7UUFDeEJDLE9BQU87WUFBRUU7UUFBRztJQUNkO0FBQ0Y7QUFFTyxlQUFlQyx1QkFBdUJDLE1BQWMsRUFBRVQsa0JBQXNDO0lBQ2pHLE9BQU9sQixtQ0FBRUEsQ0FBQ2EsSUFBSSxDQUFDZSxNQUFNLENBQUM7UUFDcEJMLE9BQU87WUFBRUUsSUFBSUU7UUFBTztRQUNwQlosTUFBTTtZQUFFRztRQUFtQjtJQUM3QjtBQUNGO0FBRU8sZUFBZVc7SUFDcEIsT0FBTzdCLG1DQUFFQSxDQUFDYSxJQUFJLENBQUNpQixRQUFRLENBQUM7UUFDdEJDLFFBQVE7WUFDTk4sSUFBSTtZQUNKZCxPQUFPO1lBQ1BDLE1BQU07WUFDTkksTUFBTTtZQUNORSxvQkFBb0I7WUFDcEJjLFdBQVc7WUFDWEMsV0FBVztRQUNiO1FBQ0FDLFNBQVM7WUFDUEYsV0FBVztRQUNiO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL21vZGVybi1zYWFzLXRoZW1lLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vZGInXG5pbXBvcnQgeyBSb2xlLCBTdWJzY3JpcHRpb25TdGF0dXMgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qgc2FsdFJvdW5kcyA9IDEyXG4gIHJldHVybiBiY3J5cHQuaGFzaChwYXNzd29yZCwgc2FsdFJvdW5kcylcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcsIGhhc2hlZFBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBoYXNoZWRQYXNzd29yZClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVVzZXIoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgbmFtZT86IHN0cmluZykge1xuICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChwYXNzd29yZClcbiAgXG4gIHJldHVybiBkYi51c2VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgZW1haWwsXG4gICAgICBoYXNoZWRQYXNzd29yZCxcbiAgICAgIG5hbWUsXG4gICAgICByb2xlOiBSb2xlLlVTRVIsXG4gICAgICBzdWJzY3JpcHRpb25TdGF0dXM6IFN1YnNjcmlwdGlvblN0YXR1cy5GUkVFLFxuICAgICAgaXNFbWFpbFZlcmlmaWVkOiB0cnVlLCAvLyBTZXQgdG8gdHJ1ZSBzaW5jZSB1c2VyIGlzIGNyZWF0ZWQgYWZ0ZXIgZW1haWwgdmVyaWZpY2F0aW9uXG4gICAgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGRiLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgZW1haWwgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeUlkKGlkOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGRiLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXJTdWJzY3JpcHRpb24odXNlcklkOiBzdHJpbmcsIHN1YnNjcmlwdGlvblN0YXR1czogU3Vic2NyaXB0aW9uU3RhdHVzKSB7XG4gIHJldHVybiBkYi51c2VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxuICAgIGRhdGE6IHsgc3Vic2NyaXB0aW9uU3RhdHVzIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxVc2VycygpIHtcbiAgcmV0dXJuIGRiLnVzZXIuZmluZE1hbnkoe1xuICAgIHNlbGVjdDoge1xuICAgICAgaWQ6IHRydWUsXG4gICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgIG5hbWU6IHRydWUsXG4gICAgICByb2xlOiB0cnVlLFxuICAgICAgc3Vic2NyaXB0aW9uU3RhdHVzOiB0cnVlLFxuICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgdXBkYXRlZEF0OiB0cnVlLFxuICAgIH0sXG4gICAgb3JkZXJCeToge1xuICAgICAgY3JlYXRlZEF0OiAnZGVzYycsXG4gICAgfSxcbiAgfSlcbn0iXSwibmFtZXMiOlsiYmNyeXB0IiwiZGIiLCJSb2xlIiwiU3Vic2NyaXB0aW9uU3RhdHVzIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJzYWx0Um91bmRzIiwiaGFzaCIsInZlcmlmeVBhc3N3b3JkIiwiaGFzaGVkUGFzc3dvcmQiLCJjb21wYXJlIiwiY3JlYXRlVXNlciIsImVtYWlsIiwibmFtZSIsInVzZXIiLCJjcmVhdGUiLCJkYXRhIiwicm9sZSIsIlVTRVIiLCJzdWJzY3JpcHRpb25TdGF0dXMiLCJGUkVFIiwiaXNFbWFpbFZlcmlmaWVkIiwiZ2V0VXNlckJ5RW1haWwiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJnZXRVc2VyQnlJZCIsImlkIiwidXBkYXRlVXNlclN1YnNjcmlwdGlvbiIsInVzZXJJZCIsInVwZGF0ZSIsImdldEFsbFVzZXJzIiwiZmluZE1hbnkiLCJzZWxlY3QiLCJjcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJvcmRlckJ5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst db = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = db;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLEtBQ1hGLGdCQUFnQkcsTUFBTSxJQUN0QixJQUFJSix3REFBWUEsQ0FBQztJQUNmSyxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUosSUFBSUMsSUFBeUIsRUFBY0wsZ0JBQWdCRyxNQUFNLEdBQUdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kZXJuLXNhYXMtdGhlbWUvLi9zcmMvbGliL2RiLnRzPzllNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjb25zdCBkYiA9XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz9cbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBbJ3F1ZXJ5J10sXG4gIH0pXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gZGIiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsImRiIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/cookie","vendor-chunks/@next-auth"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();