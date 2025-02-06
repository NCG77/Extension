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
