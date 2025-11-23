document.addEventListener('DOMContentLoaded', function() {
    // EMBEDDED RETRO BOWL - Opens redirect page
    document.getElementById('playGame').addEventListener('click', function() {
        chrome.tabs.create({
            url: chrome.runtime.getURL('retrobowl.html')
        });
    });

    // DIRECT SITE + S.H.A.D.O.W - Opens site directly where shadow.js works
    document.getElementById('openMods').addEventListener('click', function() {
        chrome.tabs.create({
            url: 'https://blobby-boi.github.io/retro-bowl/'
        });
    });

    // FULLSCREEN MODE - Toggles fullscreen on current tab
    document.getElementById('fullscreen').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: function() {
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen();
                    } else {
                        document.exitFullscreen();
                    }
                }
            });
        });
    });
});