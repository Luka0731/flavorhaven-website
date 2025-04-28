
document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
  
    // Prüfen, ob ein Benutzer eingeloggt ist
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    if (loggedInUser) {
      // Benutzer ist eingeloggt -> Profilbild anzeigen
      loginContainer.innerHTML = `
        <div class="profile">
          <img src="default-profile.png" alt="Profile Picture" id="profile-picture">
          <span>${loggedInUser.username}</span>
          <button id="logout-button">Logout</button>
        </div>
      `;
  
      // Logout-Funktion
      document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Benutzer aus dem Local Storage entfernen
        location.reload(); // Seite neu laden
      });
    } else {
      // Kein Benutzer eingeloggt -> Login-Link anzeigen
      loginContainer.innerHTML = `
        <button onclick="window.location.href='login.html'">Login</button>
      `;
    }
  });
  
