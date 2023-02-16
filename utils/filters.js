module.exports = {
  getrecentUserchat: (messages, user, sessionId, paramId) => {
    // Filters for the current user via session id
    var thisUser = user.filter((user) => user.id == sessionId);
    thisUser = thisUser[0];

    // Filters for current chatter via param id
    var chatRightNow = user.filter((user) => user.id == paramId);
    chatRightNow = chatRightNow[0];
    if (!paramId) {
      chatRightNow = null; // Returns null if on home /chat page
    }

    // Filters for an array of most recent chat messages per chatter
    let updatedChat = [];
    if (messages) {
      messages.forEach((message) => {
        user.forEach((user) => {
          if (
            // If sender is user and user id is sender id
            (message.sender_id !== sessionId && user.id === message.sender_id) ||
            // OR if receiver is user and user id is sender id
            (message.recipient_id !== sessionId && user.id === message.recipient_id)
          ) {
            // Only do if updatedChat array does not already include user
            if (!updatedChat.includes(user)) {
              // Set latest message and push to array
              user.latest_message = message.text_messages;
              updatedChat.push(user);
            }
          }
        });
      });
    }

    return { thisUser, chatRightNow, updatedChat };
  }
};