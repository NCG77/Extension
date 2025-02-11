// settings.js
document.addEventListener('DOMContentLoaded', () => {
    const blockMalicious = document.getElementById('blockMalicious');
    const showSafetyRatings = document.getElementById('showSafetyRatings');
    const blockAds = document.getElementById('blockAds');
    const saveButton = document.getElementById('saveButton');

    // Load saved settings (if any)
    chrome.storage.local.get(['blockMalicious', 'showSafetyRatings', 'blockAds'], (data) => {
        blockMalicious.checked = data.blockMalicious !== undefined ? data.blockMalicious : true; // Default to true
        showSafetyRatings.checked = data.showSafetyRatings !== undefined ? data.showSafetyRatings : true; // Default to true
        blockAds.checked = data.blockAds !== undefined ? data.blockAds : false; // Default to false
    });

    saveButton.addEventListener('click', () => {
        const settings = {
            blockMalicious: blockMalicious.checked,
            showSafetyRatings: showSafetyRatings.checked,
            blockAds: blockAds.checked,
        };

        chrome.storage.local.set(settings, () => {
            // Optional: Show a "Settings saved" message or update the UI
            console.log("Settings saved");
        });
    });
});