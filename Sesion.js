document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginResult = document.getElementById('loginResult');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const formData = new FormData();
    formData.append('usuario', username);
    formData.append('contrasena', password);

    fetch('login.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      if (data.trim() === 'ok') {
        window.location.href = 'juego.html';
      } else {
        loginResult.textContent = data;
        loginResult.style.color = 'red';
      }
    })
    .catch(error => {
      loginResult.textContent = 'Error de conexión.';
      loginResult.style.color = 'red';
    });
  });
});