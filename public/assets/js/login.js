async function loginUserForm(event) {
  event.preventDefault();

  const email = document.querySelector('#loginEmail').value.trim();
  const password = document.querySelector('#loginPwd').value.trim();

  // fetch request to to login user
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.loginData').addEventListener('submit', loginUserForm);