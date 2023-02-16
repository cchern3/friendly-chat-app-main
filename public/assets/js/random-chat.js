async function getOtherUserId() {
  // id of current user
  const thisUserId = parseInt(
    document.querySelector('#random-btn').getAttribute('user-Data')
  );

  // max users
  fetch('/api/users')
    .then((res) => {
      return res.json();
    })
    .then((totalUsers) => {
      const allUsersArr = [];

      // add to the list if they are not a current user
      totalUsers.forEach((user) => {
        if (user.id !== thisUserId) {
          allUsersArr.push(user.id);
        }
      });

      currentMsgCheck(allUsersArr);
    });
}

// getting recent messages and comparing them to users
async function currentMsgCheck(allUsersArr) {
  fetch('/api/messages/recent', { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // ensuring there is no overlap between users
        data.forEach((user) => {
          // if a user exits, remove them from array
          if (allUsersArr.includes(user.id)) {
            allUsersArr.splice(allUsersArr.indexOf(user.id), 1);
          }
        });
      }
      // randomizing user
      const rndmUserId = Math.floor(Math.random() * allUsersArr.length);
      // directing to the random user
      document.location.replace(`/chat/${allUsersArr[rndmUserId]}`);
    });
}

document.getElementById('random-btn').addEventListener('click', getOtherUserId);