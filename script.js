document.addEventListener('DOMContentLoaded', () => {
  // Load existing messages from the file
  loadMessages();

  // Function to add a new message
  window.addMessage = () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
      // Add the new message to the top of the list
      addMessageToList(message);

      // Clear the input field
      messageInput.value = '';

      // Save the updated messages to the file
      saveMessages();
    }
  };

  // Function to load messages from the file
  function loadMessages() {
    // Assume messages are stored in a file called messages.txt
    fetch('messages.txt')
      .then(response => response.text())
      .then(messages => {
        const messageList = document.getElementById('messageList');
        messageList.innerHTML = ''; // Clear the existing list

        // Split messages by newline and add each message to the list
        messages.split('\n').forEach(message => {
          if (message.trim() !== '') {
            addMessageToList(message);
          }
        });
      })
      .catch(error => console.error('Error loading messages:', error));
  }

  // Function to save messages to the file
  function saveMessages() {
    const messageList = document.getElementById('messageList');
    const messages = Array.from(messageList.children).map(li => li.textContent).join('\n');

    // Assume messages are stored in a file called messages.txt
    fetch('messages.txt', {
      method: 'PUT',
      body: messages,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
      .then(response => {
        if (!response.ok) {
          console.error('Error saving messages:', response.statusText);
        }
      })
      .catch(error => console.error('Error saving messages:', error));
  }

  // Function to add a message to the list
  function addMessageToList(message) {
    const messageList = document.getElementById('messageList');
    const li = document.createElement('li');
    li.textContent = message;

    // Add the new message to the top of the list
    messageList.insertBefore(li, messageList.firstChild);
  }
});
