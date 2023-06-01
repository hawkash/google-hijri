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

    // Function to convert Hijri to Gregorian - you'd need to replace this with a real implementation
    function hijriToGregorian(hijriYear, hijriMonth, hijriDay) {
    var hijriStart = new Date(622, 7, 20); // The start of the Hijri calendar in Gregorian dates
    var hijriElapsed = ((hijriYear - 1) * 354.37) + // Hijri years elapsed (354.37 days each)
                       ((hijriMonth - 1) * 29.5) + // Hijri months elapsed (29.5 days each)
                       (hijriDay - 1); // Hijri days elapsed
    var gregorianDate = new Date(hijriStart.getTime() + hijriElapsed * 24 * 60 * 60 * 1000); // Convert elapsed days to milliseconds
    return gregorianDate;
}

    // Target elements - Google Search Results
    var targetNodes = document.querySelectorAll('.VwiC3b .MUxGbd .wuQ4Ob .WZ8Tjf');

    targetNodes.forEach(function(targetNode) {
        var textContent = targetNode.textContent;
        // If the text content has a Hijri date pattern (Short month name Day, Year AH)
        var regex = new RegExp(Object.keys(hijriMonths).join("|") + " \\d{1,2}, \\d{4} AH");
        if (regex.test(textContent)) {
            var hijriDates = textContent.match(regex);
            hijriDates.forEach(function(hijri) {
                var parts = hijri.split(', ');
                var monthDay = parts[0].split(' ');
                var month = hijriMonths[monthDay[0]];
                var day = monthDay[1];
                var year = parts[1].replace(" AH", "");
                var gregorian = hijriToGregorian(day, month, year);
                textContent = textContent.replace(hijri, gregorian);
            });
            targetNode.textContent = textContent;
        }
    });
})();
