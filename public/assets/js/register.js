async function createNewUser(event) {
  event.preventDefault();

  const email = document.querySelector('#registerEmail').value.trim();
  const password = document.querySelector('#registerPwd').value.trim();
  const first_name = document.querySelector('#registerFirstname').value.trim();
  const last_name = document.querySelector('#registerLastname').value.trim();
  const gender = document.querySelector('#genders').value.trim();

  const pronouns = document.querySelector('#pronouns').value.trim();
  const bio = document.querySelector('#bio').value.trim();


  // fetch post method to register user
  if (first_name && last_name && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        bio,
        gender,
        pronouns
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      loginTheUser(email, password);
    } else {
      alert(response.statusText);
    }
  }
}

// Automatic login function
async function loginTheUser(email, password) {
  const response = await fetch('/api/users/login', {
    method: 'post',
    body: JSON.stringify({
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/chat');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.registerInform').addEventListener('submit', createNewUser);