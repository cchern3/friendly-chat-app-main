async function sendMsgForm(event) {
  event.preventDefault();

  const text_messages = document.querySelector('#message').value.trim();
  // getting user id
  const sender_id = document.querySelector('#send-message-btn').getAttribute('user-Data');
  // create id for urlpage
  let recipient_id = window.location.toString().split('/');
  recipient_id = parseInt(recipient_id[recipient_id.length - 1].split('#')[0]);

  // fetch request to post the user's message
  if (text_messages) {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        sender_id,
        recipient_id,
        text_messages
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      alert(response.statusText);
    }
  }
}

document.querySelector('.send-message').addEventListener('submit', sendMsgForm);