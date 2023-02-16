const currentMsgList = document.querySelector('#recentUserList');

async function showChatList() {
    // get method for recent user
    const response = await fetch('/api/messages/recent', { method: 'GET' });
    const data = await response.json();

    if (data.length > 0) {
        var webUrlPage = document.location.href.split('/');
        webUrlPage = webUrlPage[webUrlPage.length - 1].split('#')[0];

        // creating list of users for each added user
        data.forEach((element) => {
            let recentLi = document.createElement('li');
            recentLi.setAttribute('id', `user-${element.id}`);

            // show the current user being messaged
            if (element.id == webUrlPage) {
                recentLi.className = 'selected';
            }

            // Link and text for webpage
            recentLi.innerHTML = `<a href="/chat/${element.id}"><div>
      <h3 class="name"> ${
        element.first_name.charAt(0).toUpperCase() +
        element.first_name.slice(1)
      } ${element.last_name.charAt(0).toUpperCase()}.</h3>
      <span class="latest-message">${element.latest_message}</span>
      </div></a>`;

            // Append to to webpage
            currentMsgList.appendChild(recentLi);
        });
    } else {
        // showing no messages if there is no data
        currentMsgList.innerHTML = `<li><div>You currently have no chats.</div></li>`;
    }
}

// displaying error message
showChatList().catch(
    (response) =>
    (currentMsgList.innerHTML = `<li class="error-msg"><div>There's been an error displaying the recent chat list. <button onclick="window.location.reload()" class="error-btn">Refresh the page <i class="fa-solid fa-rotate-right"></i></button></div></li>`)
);