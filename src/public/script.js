window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('shortenURL').addEventListener('click', function() {
        showContent('shortenURLContent');
    });
    
    document.getElementById('qrGenerator').addEventListener('click', function() {
        showContent('qrGeneratorContent');
    });
    
    document.getElementById('history').addEventListener('click', function() {
        showContent('historyContent');
    });
    showContent('shortenURLContent');
    
    document.getElementById('submitForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
        const url = document.getElementById('url').value;
        fetch('/process?link=' + url)
            .then(response => response.json())
            .then(data => {
                console.log('Received data:', data.link);
                var el = document.getElementById('shortenedLink');
                el.textContent = data.link;
                el.href = data.old;
                el = document.getElementById('unshortenedLink');
                el.textContent = data.old;
                el.href = data.old;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});

const showContent = (contentId) => {
    // Hide all content
    var contents = document.getElementsByClassName('content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
    }

    // Show the selected content
    document.getElementById(contentId).style.display = 'block';
}