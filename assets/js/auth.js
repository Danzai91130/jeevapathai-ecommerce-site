import { getAuth, getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
// assets/js/auth.js
const auth = firebase.auth();

// Vérifie l'état de l'authentification
auth.onAuthStateChanged(user => {
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");

  if (user) {
    loginLink.style.display = "none";
    logoutLink.style.display = "block";
  } else {
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
  }
});

// Fonction de déconnexion
function logout() {
  auth.signOut().then(() => {
    alert("Déconnecté avec succès !");
    window.location.href = "/";  // Redirige vers la page d'accueil
  });
}
