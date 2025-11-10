document.addEventListener('DOMContentLoaded', () => {
  // --- Código del juego ---
  const guessInput = document.getElementById('guessInput');
  const guessButton = document.getElementById('guessButton');
  const resultDiv = document.getElementById('result');
  const history = document.getElementById('history');
  if (guessInput && guessButton && resultDiv && history) {
    const secretNumber = generateSecretNumber();
    guessButton.addEventListener('click', () => {
      const guess = guessInput.value;
      if (guess.length !== 4 || isNaN(guess)) {
        alert("Por favor, introduce un número de 4 dígitos.");
        return;
      }
      const { picas, fijas } = calculatePicasFijas(guess, secretNumber);
      resultDiv.textContent = `Picas: ${picas}, Fijas: ${fijas}`;
      const historyItem = document.createElement('li');
      historyItem.classList.add('history-item');
      historyItem.textContent = `${guess} - Picas: ${picas}, Fijas: ${fijas}`;
      history.appendChild(historyItem);
      if (fijas === 4) {
        alert("GANASTE");
        guessButton.disabled = true;
      }
      guessInput.value = '';
    });
    function generateSecretNumber() {
      let digits = [];
      while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) digits.push(digit);
      }
      return digits.join('');
    }
    function calculatePicasFijas(guess, secret) {
      let picas = 0;
      let fijas = 0;
      for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
          fijas++;
        } else if (secret.includes(guess[i])) {
          picas++;
        }
      }
      return { picas, fijas };
    }
  }

  // --- Registro de usuario por AJAX ---
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var formData = new FormData();
      formData.append('usuario', document.getElementById('newUsername').value);
      formData.append('correo', document.getElementById('newEmail').value);
      formData.append('contrasena', document.getElementById('newPassword').value);
      fetch('registrar.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        var mensaje = document.getElementById('registroMensaje');
        if (mensaje) mensaje.innerText = data;
      })
      .catch(error => {
        var mensaje = document.getElementById('registroMensaje');
        if (mensaje) mensaje.innerText = 'Error en el registro: ' + error;
      });
    });
  }
});
  

