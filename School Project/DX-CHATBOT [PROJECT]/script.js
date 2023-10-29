document.getElementById('clear').addEventListener('click', () => {
    var butt = document.getElementById('clear')
    butt.style.animationName = "clickanim";
    
    setTimeout(() => {
        butt.style.animationName = "none";
    }, 300);
})
document.getElementById('export').addEventListener('click', () => {
    var butt = document.getElementById('export')
    butt.style.animationName = "clickanim";
    
    setTimeout(() => {
        butt.style.animationName = "none";
    }, 300);
})

document.getElementById('submitbutton').addEventListener('click', () => {
    var butt = document.getElementById('submitbutton')
    butt.style.animationName = "clickanim";
    
    setTimeout(() => {
        butt.style.animationName = "none";
    }, 510);
})
// Chat message counter to generate unique IDs for chat messages
let messageCounter = 0;

function chat_send() {
    const textbox = document.getElementById('chatholder');
    const chats = document.querySelector('.content-area');
    const messageText = textbox.value.trim();

    if (messageText.length > 0) {
        // Create a unique ID for each chat message
        messageCounter++;
        const chatId = 'chat_' + messageCounter;

        // Create a chat message container
        const chatMessage = document.createElement('div');
        chatMessage.setAttribute('class', 'chat-message');
        chatMessage.setAttribute('id', chatId);
        chatMessage.setAttribute('id', 'chats_msgs')

        // Create a chat message content
        const chatContent = document.createElement('div');
        chatContent.setAttribute('class', 'chat-content');
        chatContent.innerText = messageText;

        // Append chat message content to the container
        chatMessage.appendChild(chatContent);

        // Append the chat message container to the chat area
        chats.appendChild(chatMessage);

        // Automatically scroll to the latest message
        chats.scrollTop = chats.scrollHeight;

        // Reset the textbox
        textbox.value = "";

        // Add logic to handle special commands
        handleCommands(messageText);
    }
}

function handleCommands(message) {
    const command = message.toUpperCase();
    
    switch (command) {
        case "EXPORT":
            exportChat();
            break;
        case "CLEAR":
            clearChat();
            break;
        // Add more commands here as needed
    }
}

function clearChat() {
    const chats = document.querySelectorAll('.chat-message');
    chats.forEach(chat => {
        chat.remove();
    }
    )
}

function exportChat() {
    const chatMessages = document.querySelectorAll('.chat-content');
    let chatText = "";

    chatMessages.forEach(message => {
        chatText += message.innerText + '\n';
    });

    // Create a text file and trigger a download
    const blob = new Blob([chatText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'chats.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('chatholder').addEventListener('keydown', (event) => {
    if (event.key === "Enter" && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault();
        chat_send();
    }
});

document.getElementById('submitbutton').addEventListener('click', chat_send);

document.getElementById('clear').addEventListener('click', clearChat);
document.getElementById('export').addEventListener('click', exportChat);
