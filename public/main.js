// public/main.js
async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  return res;
}

document.getElementById('regForm').addEventListener('submit', async e => {
  e.preventDefault();
  const user = document.getElementById('regUser').value.trim();
  const pass = document.getElementById('regPass').value;
  const msg = document.getElementById('regMsg');
  msg.innerText = '';
  const res = await postJson('/api/register', { username: user, password: pass });
  const data = await res.json();
  if (!res.ok) msg.innerText = data.error || 'Registration failed';
  else window.location = '/dashboard';
});

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const msg = document.getElementById('loginMsg');
  msg.innerText = '';
  const res = await postJson('/api/login', { username: user, password: pass });
  const data = await res.json();
  if (!res.ok) msg.innerText = data.error || 'Login failed';
  else window.location = '/dashboard';
});

