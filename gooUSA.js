// ==UserScript==
// @name        Google US
// @namespace   Violentmonkey Scripts
// @match       *://www.google.*/*
// @grant       none
// @version     1.0
// @description Always use Google US
// ==/UserScript==
(function() {
    'use strict';
    if (!/&gl=us/.test(location.search)) {
        location.search += '&gl=us';
    }
})();