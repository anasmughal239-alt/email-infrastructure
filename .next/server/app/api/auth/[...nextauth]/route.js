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

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth */ \"(rsc)/./src/lib/auth.ts\");\n\n// OAuth providers temporarily disabled for initial GitHub upload\n// import GoogleProvider from 'next-auth/providers/google'\n// import GitHubProvider from 'next-auth/providers/github'\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_db__WEBPACK_IMPORTED_MODULE_2__.db),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await (0,_auth__WEBPACK_IMPORTED_MODULE_3__.getUserByEmail)(credentials.email);\n                if (!user || !user.hashedPassword) {\n                    return null;\n                }\n                const isPasswordValid = await (0,_auth__WEBPACK_IMPORTED_MODULE_3__.verifyPassword)(credentials.password, user.hashedPassword);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                // Check if email is verified\n                if (!user.isEmailVerified) {\n                    throw new Error(\"Please verify your email address before signing in.\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    subscriptionStatus: user.subscriptionStatus\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60,\n        updateAge: 24 * 60 * 60\n    },\n    useSecureCookies: \"development\" === \"production\",\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.subscriptionStatus = user.subscriptionStatus;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n                session.user.subscriptionStatus = token.subscriptionStatus;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\",\n        signUp: \"/auth/signup\"\n    },\n    cookies: {\n        sessionToken: {\n            name: \"next-auth.session-token\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\",\n                domain:  false ? 0 : undefined\n            }\n        },\n        callbackUrl: {\n            name: \"next-auth.callback-url\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        },\n        csrfToken: {\n            name: \"next-auth.csrf-token\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2s6Ly9tb2Rlcm4tc2Fhcy10aGVtZS8uL3NyYy9saWIvYXV0aC1jb25maWcudHM/MDYzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnXHJcbi8vIE9BdXRoIHByb3ZpZGVycyB0ZW1wb3JhcmlseSBkaXNhYmxlZCBmb3IgaW5pdGlhbCBHaXRIdWIgdXBsb2FkXHJcbi8vIGltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSdcclxuLy8gaW1wb3J0IEdpdEh1YlByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ2l0aHViJ1xyXG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSAnQG5leHQtYXV0aC9wcmlzbWEtYWRhcHRlcidcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuL2RiJ1xyXG5pbXBvcnQgeyB2ZXJpZnlQYXNzd29yZCwgZ2V0VXNlckJ5RW1haWwgfSBmcm9tICcuL2F1dGgnXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKGRiKSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiAnY3JlZGVudGlhbHMnLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfVxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUVtYWlsKGNyZWRlbnRpYWxzLmVtYWlsKVxyXG4gICAgICAgIGlmICghdXNlciB8fCAhdXNlci5oYXNoZWRQYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IHZlcmlmeVBhc3N3b3JkKFxyXG4gICAgICAgICAgY3JlZGVudGlhbHMucGFzc3dvcmQsXHJcbiAgICAgICAgICB1c2VyLmhhc2hlZFBhc3N3b3JkXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGVtYWlsIGlzIHZlcmlmaWVkXHJcbiAgICAgICAgaWYgKCF1c2VyLmlzRW1haWxWZXJpZmllZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgdmVyaWZ5IHlvdXIgZW1haWwgYWRkcmVzcyBiZWZvcmUgc2lnbmluZyBpbi4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXHJcbiAgICAgICAgICBzdWJzY3JpcHRpb25TdGF0dXM6IHVzZXIuc3Vic2NyaXB0aW9uU3RhdHVzLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICAvLyBPQXV0aCBwcm92aWRlcnMgdGVtcG9yYXJpbHkgZGlzYWJsZWQgZm9yIGluaXRpYWwgR2l0SHViIHVwbG9hZFxyXG4gICAgLy8gR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgLy8gICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCB8fCAnJyxcclxuICAgIC8vICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcclxuICAgIC8vIH0pLFxyXG4gICAgLy8gR2l0SHViUHJvdmlkZXIoe1xyXG4gICAgLy8gICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR0lUSFVCX0NMSUVOVF9JRCB8fCAnJyxcclxuICAgIC8vICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HSVRIVUJfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcclxuICAgIC8vIH0pXHJcbiAgXSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogJ2p3dCcsXHJcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXHJcbiAgICB1cGRhdGVBZ2U6IDI0ICogNjAgKiA2MCwgLy8gMjQgaG91cnNcclxuICB9LFxyXG4gIHVzZVNlY3VyZUNvb2tpZXM6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZVxyXG4gICAgICAgIHRva2VuLnN1YnNjcmlwdGlvblN0YXR1cyA9IHVzZXIuc3Vic2NyaXB0aW9uU3RhdHVzXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uc3ViIVxyXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmdcclxuICAgICAgICBzZXNzaW9uLnVzZXIuc3Vic2NyaXB0aW9uU3RhdHVzID0gdG9rZW4uc3Vic2NyaXB0aW9uU3RhdHVzIGFzIHN0cmluZ1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9hdXRoL3NpZ25pbicsXHJcbiAgICBzaWduVXA6ICcvYXV0aC9zaWdudXAnLFxyXG4gIH0sXHJcbiAgY29va2llczoge1xyXG4gICAgc2Vzc2lvblRva2VuOiB7XHJcbiAgICAgIG5hbWU6ICduZXh0LWF1dGguc2Vzc2lvbi10b2tlbicsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBodHRwT25seTogdHJ1ZSxcclxuICAgICAgICBzYW1lU2l0ZTogJ2xheCcsXHJcbiAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcclxuICAgICAgICBkb21haW46IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgJiYgcHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMIFxyXG4gICAgICAgICAgPyBuZXcgVVJMKHByb2Nlc3MuZW52Lk5FWFRBVVRIX1VSTCkuaG9zdG5hbWUgXHJcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjYWxsYmFja1VybDoge1xyXG4gICAgICBuYW1lOiAnbmV4dC1hdXRoLmNhbGxiYWNrLXVybCcsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBodHRwT25seTogdHJ1ZSxcclxuICAgICAgICBzYW1lU2l0ZTogJ2xheCcsXHJcbiAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3JmVG9rZW46IHtcclxuICAgICAgbmFtZTogJ25leHQtYXV0aC5jc3JmLXRva2VuJyxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxyXG4gICAgICAgIHNhbWVTaXRlOiAnbGF4JyxcclxuICAgICAgICBwYXRoOiAnLycsXHJcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59XHJcbiJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiUHJpc21hQWRhcHRlciIsImRiIiwidmVyaWZ5UGFzc3dvcmQiLCJnZXRVc2VyQnlFbWFpbCIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiaGFzaGVkUGFzc3dvcmQiLCJpc1Bhc3N3b3JkVmFsaWQiLCJpc0VtYWlsVmVyaWZpZWQiLCJFcnJvciIsImlkIiwicm9sZSIsInN1YnNjcmlwdGlvblN0YXR1cyIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInVwZGF0ZUFnZSIsInVzZVNlY3VyZUNvb2tpZXMiLCJwcm9jZXNzIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJzdWIiLCJwYWdlcyIsInNpZ25JbiIsInNpZ25VcCIsImNvb2tpZXMiLCJzZXNzaW9uVG9rZW4iLCJvcHRpb25zIiwiaHR0cE9ubHkiLCJzYW1lU2l0ZSIsInBhdGgiLCJzZWN1cmUiLCJkb21haW4iLCJlbnYiLCJORVhUQVVUSF9VUkwiLCJVUkwiLCJob3N0bmFtZSIsInVuZGVmaW5lZCIsImNhbGxiYWNrVXJsIiwiY3NyZlRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth-config.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createUser: () => (/* binding */ createUser),\n/* harmony export */   getAllUsers: () => (/* binding */ getAllUsers),\n/* harmony export */   getUserByEmail: () => (/* binding */ getUserByEmail),\n/* harmony export */   getUserById: () => (/* binding */ getUserById),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   updateUserSubscription: () => (/* binding */ updateUserSubscription),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function hashPassword(password) {\n    const saltRounds = 12;\n    return bcrypt__WEBPACK_IMPORTED_MODULE_0___default().hash(password, saltRounds);\n}\nasync function verifyPassword(password, hashedPassword) {\n    return bcrypt__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hashedPassword);\n}\nasync function createUser(email, password, name) {\n    const hashedPassword = await hashPassword(password);\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.create({\n        data: {\n            email,\n            hashedPassword,\n            name,\n            role: _prisma_client__WEBPACK_IMPORTED_MODULE_2__.Role.USER,\n            subscriptionStatus: _prisma_client__WEBPACK_IMPORTED_MODULE_2__.SubscriptionStatus.FREE,\n            isEmailVerified: true\n        }\n    });\n}\nasync function getUserByEmail(email) {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n        where: {\n            email\n        }\n    });\n}\nasync function getUserById(id) {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n        where: {\n            id\n        }\n    });\n}\nasync function updateUserSubscription(userId, subscriptionStatus) {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.update({\n        where: {\n            id: userId\n        },\n        data: {\n            subscriptionStatus\n        }\n    });\n}\nasync function getAllUsers() {\n    return _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findMany({\n        select: {\n            id: true,\n            email: true,\n            name: true,\n            role: true,\n            subscriptionStatus: true,\n            createdAt: true,\n            updatedAt: true\n        },\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTJCO0FBQ0Y7QUFDZ0M7QUFFbEQsZUFBZUksYUFBYUMsUUFBZ0I7SUFDakQsTUFBTUMsYUFBYTtJQUNuQixPQUFPTixrREFBVyxDQUFDSyxVQUFVQztBQUMvQjtBQUVPLGVBQWVFLGVBQWVILFFBQWdCLEVBQUVJLGNBQXNCO0lBQzNFLE9BQU9ULHFEQUFjLENBQUNLLFVBQVVJO0FBQ2xDO0FBRU8sZUFBZUUsV0FBV0MsS0FBYSxFQUFFUCxRQUFnQixFQUFFUSxJQUFhO0lBQzdFLE1BQU1KLGlCQUFpQixNQUFNTCxhQUFhQztJQUUxQyxPQUFPSixtQ0FBRUEsQ0FBQ2EsSUFBSSxDQUFDQyxNQUFNLENBQUM7UUFDcEJDLE1BQU07WUFDSko7WUFDQUg7WUFDQUk7WUFDQUksTUFBTWYsZ0RBQUlBLENBQUNnQixJQUFJO1lBQ2ZDLG9CQUFvQmhCLDhEQUFrQkEsQ0FBQ2lCLElBQUk7WUFDM0NDLGlCQUFpQjtRQUNuQjtJQUNGO0FBQ0Y7QUFFTyxlQUFlQyxlQUFlVixLQUFhO0lBQ2hELE9BQU9YLG1DQUFFQSxDQUFDYSxJQUFJLENBQUNTLFVBQVUsQ0FBQztRQUN4QkMsT0FBTztZQUFFWjtRQUFNO0lBQ2pCO0FBQ0Y7QUFFTyxlQUFlYSxZQUFZQyxFQUFVO0lBQzFDLE9BQU96QixtQ0FBRUEsQ0FBQ2EsSUFBSSxDQUFDUyxVQUFVLENBQUM7UUFDeEJDLE9BQU87WUFBRUU7UUFBRztJQUNkO0FBQ0Y7QUFFTyxlQUFlQyx1QkFBdUJDLE1BQWMsRUFBRVQsa0JBQXNDO0lBQ2pHLE9BQU9sQixtQ0FBRUEsQ0FBQ2EsSUFBSSxDQUFDZSxNQUFNLENBQUM7UUFDcEJMLE9BQU87WUFBRUUsSUFBSUU7UUFBTztRQUNwQlosTUFBTTtZQUFFRztRQUFtQjtJQUM3QjtBQUNGO0FBRU8sZUFBZVc7SUFDcEIsT0FBTzdCLG1DQUFFQSxDQUFDYSxJQUFJLENBQUNpQixRQUFRLENBQUM7UUFDdEJDLFFBQVE7WUFDTk4sSUFBSTtZQUNKZCxPQUFPO1lBQ1BDLE1BQU07WUFDTkksTUFBTTtZQUNORSxvQkFBb0I7WUFDcEJjLFdBQVc7WUFDWEMsV0FBVztRQUNiO1FBQ0FDLFNBQVM7WUFDUEYsV0FBVztRQUNiO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL21vZGVybi1zYWFzLXRoZW1lLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnXHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9kYidcclxuaW1wb3J0IHsgUm9sZSwgU3Vic2NyaXB0aW9uU3RhdHVzIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFzaFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gIGNvbnN0IHNhbHRSb3VuZHMgPSAxMlxyXG4gIHJldHVybiBiY3J5cHQuaGFzaChwYXNzd29yZCwgc2FsdFJvdW5kcylcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcsIGhhc2hlZFBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGhhc2hlZFBhc3N3b3JkKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVXNlcihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBuYW1lPzogc3RyaW5nKSB7XHJcbiAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpXHJcbiAgXHJcbiAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIGhhc2hlZFBhc3N3b3JkLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICByb2xlOiBSb2xlLlVTRVIsXHJcbiAgICAgIHN1YnNjcmlwdGlvblN0YXR1czogU3Vic2NyaXB0aW9uU3RhdHVzLkZSRUUsXHJcbiAgICAgIGlzRW1haWxWZXJpZmllZDogdHJ1ZSwgLy8gU2V0IHRvIHRydWUgc2luY2UgdXNlciBpcyBjcmVhdGVkIGFmdGVyIGVtYWlsIHZlcmlmaWNhdGlvblxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZykge1xyXG4gIHJldHVybiBkYi51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgd2hlcmU6IHsgZW1haWwgfSxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5SWQoaWQ6IHN0cmluZykge1xyXG4gIHJldHVybiBkYi51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgd2hlcmU6IHsgaWQgfSxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlclN1YnNjcmlwdGlvbih1c2VySWQ6IHN0cmluZywgc3Vic2NyaXB0aW9uU3RhdHVzOiBTdWJzY3JpcHRpb25TdGF0dXMpIHtcclxuICByZXR1cm4gZGIudXNlci51cGRhdGUoe1xyXG4gICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxyXG4gICAgZGF0YTogeyBzdWJzY3JpcHRpb25TdGF0dXMgfSxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsVXNlcnMoKSB7XHJcbiAgcmV0dXJuIGRiLnVzZXIuZmluZE1hbnkoe1xyXG4gICAgc2VsZWN0OiB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgc3Vic2NyaXB0aW9uU3RhdHVzOiB0cnVlLFxyXG4gICAgICBjcmVhdGVkQXQ6IHRydWUsXHJcbiAgICAgIHVwZGF0ZWRBdDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBvcmRlckJ5OiB7XHJcbiAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnLFxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcbiJdLCJuYW1lcyI6WyJiY3J5cHQiLCJkYiIsIlJvbGUiLCJTdWJzY3JpcHRpb25TdGF0dXMiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsInNhbHRSb3VuZHMiLCJoYXNoIiwidmVyaWZ5UGFzc3dvcmQiLCJoYXNoZWRQYXNzd29yZCIsImNvbXBhcmUiLCJjcmVhdGVVc2VyIiwiZW1haWwiLCJuYW1lIiwidXNlciIsImNyZWF0ZSIsImRhdGEiLCJyb2xlIiwiVVNFUiIsInN1YnNjcmlwdGlvblN0YXR1cyIsIkZSRUUiLCJpc0VtYWlsVmVyaWZpZWQiLCJnZXRVc2VyQnlFbWFpbCIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImdldFVzZXJCeUlkIiwiaWQiLCJ1cGRhdGVVc2VyU3Vic2NyaXB0aW9uIiwidXNlcklkIiwidXBkYXRlIiwiZ2V0QWxsVXNlcnMiLCJmaW5kTWFueSIsInNlbGVjdCIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsIm9yZGVyQnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst db = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = db;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLEtBQ1hGLGdCQUFnQkcsTUFBTSxJQUN0QixJQUFJSix3REFBWUEsQ0FBQztJQUNmSyxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUosSUFBSUMsSUFBeUIsRUFBY0wsZ0JBQWdCRyxNQUFNLEdBQUdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kZXJuLXNhYXMtdGhlbWUvLi9zcmMvbGliL2RiLnRzPzllNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xyXG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkYiA9XHJcbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/P1xyXG4gIG5ldyBQcmlzbWFDbGllbnQoe1xyXG4gICAgbG9nOiBbJ3F1ZXJ5J10sXHJcbiAgfSlcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gZGJcclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJkYiIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@next-auth"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDocuments%5Ctrae_projects%5CEmail%20Infra&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();