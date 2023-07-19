const registerForm = document.getElementById('registerForm');
const message = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    message.innerText = data.message;
  } catch (error) {
    console.error('Error during registration:', error);
    message.innerText = 'Something went wrong';
  }
});
