document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('shortenURL').addEventListener('click', function() {
        showContent('shortenURLContent');

         // Reset input and result if this button is clicked
        document.getElementById('userInput').value = '';
        document.getElementById('urlOutput').textContent = '';
    });
    
    document.getElementById('qrGenerator').addEventListener('click', function() {
        showContent('qrGeneratorContent');
    });
    
    document.getElementById('history').addEventListener('click', function() {
        showContent('historyContent');
    });
    showContent('shortenURLContent');
    
    document.getElementById('linkButton').addEventListener('click', () => {
        // Get the user input
        const userInput = document.getElementById('userInput').value;

        // Process the input
        const processedInput = processUserInput(userInput);

        // Display the result
        document.getElementById('resultLink').textContent = processedInput;
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

function processUserInput(input) {
    return input + ' (after being shortened)';    
}

