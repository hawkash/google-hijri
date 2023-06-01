// ==UserScript==
// @name         Hijri to Gregorian Converter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Converts Hijri dates to Gregorian on Google Search Results
// @author       You
// @match        https://www.google.com/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Hijri months mapping to abbreviations
    var hijriMonths = {
        'Muh.': 1,
        'Saf.': 2,
        'Rab. I': 3,
        'Rab. II': 4,
        'Jum. I': 5,
        'Jum. II': 6,
        'Raj.': 7,
        'Sha.': 8,
        'Ram.': 9,
        'Shaw.': 10,
        'Dhuʻl-Q.': 11,
        'Dhuʻl-H.': 12
    };

    function hijriToGregorian(hijriYear, hijriMonth, hijriDay) {
        var hijriStart = new Date(622, 7, 20);
        var hijriElapsed = ((hijriYear - 1) * 354.37) +
                           ((hijriMonth - 1) * 29.5) +
                           (hijriDay - 1);
        var gregorianDate = new Date(hijriStart.getTime() + hijriElapsed * 24 * 60 * 60 * 1000);
        return gregorianDate;
    }

    var targetNodes = document.querySelectorAll('.VwiC3b .MUxGbd .wuQ4Ob .WZ8Tjf');

    targetNodes.forEach(function(targetNode) {
        var textContent = targetNode.textContent;
        var regex = new RegExp(Object.keys(hijriMonths).join("|") + " \\d{1,2}, \\d{4} AH");
        if (regex.test(textContent)) {
            var hijriDates = textContent.match(regex);
            hijriDates.forEach(function(hijri) {
                var parts = hijri.split(' ');
                var day = parseInt(parts[1].replace(',', ''));
                var month = hijriMonths[parts[0]];
                var year = parseInt(parts[2]);
                var gregorian = hijriToGregorian(year, month, day);
                textContent = textContent.replace(hijri, gregorian.toLocaleDateString());
            });
            targetNode.textContent = textContent;
        }
    });
})();
