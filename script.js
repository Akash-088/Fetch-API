let users = [];
let currentIndex = 0;

async function fetchUsers() {
  const errorMsg = document.getElementById('error');
  errorMsg.textContent = '';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    users = await response.json();
    currentIndex = 0;
    showUser();  // show the first user
  } catch (error) {
    console.error(error);
    errorMsg.textContent = "Failed to load user data. Please check your connection.";
  }
}

function showUser() {
  const container = document.getElementById('user-data');
  container.innerHTML = '';

  if (users.length === 0) return;

  const user = users[currentIndex];
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
  `;
  container.appendChild(card);
}

function nextUser() {
  if (users.length === 0) return;

  currentIndex = (currentIndex + 1) % users.length;
  showUser();
}

window.onload = () => {
  fetchUsers();
  document.getElementById("reloadBtn").addEventListener("click", nextUser);
};
