document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('shortenURLButton').addEventListener('click', function() {
        showContent('shortenURLContent');

         // Reset input and result if this button is clicked
        document.getElementById('userInput').value = '';
        document.getElementById('resultLink').textContent = '';
    });
    
    document.getElementById('qrGeneratorButton').addEventListener('click', function() {
        showContent('qrGeneratorContent');
    });
    
    document.getElementById('historyButton').addEventListener('click', function() {
        showContent('historyContent');
    });
    showContent('shortenURLContent');
    
    document.getElementById('shortenInputButton').addEventListener('click', () => {
        // Get the user input
        const userInput = document.getElementById('userInput').value;

        // Process the input
        const processedInput = processUserInput(userInput);

        // Display the result
        document.getElementById('resultLink').textContent = processedInput;
    });
});


function showContent(contentId) {
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
