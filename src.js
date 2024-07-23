function showContent(contentId) {
    // Hide all content divs
    var contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });

    // Show the selected content div
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

// Show the content based on the current hash in the URL
function checkHash() {
    var hash = window.location.hash.substring(1);
    switch (hash) {
        case 'shortenURL':
            showContent('shortenURLContent');
            break;
        case 'qrGenerator':
            showContent('qrGeneratorContent');
            break;
        case 'history':
            showContent('historyContent');
            break;
        default:
            // Show default content if no hash or unrecognized hash is present
            showContent('shortenURLContent');
            break;
    }
}

// Check the hash on initial load
window.onload = checkHash;

// Check the hash when the hash changes
window.onhashchange = checkHash;

