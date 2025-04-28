const form = document.getElementById('form');
const username_input = document.getElementById('user_name-input');
const email_input = document.getElementById('email-input');
const birth_date_input = document.getElementById('birth_date-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();  // Verhindert, dass das Formular die Seite neu lädt

  // Formularwerte validieren
  let errors = getSignupFormErrors(
    username_input.value,
    email_input.value,
    birth_date_input.value,
    password_input.value,
    repeat_password_input.value
  );

  if (errors.length > 0) {
    // Zeige Fehler an, falls welche vorhanden sind
    error_message.innerText = errors.join('. ');
    return;
  }

  // Hole alle bereits registrierten Benutzer aus dem Local Storage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Prüfe, ob die eingegebene Email bereits existiert
  if (users.some(user => user.email === email_input.value)) {
    error_message.innerText = 'Email already exists';
    return;
  }

  // Erstelle ein neues Benutzerobjekt
  const newUser = {
    username: username_input.value,
    email: email_input.value,
    birthDate: birth_date_input.value,
    password: password_input.value
  };

  // Füge den neuen Benutzer zum Array hinzu und speichere das Array im Local Storage
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // Speichere den aktuell eingeloggten Benutzer für den späteren Login
  localStorage.setItem('loggedInUser', JSON.stringify(newUser));

  // Leite den Benutzer automatisch zur home-Seite weiter
  window.location.href = 'home.html';
});


function getSignupFormErrors(username, email, birthDate, password, repeatPassword) {
  let errors = [];

  if (username.trim() === '') {
    errors.push('Username is required');
    username_input.parentElement.classList.add('incorrect');
  }

  if (email.trim() === '') {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }

  if (birthDate.trim() === '') {
    errors.push('Birth date is required');
    birth_date_input.parentElement.classList.add('incorrect');
  }

  if (password.trim() === '') {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  } else if (!isValidPassword(password)) {
    errors.push('Password must have at least 8 characters, including uppercase, lowercase, a number, and a special character');
    password_input.parentElement.classList.add('incorrect');
  }

  if (password !== repeatPassword) {
    errors.push('Passwords do not match');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

function isValidPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
}

// Entfernt Fehlermeldungen, wenn der Nutzer tippt
const allInputs = [username_input, email_input, birth_date_input, password_input, repeat_password_input];

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    input.parentElement.classList.remove('incorrect');
    error_message.innerText = '';
  });
});