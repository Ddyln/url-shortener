window.addEventListener("DOMContentLoaded", () => {
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
    function checkHash(event) {
        event.preventDefault();
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
                showContent('shortenURLContent');
                break;
        }
    }

    // Check the hash on initial load
    window.onload = checkHash;

    // Check the hash when the hash changes
    window.onhashchange = checkHash;

    // Press 'Process' and show the output modal
    var buttonProcess = document.querySelector('.linkButton');
    var outputModal = document.querySelector('.urlOutputModal');
    var buttonClose = document.querySelector('.closeIcon i');
    var buttonCopy = document.querySelector('.copyIcon i');
    var buttonQR = document.querySelector('.qrIcon i');
    var qrModal = document.querySelector('.qrModal');
    var buttonCloseQR = document.querySelector('.closeIconQR i');

    // Close the output modal
    function closeModal(event) {
        event.preventDefault();
        outputModal.style.display = 'none';
    }
    buttonClose.addEventListener('click', closeModal);

    // Copy the shortened URL
    function copyURL(event) {
        event.preventDefault();
        var text = document.getElementById('shortenedLink').textContent;
        var textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);    
        textarea.select();
        navigator.clipboard.writeText(textarea.value);
        document.body.removeChild(textarea);
    }
    buttonCopy.addEventListener('click', copyURL);

    // Generate QR code
    function generateQR(event) {
        event.preventDefault();
        qrModal.classList.toggle('hide');
        qrModal.style.display = 'block';
    }
    function closeQR(event) {
        event.preventDefault();
        qrModal.style.display = 'none';
    }
    buttonQR.addEventListener('click', generateQR);
    buttonCloseQR.addEventListener('click', closeQR);

    document.getElementById('submitForm').addEventListener('submit', (event) => {
        event.preventDefault(); 
        outputModal.classList.toggle('hide');
        outputModal.style.display = 'flex';

        const url = document.getElementById('url').value;
        fetch('/process?link=' + url)
            .then(response => response.json())
            .then(data => {
                var el = document.getElementById('shortenedLink');
                el.textContent = data.link;
                el.href = data.old;
                el = document.getElementById('unshortenedLink');
                el.textContent = data.old;
                el.href = data.old;
                el = document.getElementById('shortenedLinkInQr');
                el.textContent = data.link;
                el.href = data.old;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});