document.getElementById('loginButton').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Basic validation (replace with your actual authentication)
    if (username === 'test' && password === 'password') {
        // Redirect or close the popup (depending on your extension's workflow)
        // Example: window.location.href = "popup.html"; // Redirect
        window.close(); // Close the popup
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});