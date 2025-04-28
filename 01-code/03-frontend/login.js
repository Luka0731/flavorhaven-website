const loginForm = document.getElementById('form');
const loginEmail = document.getElementById('email-input');
const loginPassword = document.getElementById('password-input');
const loginErrorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === loginEmail.value && user.password === loginPassword.value);
  
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = 'home.html'; // Weiterleitung zur Startseite
  } else {
    loginErrorMessage.innerText = 'Invalid email or password';
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword){
  let errors = []

  if(firstname === '' || firstname == null){
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password.length < 8){
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password !== repeatPassword){
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }


  return errors;
}

function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})