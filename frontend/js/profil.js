
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) {
      alert("Vous devez être connecté !");
      window.location.href = "login.html"; // Redirige vers la page de connexion
    } else {
      document.getElementById("user-email").textContent = user.email;
    }
  });
  
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html"; // Redirection après déconnexion
  });
  