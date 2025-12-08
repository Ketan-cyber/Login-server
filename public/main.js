const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const userForms = document.getElementById('user_options-forms');

signupButton.addEventListener('click', () => {
  userForms.classList.remove('bounceRight');
  userForms.classList.add('bounceLeft');

  document.querySelector('.user_forms-login').style.display = "none";
  document.querySelector('.user_forms-signup').style.display = "block";
});

loginButton.addEventListener('click', () => {
  userForms.classList.remove('bounceLeft');
  userForms.classList.add('bounceRight');

  document.querySelector('.user_forms-signup').style.display = "none";
  document.querySelector('.user_forms-login').style.display = "block";
});

// ✅ REGISTER
function registerUser() {
  localStorage.setItem("email", signupEmail.value);
  localStorage.setItem("password", signupPassword.value);
  alert("Signup successful!");
  return false;
}

// ✅ LOGIN
function loginUser() {
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;

  if (email === localStorage.getItem("email") && pass === localStorage.getItem("password")) {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
  return false;
}
