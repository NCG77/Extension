// This is where you would implement the website safety checking.
// This is very complex and would likely involve using a third-party API or service.

// Example (very simplified - you'll need a real safety API):
// This just changes the color of the title, it does not check for safety.
const siteName = window.location.hostname;
const titleElement = document.querySelector('title');
if (titleElement) {
    // Here you'd use your safety API to check if the site is safe.
    // For this example, we'll just randomly change the title color.
    const isSafe = Math.random() < 0.5; // Simulate a 50% chance of being safe
    titleElement.style.color = isSafe ? 'green' : 'red';
    titleElement.textContent = (isSafe ? "[SAFE] " : "[UNSAFE] ") + siteName + " - " + titleElement.textContent;
}