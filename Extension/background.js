const blockedDomains = ["example.com", "malicious-site.com"];

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = new URL(details.url);
        if (blockedDomains.includes(url.hostname)) {
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = new URL(details.url);
        if (url.hostname === "www.google.com" && url.pathname === "/search") {
            url.searchParams.set("safe", "active");
            return { redirectUrl: url.toString() };
        }
    },
    { urls: ["*://www.google.com/search*"] },
    ["blocking"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addSite") {
        chrome.storage.local.get("blockedSites", (data) => {
            const blockedSites = data.blockedSites || [];
            blockedSites.push(request.url);
            chrome.storage.local.set({ blockedSites: blockedSites });
        });
    }
    if (request.action === "removeSite") {
        chrome.storage.local.get("blockedSites", (data) => {
            let blockedSites = data.blockedSites || [];
            blockedSites = blockedSites.filter(site => site !== request.url);
            chrome.storage.local.set({ blockedSites: blockedSites });
        });
    }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    chrome.storage.local.get("blockedSites", (data) => {
        const blockedSites = data.blockedSites || [];
        const url = new URL(details.url);
        if (blockedSites.includes(url.hostname)) { // Check hostname
            chrome.tabs.update(details.tabId, { url: "blocked.html" }); // Redirect to a blocked page
        }
    });
}, { url: [{ urlMatches: "<all_urls>" }] });