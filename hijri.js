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

    // Hijri months mapping to numbers
    var hijriMonths = {
        'Muharram': 1,
        'Safar': 2,
        'Rabiʻ I': 3,
        'Rabiʻ II': 4,
        'Jumada I': 5,
        'Jumada II': 6,
        'Rajab': 7,
        'Shaʻban': 8,
        'Ramadan': 9,
        'Shawwal': 10,
        'Dhuʻl-Q.': 11,
        'Dhuʻl-H.': 12
    };

    // Function to convert Hijri to Gregorian - you'd need to replace this with a real implementation
    function hijriToGregorian(day, month, year) {
        // Implement conversion here
        return `${day}-${month}-${year}`; // placeholder
    }

    // Target elements - Google Search Results
    var targetNodes = document.querySelectorAll('.VwiC3b .MUxGbd .wuQ4Ob .WZ8Tjf');

    targetNodes.forEach(function(targetNode) {
        var textContent = targetNode.textContent;
        // If the text content has a Hijri date pattern (Month day, year AH)
        var regex = new RegExp(Object.keys(hijriMonths).join("|") + " \\d{1,2}, \\d{4} AH");
        if (regex.test(textContent)) {
            var hijriDates = textContent.match(regex);
            hijriDates.forEach(function(hijri) {
                var parts = hijri.split(', ');
                var monthDay = parts[0].split(' ');
                var month = hijriMonths[monthDay[0]];
                var day = monthDay[1];
                var year = parts[1].substring(0, parts[1].indexOf(' '));
                var gregorian = hijriToGregorian(day, month, year);
                textContent = textContent.replace(hijri, gregorian);
            });
            targetNode.textContent = textContent;
        }
    });
})();
