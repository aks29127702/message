window.addEventListener('DOMContentLoaded', () => {
  fetch('chat.txt')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load chat.txt');
      return response.text();
    })
    .then(text => {
      const lines = text.split(/\r?\n/);
      const chatContainer = document.getElementById('chatContainer');
      chatContainer.innerHTML = '';

      lines.forEach(line => {
        const match = line.match(/^(\d{1,2}\/\d{1,2}\/\d{2}), (\d{2}:\d{2}) - (.*?): (.+)$/);
        if (match) {
          const [_, date, time, sender, messageRaw] = match;
          const message = messageRaw.trim().toLowerCase();

          if (!message || message === "<media omitted>" || message === "null") return;

          const isSender = sender.trim() === 'Meri Billiii 🎀';

          const msgDiv = document.createElement('div');
          msgDiv.className = `message ${isSender ? 'sender' : 'receiver'}`;
          msgDiv.innerHTML = `
            <div class="sender-name">${sender}</div>
            ${messageRaw.trim()}
            <span class="time">${time}</span>
          `;
          chatContainer.appendChild(msgDiv);
        }
      });
    })
    .catch(error => {
      document.getElementById('chatContainer').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    });
});
