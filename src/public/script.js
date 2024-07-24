window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('shortenURL').addEventListener('click', () => {
        showContent('shortenURLContent');
    });
    
    document.getElementById('qrGenerator').addEventListener('click', () => {
        showContent('qrGeneratorContent');
    });
    
    document.getElementById('history').addEventListener('click', () => {
        showContent('historyContent');
    });

    document.getElementById('copy-logo').addEventListener('click', () => {
        var text = document.getElementById('shortenedLink').textContent;
        var textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);    
        textarea.select();
        navigator.clipboard.writeText(textarea.value);
        document.body.removeChild(textarea);
        alert("Copied!");
    });
    
    showContent('shortenURLContent');
    
    document.getElementById('submitForm').addEventListener('submit', (event) => {
        event.preventDefault(); 
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