let atmId = 0;
let webId = 0;

const socket = io();

// After clicking the submit button, the user will obtain information of the other user
document.querySelector('.send-message').addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtaining id of the recipient
  webId = document.location.href.split('/');
  webId = webId[webId.length - 1].split('#')[0];
  if (webId.includes('?')) {
    webId = webId.split('?')[0];
  }

  // Obtaining id of the current user
  atmId = document
    .querySelector('#send-message-btn')
    .getAttribute('user-Data');

  // Does not continue if no message is presented
  if (document.querySelector('#message').value.trim() === '') {
    return;
  }
  // Emitting/producting new informtation
  socket.emit('new message', {
    message: document.querySelector('#message').value,
    from: atmId,
    to: webId
  });
});

// Socket on is taking the data from the emit
socket.on('new message', (data) => {
  // Content of messages
  const message = data.message;
  //Sender and recipient IDs
  const fromUserId = data.from;
  const toUserId = data.to;
  const sendUserId = document
    .querySelector('#send-message-btn')
    .getAttribute('user-Data');
    //Obtaining #ID of recipient from all the users
  let webUrlPage = document.location.href.split('/');
  webUrlPage = webUrlPage[webUrlPage.length - 1].split('#')[0];

  if (webUrlPage.includes('?')) {
    webUrlPage = webUrlPage.split('?')[0];
  }

  // Live interaction of messages between users
  const currentMsgList = document.querySelector('#recentUserList');

  if (fromUserId == sendUserId) {
    let toChatUser = document.querySelector(`#user-${toUserId}`);
    // Remove div before added to the webpage
    if (toChatUser) {
      toChatUser.parentElement.removeChild(toChatUser);
    }

    let newToChatUser = document.createElement('li');
    newToChatUser.setAttribute('id', `user-${toUserId}`);

    newToChatUser.innerHTML = `<a href="/chat/${toUserId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

    currentMsgList.insertBefore(newToChatUser, currentMsgList.children[0]);

    // Put at topmost list
  } else if (toUserId == sendUserId) {
    let fromChatUser = document.querySelector(`#user-${fromUserId}`);
    // remove div before added to the webpage
    if (fromChatUser) {
      fromChatUser.parentElement.removeChild(fromChatUser);
    }

    let newFromChatUser = document.createElement('li');
    newFromChatUser.setAttribute('id', `user-${fromUserId}`);

    newFromChatUser.innerHTML = `<a href="/chat/${fromUserId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

    currentMsgList.insertBefore(newFromChatUser, currentMsgList.children[0]);
  }


  // Live messaging
  if (
    (fromUserId == sendUserId && toUserId == webUrlPage) || (fromUserId == webUrlPage && toUserId == sendUserId)
  ) {
    // Received vs sent display
    const classMsg = (sendUserId, fromUserId) => {
      if (sendUserId != fromUserId) {
        return 'received';
      }
      return 'sent';
    };
    // time message was sent
    function msgTime() {
      return new Date().toLocaleString('en-US', {
        hour12: true,
        hourCycle: 'h12',
        hour: 'numeric',
        minute: '2-digit'
      });
    }

    // listing message and sent time
    let liMsg = document.createElement('li');
    liMsg.className = classMsg(sendUserId, fromUserId);
    liMsg.innerHTML = `<div class="message">${message}</div>
      <p class="timeSent">${msgTime()}</p>`;

    document.querySelector('#chatMsg').appendChild(liMsg);

    // Clear messages input
    document.querySelector('#message').value = '';
  }
  // Resettting atmId and webId once the message is sent and the page shows the message
  atmId = 0;
  webId = 0;
});