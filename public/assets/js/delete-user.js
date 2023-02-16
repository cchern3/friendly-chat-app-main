async function deleteUserForm() {
  const logoutButton = document.getElementById('logout-btn');

  const thisUserId = parseInt(
    document.querySelector('#random-btn').getAttribute('user-Data')
  );

  // fetch request to delete the user
  const response = await fetch('/api/users/' + thisUserId, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
  });

  // logging out user when deleted
  if (response.ok) {
    logoutButton.click();
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#delete-btn').addEventListener('click', deleteUserForm);